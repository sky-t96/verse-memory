# Verse Memory — Cowork 運用ガイド（CLAUDE.md）

## プロジェクト概要

Verse Memoryは、UEFN開発者がAIツール（Cursor / Claude Code）と作業する際に、検証済みのVerse制約・パターンを自動注入するナレッジベースSaaS。

## Coworkの役割

このプロジェクトにおけるCoworkの担当は**データ管理**です。
具体的には以下の作業を行います。

### やること
- Cursorから出力されたJSONレコードのスキーマ準拠チェック
- IDの連番管理（欠番・重複の検出）
- `data/draft/` → `data/verified/` へのファイル移動・整理
- 重複レコードの検出
- tags / category / severity の不整合チェック
- related_ids の双方向整合性チェック
- レコード数・進捗のカウント
- `marketing/posts/` の投稿素材ファイル管理

### やらないこと
- レコード内容（problem / solution）の正誤判断（Taichiが行う）
- API / MCP Serverの実装（Phase 1以降、別レイヤーで実施）
- マーケティング戦略の策定（マーケティングレイヤーで実施）

## ディレクトリ構成

```
verse-memory/
├── CLAUDE.md                      ← このファイル（Coworkへの指示）
├── schema/
│   └── record_schema.json         ← スキーマ定義（正）
├── data/
│   ├── draft/                     ← Cursor出力・レビュー前
│   └── verified/
│       └── all_records.json       ← QA済み正式データ（36件）
├── marketing/
│   └── posts/                     ← X投稿用下書き
├── docs/
│   ├── verse_knowledgebase_v0.md   ← 初期スキーマ設計ドキュメント
│   ├── verse_memory_cursor_kit.md  ← Cursor向けプロンプト集
│   ├── verse_memory_product_briefing.md  ← プロダクト概要資料
│   ├── verse_memory_daily_workflow_v2.md ← 日常開発統合タスク
│   ├── verse_memory_qa_review_brief.md   ← QAレビュー依頼書テンプレ
│   ├── verse_memory_qa_fix_instructions.md ← QA修正指示書テンプレ
│   └── verse_manifest.md              ← Verse Memoryレコードの根拠となる開発ルール集
└── README.md
```

## スキーマ定義

レコードの正式なスキーマは `schema/record_schema.json` を参照。
以下はバリデーション時の簡易チェックリスト：

### 必須フィールド
- id（verse-XXX形式、連番）
- title（string）
- category（下記6種のいずれか）
- tags（string配列、1個以上）
- trigger.description, trigger.keywords, trigger.code_patterns
- problem.summary, problem.common_ai_mistake
- solution.summary
- verification.status, verification.verified_by, verification.verified_date
- severity（下記3種のいずれか）
- related_ids（string配列、空配列可）

### category 許可値
language_constraint / device_behavior / api_gotcha / pattern_recommended / pattern_antipattern / workflow_tip

### severity 許可値
critical / warning / info

### バリデーションルール
1. id の連番に欠番・重複がないこと
2. related_ids の参照先IDがすべて実在すること
3. related_ids が双方向であること（AがBを参照→BもAを参照）
4. verification.status は原則 "verified"
5. solution.code_example は null 許可
6. solution.reference_url は null 許可

## 作業フロー

### 新規レコード追加時
1. Taichiが `data/draft/` にCursor出力のJSONを配置
2. Coworkがスキーマバリデーションを実行
3. バリデーション結果をTaichiに報告
4. Taichiが内容を目視承認
5. Coworkが承認済みレコードを `data/verified/all_records.json` に統合
6. ID振り直し・related_ids整合性チェック

### 定期確認（週次）
- `data/verified/` のレコード総数を報告
- `marketing/posts/` の投稿素材数を報告
- 直近追加分のcategory / severity 分布を報告
