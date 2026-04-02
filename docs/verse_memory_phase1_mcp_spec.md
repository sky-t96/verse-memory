# Verse Memory — Phase 1 MCP Server 実装仕様書

**作成日：** 2026年3月30日  
**実装担当：** Cursor  
**目的：** Verse Memoryナレッジベースを Cursor / Claude Code から直接利用可能にする MCP Server の構築

---

## 概要

Verse Memoryは、UEFN/Verse開発におけるAIの典型的なミスを防ぐための検証済みナレッジベース。
このMCP Serverを通じて、AIツールが開発中にリアルタイムでVerse制約を参照できるようにする。

---

## 技術スタック

- **言語:** TypeScript
- **ランタイム:** Node.js（18以上）
- **MCP SDK:** `@modelcontextprotocol/sdk`
- **トランスポート:** stdio（ローカル実行、Cursor/Claude Codeとの接続用）
- **データソース:** `data/verified/all_records.json`（ローカルJSONファイル）
- **外部依存なし**（DB不要、ホスティング不要、API key不要）

---

## ディレクトリ構成

```
verse-memory/
├── mcp-server/
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── index.ts          ← エントリポイント（MCP Server定義）
│   │   ├── search.ts         ← 検索ロジック
│   │   └── types.ts          ← 型定義
│   └── build/                ← コンパイル済みJS
├── data/
│   └── verified/
│       └── all_records.json  ← ナレッジベース（36件）
├── schema/
│   └── record_schema.json
└── CLAUDE.md
```

---

## MCP Tools 定義（4つ）

### Tool 1: `search_verse_constraint`

**目的：** キーワードでVerse制約を検索する  
**ユースケース：** 開発者が「weak_mapの制限は？」「suspendsとdecidesは一緒に使える？」と聞いたとき

```typescript
{
  name: "search_verse_constraint",
  description: "UEFN Verseの制約・パターン・ハマりポイントをキーワードで検索します。AIがVerseコードを書く際に、既知の制約や推奨パターンを確認するために使用してください。",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "検索キーワード（例: 'weak_map', 'suspends decides', 'ラウンド 保持'）"
      },
      severity_filter: {
        type: "string",
        enum: ["critical", "warning", "info", "all"],
        description: "重要度でフィルタリング（デフォルト: all）",
        default: "all"
      }
    },
    required: ["query"]
  }
}
```

**検索ロジック：**
1. `query` を空白で分割してトークン化
2. 各レコードの以下フィールドを検索対象とする：
   - `title`
   - `tags`（配列の各要素）
   - `trigger.keywords`（配列の各要素）
   - `trigger.description`
   - `problem.summary`
   - `solution.summary`
3. スコアリング：マッチしたフィールド数×重みでスコア計算
   - `title` マッチ: 重み3
   - `tags` マッチ: 重み3
   - `trigger.keywords` マッチ: 重み2
   - `trigger.description` マッチ: 重み1
   - `problem.summary` マッチ: 重み1
   - `solution.summary` マッチ: 重み1
4. スコア降順で上位5件を返す
5. `severity_filter` が指定されている場合、該当severityのみに絞り込む

**レスポンス形式：**
```
【verse-001】decides APIは角括弧呼び出し必須 [critical]
問題: 丸括弧呼び出しで文法/評価が崩れる。
AIの典型ミス: Api(...) で記述する。
対処法: decidesは [] で呼ぶ。
コード例: if (Cur := Stat.GetValue[Agent]):
---
【verse-003】永続はweak_map(player,persistable)に集約 [critical]
...
```

---

### Tool 2: `check_code_pattern`

**目的：** Verseコード断片を受け取り、既知の制約に該当するかチェックする  
**ユースケース：** AIがVerseコードを生成した直後に、そのコードに潜在的な問題がないか自動チェック

```typescript
{
  name: "check_code_pattern",
  description: "Verseコードの断片を受け取り、既知の制約やアンチパターンに該当するかチェックします。コード生成後の品質確認に使用してください。",
  inputSchema: {
    type: "object",
    properties: {
      code: {
        type: "string",
        description: "チェック対象のVerseコード断片"
      }
    },
    required: ["code"]
  }
}
```

**検索ロジック：**
1. 全レコードの `trigger.code_patterns` を走査
2. 各パターンが `code` 内に含まれているかを判定（部分文字列マッチ）
3. マッチしたレコードを全件返す
4. マッチなしの場合「既知の制約に該当するパターンは検出されませんでした」を返す

**レスポンス形式：**
```
⚠️ 2件の既知の制約を検出しました：

【verse-001】decides APIは角括弧呼び出し必須 [critical]
検出パターン: X.GetValue(...)
問題: 丸括弧呼び出しで文法/評価が崩れる。
対処法: decidesは [] で呼ぶ。
コード例: if (Cur := Stat.GetValue[Agent]):

【verse-014】suspends関数はspawnで起動 [critical]
検出パターン: spawn { Func(...) }
...

該当なしの場合:
✅ 既知の制約に該当するパターンは検出されませんでした。
```

---

### Tool 3: `get_verse_record`

**目的：** IDを指定して特定のレコードの詳細を取得  
**ユースケース：** 検索結果で気になったレコードの詳細を確認したいとき

```typescript
{
  name: "get_verse_record",
  description: "指定したIDのVerse制約レコードの詳細情報を取得します。",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "レコードID（例: 'verse-001'）"
      }
    },
    required: ["id"]
  }
}
```

**レスポンス形式：** 該当レコードの全フィールドを整形出力。関連レコード（related_ids）のタイトルも併記。

---

### Tool 4: `list_verse_categories`

**目的：** 全カテゴリとレコード数の一覧を表示  
**ユースケース：** ナレッジベースの全体像を把握、特定カテゴリの制約を探したいとき

```typescript
{
  name: "list_verse_categories",
  description: "Verse Memoryナレッジベースのカテゴリ一覧とレコード数を表示します。",
  inputSchema: {
    type: "object",
    properties: {
      category: {
        type: "string",
        enum: ["language_constraint", "device_behavior", "api_gotcha", "pattern_recommended", "pattern_antipattern", "workflow_tip", "all"],
        description: "特定カテゴリのレコード一覧を取得（デフォルト: all = カテゴリ一覧のみ）",
        default: "all"
      }
    }
  }
}
```

---

## エントリポイント（index.ts）の骨格

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { searchRecords, checkCodePatterns, getRecord, listCategories } from "./search.js";

const server = new McpServer({
  name: "verse-memory",
  version: "1.0.0",
  description: "UEFN Verse制約・パターンの検証済みナレッジベース"
});

// Tool 1: キーワード検索
server.tool(
  "search_verse_constraint",
  "UEFN Verseの制約・パターン・ハマりポイントをキーワードで検索します",
  {
    query: z.string().describe("検索キーワード"),
    severity_filter: z.enum(["critical", "warning", "info", "all"]).default("all").describe("重要度フィルタ")
  },
  async ({ query, severity_filter }) => {
    const results = searchRecords(query, severity_filter);
    return { content: [{ type: "text", text: results }] };
  }
);

// Tool 2: コードパターンチェック
server.tool(
  "check_code_pattern",
  "Verseコード断片を既知の制約に照合チェックします",
  {
    code: z.string().describe("チェック対象のVerseコード断片")
  },
  async ({ code }) => {
    const results = checkCodePatterns(code);
    return { content: [{ type: "text", text: results }] };
  }
);

// Tool 3: ID指定取得
server.tool(
  "get_verse_record",
  "指定IDのVerse制約レコード詳細を取得します",
  {
    id: z.string().describe("レコードID（例: verse-001）")
  },
  async ({ id }) => {
    const result = getRecord(id);
    return { content: [{ type: "text", text: result }] };
  }
);

// Tool 4: カテゴリ一覧
server.tool(
  "list_verse_categories",
  "ナレッジベースのカテゴリ一覧とレコード数を表示します",
  {
    category: z.enum([
      "language_constraint", "device_behavior", "api_gotcha",
      "pattern_recommended", "pattern_antipattern", "workflow_tip", "all"
    ]).default("all").describe("カテゴリ指定")
  },
  async ({ category }) => {
    const result = listCategories(category);
    return { content: [{ type: "text", text: result }] };
  }
);

// サーバー起動
const transport = new StdioServerTransport();
await server.connect(transport);
```

---

## Cursorからの接続設定

MCP Serverビルド後、Cursorの設定ファイルに以下を追加：

```json
{
  "mcpServers": {
    "verse-memory": {
      "command": "node",
      "args": ["C:/Users/oreno/OneDrive/デスクトップ/verse-memory/mcp-server/build/index.js"]
    }
  }
}
```

パスはTaichiさんのPC環境に合わせて調整。

---

## テスト手順

### 1. MCP Inspector で動作確認

```bash
cd mcp-server
npx @modelcontextprotocol/inspector node build/index.js
```

ブラウザで開き、4つのToolが表示されることを確認。

### 2. 各ツールのテストケース

**search_verse_constraint:**
- `query: "weak_map"` → verse-003, verse-004 が上位に出ること
- `query: "suspends decides"` → verse-034 が出ること
- `query: "存在しないワード"` → 0件の結果が正しく返ること

**check_code_pattern:**
- `code: "PlayerPoints.GetValue(Agent)"` → verse-001 が検出されること
- `code: "spawn { A(); B() }"` → verse-022 が検出されること
- `code: "var x : int = 0"` → 該当なしが返ること

**get_verse_record:**
- `id: "verse-001"` → 正しいレコードが返ること
- `id: "verse-999"` → 「見つかりません」エラーが返ること

**list_verse_categories:**
- `category: "all"` → 6カテゴリの一覧と件数が返ること
- `category: "language_constraint"` → 8件のレコード一覧が返ること

### 3. Cursor実機テスト

CursorでVerseコードを書く際に、以下を試す：
- 「weak_mapの制限について教えて」→ Verse Memoryから制約が引かれること
- Verseコードを書いた後に「このコードにVerse固有の問題がないかチェックして」→ パターンマッチが動くこと

---

## 実装時の注意事項

1. **stdoutにログを出さないこと。** stdioトランスポートではstdoutがMCPプロトコル通信に使われる。デバッグログは `console.error()` を使う。

2. **データファイルのパスは相対パス指定。** `mcp-server/` から `../data/verified/all_records.json` を参照する。

3. **検索は大文字小文字を無視。** キーワード・コードパターンともにcase-insensitiveで検索する。

4. **日本語検索に対応。** trigger.keywordsには日本語キーワードも含まれているため、日本語でのマッチングも動作すること。

5. **データ更新時の再起動。** all_records.jsonを更新した場合はMCP Serverの再起動が必要（起動時に1回読み込むシンプルな実装でOK）。
