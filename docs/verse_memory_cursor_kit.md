# Verse Memory — Cursor データ収集キット

---

## 1. Cursor 向けプロンプト（初回・一括抽出用）

以下をそのまま Cursor に貼ってください。スキーマ定義も含まれているので、構造化された出力が返ってきます。

---

```
あなたにプロダクト開発の相談があります。

私は「Verse Memory」というプロダクトを構想しています。
UEFN開発者がAIツール（Cursor / Claude Code）と作業する際に、
検証済みのVerse制約・パターンを自動注入するナレッジベースSaaSです。

あなた（Cursor）はこれまで私のUEFN開発（Endgame01、tycoon_01）を
実装担当として一緒に進めてきました。
その中で、最初に書いたコードが動かずに修正したケース、
Verseの制約にハマって回避策を見つけたケース、
公式ドキュメントに書かれていない挙動を発見したケースが
多数あったはずです。

それらの知見を、以下のJSON形式で全て出力してください。
1件でも多く、思い出せる限り全て出してください。

【出力形式】
{
  "id": "verse-XXX（連番）",
  "title": "制約・パターンの端的な名称",
  "category": "以下から選択: language_constraint | device_behavior | api_gotcha | pattern_recommended | pattern_antipattern | workflow_tip",
  "tags": ["検索用タグ"],
  "trigger": {
    "description": "この知識が必要になる状況",
    "keywords": ["キーワード"],
    "code_patterns": ["コード中のマッチングパターン"]
  },
  "problem": {
    "summary": "何が問題か",
    "common_ai_mistake": "AIが典型的にどう間違えるか"
  },
  "solution": {
    "summary": "正しい対処法",
    "code_example": "正しいコード例（あれば）",
    "reference_url": null
  },
  "verification": {
    "status": "verified",
    "verified_by": "taichi",
    "verified_date": "確認した大体の時期",
    "uefn_version": "確認時のバージョン（わかれば）"
  },
  "severity": "critical | warning | info",
  "related_ids": []
}

【カテゴリの基準】
- language_constraint: Verse言語そのものの制約（コンパイルエラーになるもの）
- device_behavior: デバイスの挙動や設定の罠
- api_gotcha: APIの非直感的な挙動
- pattern_recommended: うまくいった実装パターン
- pattern_antipattern: やってはいけないパターン
- workflow_tip: 開発フロー上のTips（IARC、公開手順等）

【severityの基準】
- critical: 知らないとコードが動かない・ビルドが通らない
- warning: 動くが意図しない挙動やパフォーマンス問題
- info: 知っていると効率が上がるTips

まずは全件を一覧で出力し、その後で追加があれば教えてください。
```

---

## 2. Cursor 向けプロンプト（日常開発中の随時追加用）

普段の開発中にハマりポイントを発見したとき、会話の最後に貼るプロンプトです。

---

```
今のやりとりで発見した制約・ハマりポイントを
Verse Memory のレコードとして記録してください。

出力形式は以下のJSONで：
{
  "id": "verse-XXX",
  "title": "",
  "category": "language_constraint | device_behavior | api_gotcha | pattern_recommended | pattern_antipattern | workflow_tip",
  "tags": [],
  "trigger": {
    "description": "",
    "keywords": [],
    "code_patterns": []
  },
  "problem": {
    "summary": "",
    "common_ai_mistake": ""
  },
  "solution": {
    "summary": "",
    "code_example": "",
    "reference_url": null
  },
  "verification": {
    "status": "verified",
    "verified_by": "taichi",
    "verified_date": "2026-03-30",
    "uefn_version": ""
  },
  "severity": "critical | warning | info",
  "related_ids": []
}
```

---

## 3. データ管理ワークフロー

### 保管場所

```
verse-memory/
├── schema/
│   └── record_schema.json      ← スキーマ定義（変更があれば更新）
├── data/
│   ├── verified/
│   │   ├── verse-001.json      ← 検証済みレコード（1ファイル1レコード）
│   │   ├── verse-002.json
│   │   └── ...
│   └── draft/
│       └── cursor_batch_01.json ← Cursorから一括出力されたもの（レビュー前）
├── docs/
│   └── verse_knowledgebase_v0.md ← 今日作ったドキュメント
└── README.md
```

### 運用フロー

```
 Cursor一括出力
     ↓
 data/draft/ に保存
     ↓
 Taichiがざっと目視レビュー（内容が正しいか確認）
     ↓
 OKなものを data/verified/ に移動
     ↓
 IDの連番を振り直し
     ↓
 蓄積（目標：Phase 1 開始までに30件）
```

### 管理のポイント

- **GitHub リポジトリで管理するのがベスト。** バージョン管理ができるし、
  Phase 1 で API を構築するとき、このリポジトリをそのままデータソースにできる。
- **1ファイル1レコード** にしておくと、レビュー・編集・削除が楽。
- **draft と verified を分ける** ことで、Cursorの出力をまず受け入れて、
  検証してから正式データにするフローが自然にできる。

---

## 4. 並行作業の進め方

```
【通常のUEFN開発ライン】          【Verse Memory ライン】
        │                                │
  Endgame01 / tycoon_01            Cursorに初回プロンプト投入
  の通常開発を進める                 → 一括データ抽出
        │                                │
  開発中にハマりポイント発見    →    随時追加プロンプトで記録
        │                                │
  （開発は止めない）                 draft → レビュー → verified
        │                                │
        │                           30件たまったら
        │                           Phase 1（API構築）へ
        │                                │
        └────── 合流 ──────────────────────┘
                                    自分の開発で使って検証
```

### つまり

- **開発を止める必要はない。** 通常開発の「副産物」としてデータが貯まる構造。
- **追加作業は最小限。** ハマったときに随時追加プロンプトを貼るだけ。
- **初回の一括抽出** で大量のベースデータが手に入るので、
  あとは差分を追加していくだけ。
