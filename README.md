# Verse Memory

**AIがVerseの制約を忘れない。UEFN開発者のためのナレッジベースMCP Server。**

Verse Memoryは、UEFN（Unreal Editor for Fortnite）の開発言語「Verse」でAIコーディングツール（Cursor / Claude Code）を使う際に、AIが頻繁にやらかすミスや言語固有の制約を自動的にAIへ注入するナレッジベースです。

## なぜ必要か

AIでVerseコードを書くと、こういうことが起きます。

```verse
# AIが書くコード（間違い）
var Count := 0              # ❌ var宣言に型推論は使えない
if (Score == 100):           # ❌ Verseの比較は = であって == ではない
Value := Arr[i]              # ❌ 配列アクセスは失敗可能式、if束縛が必要
```

AIは他言語（Python, JavaScript, C#）の知識でVerseを類推するため、Verse固有の制約を繰り返し踏みます。Verse Memoryはこの問題を解決します。

## 特徴

- **113件の検証済みレコード** — 実開発とEpic公式教科書から体系的に収集
- **公式根拠付き** — 50件以上が [Book of Verse](https://verselang.github.io/book/) のURLを根拠として保持
- **AIの間違いパターンを記録** — 各レコードに「AIがどう間違えるか」を具体的に記述
- **MCP Server** — Cursor / Claude Code から直接利用可能
- **4つのツール** — キーワード検索、コードパターンチェック、ID指定取得、カテゴリ一覧

## クイックスタート

### 必要なもの

- Node.js 18以上
- Cursor または Claude Code

### インストール

```bash
git clone https://github.com/sky-t96/verse-memory.git
cd verse-memory/mcp-server
npm install
npm run build
```

### Cursorへの接続

グローバル設定ファイル（`~/.cursor/mcp.json`）に以下を追加：

```json
{
  "mcpServers": {
    "verse-memory": {
      "type": "stdio",
      "command": "node",
      "args": [
        "/ABSOLUTE/PATH/TO/verse-memory/mcp-server/build/index.js"
      ]
    }
  }
}
```

`/ABSOLUTE/PATH/TO/` を実際のパスに置き換えてください。

### 動作確認

Cursorで以下のように聞いてみてください：

```
weak_mapの制限について、Verse Memoryで確認してください
```

Verse Memoryのレコードが引用された回答が返ってくれば成功です。

## ツール一覧

| ツール | 説明 |
|---|---|
| `search_verse_constraint` | キーワードでVerse制約を検索 |
| `check_code_pattern` | Verseコード断片を既知の制約に照合チェック |
| `get_verse_record` | ID指定でレコード詳細を取得 |
| `list_verse_categories` | カテゴリ一覧とレコード数を表示 |

## データ構造

各レコードは以下の情報を持ちます：

- **trigger** — いつこの知識を引くか（キーワード＋コードパターン）
- **problem** — 何が問題か＋AIの典型的な間違い
- **solution** — 正しい対処法＋コード例＋公式リファレンスURL
- **verification** — 検証ステータス・検証者・対応UEFNバージョン
- **severity** — critical / warning / info
- **manifest_section** — 対応する開発マニフェストのセクション

## カテゴリ

| カテゴリ | 説明 |
|---|---|
| `language_constraint` | Verse言語レベルの制約 |
| `device_behavior` | デバイスの挙動・設定の罠 |
| `api_gotcha` | APIの非直感的挙動 |
| `pattern_recommended` | 推奨される実装パターン |
| `pattern_antipattern` | やってはいけないパターン |
| `workflow_tip` | 開発フロー上のTips |

## コントリビュート

Verse Memoryは開発者コミュニティからのデータ貢献を歓迎します。

1. 新しい制約やハマりポイントを発見したら、`schema/record_schema.json` に準拠したJSONレコードを作成
2. `data/draft/` にファイルを追加してPull Requestを送信
3. レビュー後、`data/verified/` に統合されます

## フィードバック

バグ報告・データリクエスト・質問は [Discord](YOUR_DISCORD_LINK) まで。

## ライセンス

MIT License
