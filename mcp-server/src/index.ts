import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  checkCodePatterns,
  getRecord,
  listCategories,
  searchRecords,
} from "./search.js";

const server = new McpServer({
  name: "verse-memory",
  version: "1.0.0",
  description: "UEFN Verse制約・パターンの検証済みナレッジベース",
});

server.tool(
  "search_verse_constraint",
  "UEFN Verseの制約・パターン・ハマりポイントをキーワードで検索します。AIがVerseコードを書く際に、既知の制約や推奨パターンを確認するために使用してください。",
  {
    query: z.string().describe("検索キーワード（例: 'weak_map', 'suspends decides', 'ラウンド 保持'）"),
    severity_filter: z
      .enum(["critical", "warning", "info", "all"])
      .default("all")
      .describe("重要度でフィルタリング（デフォルト: all）"),
  },
  async ({ query, severity_filter }) => {
    const results = searchRecords(query, severity_filter);
    return { content: [{ type: "text", text: results }] };
  },
);

server.tool(
  "check_code_pattern",
  "Verseコードの断片を受け取り、既知の制約やアンチパターンに該当するかチェックします。コード生成後の品質確認に使用してください。",
  {
    code: z.string().describe("チェック対象のVerseコード断片"),
  },
  async ({ code }) => {
    const results = checkCodePatterns(code);
    return { content: [{ type: "text", text: results }] };
  },
);

server.tool(
  "get_verse_record",
  "指定したIDのVerse制約レコードの詳細情報を取得します。",
  {
    id: z.string().describe("レコードID（例: verse-001）"),
  },
  async ({ id }) => {
    const result = getRecord(id);
    return { content: [{ type: "text", text: result }] };
  },
);

server.tool(
  "list_verse_categories",
  "Verse Memoryナレッジベースのカテゴリ一覧とレコード数を表示します。",
  {
    category: z
      .enum([
        "language_constraint",
        "device_behavior",
        "api_gotcha",
        "pattern_recommended",
        "pattern_antipattern",
        "workflow_tip",
        "all",
      ])
      .default("all")
      .describe(
        "特定カテゴリのレコード一覧を取得（デフォルト: all = カテゴリ一覧のみ）",
      ),
  },
  async ({ category }) => {
    const result = listCategories(category);
    return { content: [{ type: "text", text: result }] };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);

