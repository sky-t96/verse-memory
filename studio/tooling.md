# ツール導入状況（MCP・スキル・プラグイン）

最終更新: 2026-11-25

## 結論

- 2記事で紹介された25件は、すべて台帳に載せた: [`unity-kit/tools/TOOL_REGISTER.md`](unity-kit/tools/TOOL_REGISTER.md)
- **インストール済み・動作確認済みのものは0件。** 全件「未検証」。
- 理由: 25件のうちClaudeに接続するのは K01〜K03 の3件だけで、いずれも Windows 上の Unity Editor が必要。このクラウドセッションはLinuxで、Unityも接続できるPCもない。
- 残り22件はゲーム用のライブラリ・制作ソフト・サンプル・CIで、MCPやスキルではない。ゲームと工程が決まってから1つずつ試す。

## 出典

| # | 記事 | 読めたか |
|---|---|---|
| 1 | https://x.com/rosemoni18/status/2124998123210891290 （10件、H01〜H10） | 直接は読めていない（`x.com` がネットワークポリシーで遮断） |
| 2 | https://x.com/0xkense1/status/2125332891840172059 （15件、K01〜K15） | 同上 |

記事の内容は、ディレクターから受け取った引継ぎ資料（[`unity-kit/docs/HANDOVER_25_TOOLS.md`](unity-kit/docs/HANDOVER_25_TOOLS.md)）に基づく。資料と元記事の突き合わせはしていない。
25件のGitHubリポジトリは、このセッションからgitで読み取って存在・タグ・コミット・ライセンスを確認した（確認範囲は台帳の冒頭に記載）。

## 次の一手（Windows側）

[`unity-kit/README.md`](unity-kit/README.md) の手順で、キットを新規Unityプロジェクトのルートに置き、`docs/PLAN.md` の手順1から進める。

## 導入のルール

1. 採用するタグのREADME・LICENSE・Release・実行コード/フックを確認してから試す
2. 使い捨てプロジェクトか別ラボで先に試す
3. 台帳に採用版・実測・戻し方を記録してから本体に入れる
4. 有償・アカウント接続・クラウド送信が絡むものはディレクターの承認を得る

SNSで紹介されたツールを、中身を見ずに一括導入しない。

## このリポジトリ（スタジオ本体）で使えるもの

| 種別 | 名称 | 用途 |
|---|---|---|
| エージェント | `.claude/agents/` の10体 | 部署エージェント（企画・事業・審査） |
| スキル | `studio-kickoff` / `greenlight` / `studio-standup` | スタジオ運営ワークフロー |
| キット | `studio/unity-kit/` | Unity制作現場用の6担当・計画・台帳（Windowsへコピーして使う） |
| MCP（リポジトリ内） | `mcp-server/`（Verse Memory） | Verseの制約チェック。Unityの1本目では使わない |
