import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import type {
  CategoryFilter,
  SearchSeverityFilter,
  VerseRecord,
} from "./types.js";

// 実行ファイルが `build/` 配下にあっても、データは `mcp-server/` から `../data/...` を参照する。
const __filename = fileURLToPath(import.meta.url);
const MCP_SERVER_DIR = path.resolve(path.dirname(__filename), "..");
const DATA_PATH = path.resolve(
  MCP_SERVER_DIR,
  "..",
  "data",
  "verified",
  "all_records.json",
);

let cachedRecords: VerseRecord[] | null = null;
let cachedRecordById: Map<string, VerseRecord> | null = null;

function getAllRecords(): VerseRecord[] {
  if (cachedRecords) return cachedRecords;
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  const parsed = JSON.parse(raw) as VerseRecord[];
  cachedRecords = parsed;
  cachedRecordById = new Map(parsed.map((r) => [r.id, r]));
  return cachedRecords;
}

function getRecordById(id: string): VerseRecord | undefined {
  if (!cachedRecordById) getAllRecords();
  return cachedRecordById!.get(id);
}

function norm(s: string): string {
  return s.toLowerCase();
}

function tokenizeQuery(query: string): string[] {
  return query
    .split(/\s+/g)
    .map((t) => t.trim())
    .filter(Boolean);
}

function formatSeverity(severity: string): string {
  return severity;
}

function formatRecordBlock(record: VerseRecord): string {
  const codeExample =
    record.solution.code_example ?? "（コード例なし）";

  const codeLine =
    codeExample.includes("\n")
      ? `コード例:\n${codeExample}`
      : `コード例: ${codeExample}`;

  return [
    `【${record.id}】${record.title} [${formatSeverity(record.severity)}]`,
    `問題: ${record.problem.summary}`,
    `AIの典型ミス: ${record.problem.common_ai_mistake}`,
    `対処法: ${record.solution.summary}`,
    codeLine,
  ].join("\n");
}

function formatRecordForPatternCheck(record: VerseRecord, matchedPatterns: string[]): string {
  const patternsLine = matchedPatterns.length
    ? `検出パターン: ${matchedPatterns.join(", ")}`
    : "検出パターン: （なし）";

  return [
    `【${record.id}】${record.title} [${formatSeverity(record.severity)}]`,
    patternsLine,
    `問題: ${record.problem.summary}`,
    `対処法: ${record.solution.summary}`,
    (() => {
      const codeExample = record.solution.code_example ?? "（コード例なし）";
      if (codeExample.includes("\n")) return `コード例:\n${codeExample}`;
      return `コード例: ${codeExample}`;
    })(),
  ].join("\n");
}

export function searchRecords(
  query: string,
  severity_filter: SearchSeverityFilter = "all",
): string {
  const tokens = tokenizeQuery(query);
  const allRecords = getAllRecords();
  const filtered =
    severity_filter === "all"
      ? allRecords
      : allRecords.filter((r) => r.severity === severity_filter);

  if (tokens.length === 0) {
    return "✅ 該当する制約は見つかりませんでした。";
  }

  const scored = filtered.map((r) => {
    const title = norm(r.title);
    const tags = r.tags.map(norm);
    const keywords = r.trigger.keywords.map(norm);
    const triggerDesc = norm(r.trigger.description);
    const problemSummary = norm(r.problem.summary);
    const solutionSummary = norm(r.solution.summary);

    let score = 0;
    const tokenAnyIn = (arr: string[], weight: number) => {
      const hit = tokens.some((t) => arr.some((v) => v.includes(norm(t))));
      if (hit) score += weight;
    };
    const tokenAnyInString = (s: string, weight: number) => {
      const hit = tokens.some((t) => s.includes(norm(t)));
      if (hit) score += weight;
    };

    tokenAnyInString(title, 3);
    tokenAnyIn(tags, 3);
    tokenAnyIn(keywords, 2);
    tokenAnyInString(triggerDesc, 1);
    tokenAnyInString(problemSummary, 1);
    tokenAnyInString(solutionSummary, 1);

    return { record: r, score };
  });

  const results = scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((x) => formatRecordBlock(x.record));

  if (results.length === 0) {
    return "✅ 該当する制約は見つかりませんでした。";
  }

  return results.join("\n---\n");
}

export function checkCodePatterns(code: string): string {
  const allRecords = getAllRecords();
  const codeLower = norm(code);

  // key: record.id
  const matches = new Map<string, { record: VerseRecord; patterns: string[] }>();

  for (const record of allRecords) {
    for (const pattern of record.trigger.code_patterns) {
      const patternLower = norm(pattern);
      if (codeLower.includes(patternLower)) {
        const current = matches.get(record.id);
        if (current) current.patterns.push(pattern);
        else matches.set(record.id, { record, patterns: [pattern] });
      }
    }
  }

  const matchedItems = Array.from(matches.values());
  if (matchedItems.length === 0) {
    return "✅ 既知の制約に該当するパターンは検出されませんでした。";
  }

  const header = `⚠️ ${matchedItems.length}件の既知の制約を検出しました：`;
  const blocks = matchedItems.map((x) =>
    formatRecordForPatternCheck(x.record, Array.from(new Set(x.patterns))),
  );
  return `${header}\n\n${blocks.join("\n\n")}`;
}

export function getRecord(id: string): string {
  const record = getRecordById(id);
  if (!record) {
    return `❌ 見つかりません: ${id}`;
  }

  const related = record.related_ids
    .map((rid) => getRecordById(rid))
    .filter((r): r is VerseRecord => Boolean(r))
    .map((r) => `【${r.id}】${r.title}`)
    .join("\n");

  const codeExample =
    record.solution.code_example ?? "（コード例なし）";
  const codeBlock = codeExample.includes("\n")
    ? `\n${codeExample}`
    : ` ${codeExample}`;

  return [
    `【${record.id}】${record.title} [${formatSeverity(record.severity)}]`,
    `カテゴリ: ${record.category}`,
    `タグ: ${record.tags.join(", ")}`,
    ``,
    `トリガー:`,
    `- 説明: ${record.trigger.description}`,
    `- キーワード: ${record.trigger.keywords.join(", ")}`,
    `- コードパターン: ${record.trigger.code_patterns.join(", ")}`,
    ``,
    `問題: ${record.problem.summary}`,
    `AIの典型ミス: ${record.problem.common_ai_mistake}`,
    ``,
    `対処法: ${record.solution.summary}`,
    `コード例:${codeBlock}`,
    `参照URL: ${record.solution.reference_url ?? "（なし）"}`,
    ``,
    `検証:`,
    `- status: ${record.verification.status}`,
    `- verified_by: ${record.verification.verified_by}`,
    `- verified_date: ${record.verification.verified_date}`,
    `- uefn_version: ${record.verification.uefn_version ?? "（不明）"}`,
    ``,
    `関連レコード:`,
    related ? related : "（なし）",
  ].join("\n");
}

export function listCategories(category: CategoryFilter): string {
  const allRecords = getAllRecords();
  const categories: Array<Exclude<CategoryFilter, "all">> = [
    "language_constraint",
    "device_behavior",
    "api_gotcha",
    "pattern_recommended",
    "pattern_antipattern",
    "workflow_tip",
  ];

  const counts = new Map<string, number>();
  for (const c of categories) counts.set(c, 0);
  for (const r of allRecords) counts.set(r.category, (counts.get(r.category) ?? 0) + 1);

  if (category === "all") {
    return categories
      .map((c) => `${c}: ${counts.get(c) ?? 0}件`)
      .join("\n");
  }

  const recordsInCategory = allRecords
    .filter((r) => r.category === category)
    .sort((a, b) => a.id.localeCompare(b.id));

  if (recordsInCategory.length === 0) {
    return `✅ ${category} のレコードは見つかりませんでした。`;
  }

  // 8件程度を想定して、見やすいブロック表示にする
  const blocks = recordsInCategory.map((r) => [
    `【${r.id}】${r.title} [${formatSeverity(r.severity)}]`,
    `問題: ${r.problem.summary}`,
    `対処法: ${r.solution.summary}`,
  ].join("\n"));

  return blocks.join("\n\n---\n\n");
}

