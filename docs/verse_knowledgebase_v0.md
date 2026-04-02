# Verse Knowledge Base — Schema & 初期データ

## プロダクト概要

**名称（仮）：** Verse Memory  
**概要：** UEFN開発者がAIツール（Cursor / Claude Code）と作業する際に、検証済みのVerse制約・パターンを自動注入するナレッジベースSaaS  
**差別化：** 汎用記憶サービス（Mem0等）と異なり、実機検証済みの品質保証付きUEFN特化知識  

---

## スキーマ定義

```json
{
  "id": "string — 一意のID（verse-001形式）",

  "title": "string — 制約・パターンの端的な名称",

  "category": "enum — 分類カテゴリ（下記参照）",

  "tags": ["string — 検索用タグの配列"],

  "trigger": {
    "description": "string — この知識が必要になる状況の説明",
    "keywords": ["string — キーワード検索用の単語リスト"],
    "code_patterns": ["string — コード中のマッチングパターン"]
  },

  "problem": {
    "summary": "string — 何が問題なのかの簡潔な説明",
    "common_ai_mistake": "string — AIが典型的にどう間違えるか"
  },

  "solution": {
    "summary": "string — 正しい対処法の説明",
    "code_example": "string | null — 正しいコード例（該当する場合）",
    "reference_url": "string | null — 公式ドキュメント等のURL"
  },

  "verification": {
    "status": "enum — verified | unverified | community_reported",
    "verified_by": "string — 検証者",
    "verified_date": "string — 検証日（YYYY-MM-DD）",
    "uefn_version": "string — 検証時のUEFNバージョン"
  },

  "severity": "enum — critical | warning | info",

  "related_ids": ["string — 関連するレコードのID"]
}
```

### category 一覧

| category | 説明 | 例 |
|---|---|---|
| `language_constraint` | Verse言語レベルの制約 | no_rollback非推奨、suspends/decides併用不可 |
| `device_behavior` | デバイスの挙動・制約 | stat_creator_deviceのバインディング |
| `api_gotcha` | APIの罠・非直感的挙動 | EndMatchForfeit の挙動 |
| `pattern_recommended` | 推奨される実装パターン | MVVM構成、イベント購読パターン |
| `pattern_antipattern` | やってはいけないパターン | 非推奨の書き方、パフォーマンス問題 |
| `workflow_tip` | 開発フロー上のTips | IARC申請、Creator Portal操作 |

### severity 定義

| severity | 意味 |
|---|---|
| `critical` | これを知らないとコードが動かない・ビルドが通らない |
| `warning` | 動くが意図しない挙動やパフォーマンス問題を引き起こす |
| `info` | 知っていると効率が上がるTips |

---

## 初期データ（Taichi実機検証済み）

### verse-001: no_rollback は非推奨

```json
{
  "id": "verse-001",
  "title": "no_rollback は非推奨",
  "category": "language_constraint",
  "tags": ["rollback", "concurrency", "deprecated", "transaction"],
  "trigger": {
    "description": "コード中に no_rollback 指定が出現、またはトランザクション制御に関する質問",
    "keywords": ["no_rollback", "rollback", "トランザクション"],
    "code_patterns": ["<no_rollback>", "no_rollback"]
  },
  "problem": {
    "summary": "no_rollback は Verse の以前のバージョンで使われていた指定だが、現在は非推奨となっている",
    "common_ai_mistake": "AIが古いドキュメントや学習データに基づき、no_rollback を含むコードを生成する"
  },
  "solution": {
    "summary": "no_rollback を使用せず、現行のVerse仕様に沿った並行処理パターンを使用する",
    "code_example": null,
    "reference_url": null
  },
  "verification": {
    "status": "verified",
    "verified_by": "taichi",
    "verified_date": "2025-12-01",
    "uefn_version": "32.00"
  },
  "severity": "critical",
  "related_ids": ["verse-002"]
}
```

### verse-002: suspends と decides は同一関数に併用不可

```json
{
  "id": "verse-002",
  "title": "<suspends> と <decides> は同一関数に併用不可",
  "category": "language_constraint",
  "tags": ["suspends", "decides", "async", "failable", "effect"],
  "trigger": {
    "description": "非同期処理と失敗可能処理を組み合わせようとしたとき",
    "keywords": ["suspends", "decides", "async", "failable"],
    "code_patterns": ["<suspends><decides>", "<decides><suspends>"]
  },
  "problem": {
    "summary": "Verseでは <suspends> と <decides> の両方のエフェクトを同一関数に指定することができない。非同期処理（待機を伴う処理）と失敗可能な処理は別関数に分離する必要がある",
    "common_ai_mistake": "AIが一つの関数に <suspends><decides> を両方付けたコードを生成し、コンパイルエラーになる"
  },
  "solution": {
    "summary": "非同期処理を行う関数と失敗判定を行う関数を分離し、呼び出し側で組み合わせる設計にする",
    "code_example": "# NG: MyFunc()<suspends><decides>:void = ...\n# OK: 分離する\nAsyncPart()<suspends>:void = ...\nDecisionPart()<decides>:void = ...",
    "reference_url": null
  },
  "verification": {
    "status": "verified",
    "verified_by": "taichi",
    "verified_date": "2025-12-01",
    "uefn_version": "32.00"
  },
  "severity": "critical",
  "related_ids": ["verse-001"]
}
```

### verse-003: EndMatchForfeit には別途 OnMatchAborted パスが必要

```json
{
  "id": "verse-003",
  "title": "EndMatchForfeit には別途 OnMatchAborted パスが必要",
  "category": "api_gotcha",
  "tags": ["EndMatch", "EndMatchForfeit", "match", "forfeit", "abort"],
  "trigger": {
    "description": "試合終了処理を実装する際、特にフォーフェイト（途中棄権）のハンドリング",
    "keywords": ["EndMatch", "EndMatchForfeit", "forfeit", "試合終了", "棄権", "中断"],
    "code_patterns": ["EndMatchForfeit", "EndMatch("]
  },
  "problem": {
    "summary": "EndMatchForfeit を使用する場合、通常の EndMatch とは別に OnMatchAborted のイベントパスを用意しないと、棄権時の処理が正しく動作しない",
    "common_ai_mistake": "AIが EndMatch のみで全ケースを処理しようとし、フォーフェイト時にハンドリング漏れが発生する"
  },
  "solution": {
    "summary": "EndMatchForfeit を使う場合は OnMatchAborted イベントを別途購読し、棄権時の処理（スコアリセット、プレイヤー状態復元等）を明示的に実装する",
    "code_example": null,
    "reference_url": null
  },
  "verification": {
    "status": "verified",
    "verified_by": "taichi",
    "verified_date": "2026-01-15",
    "uefn_version": "33.00"
  },
  "severity": "critical",
  "related_ids": []
}
```

### verse-004: stat_creator_device の MVVM バインディング接続

```json
{
  "id": "verse-004",
  "title": "stat_creator_device の MVVM_UEFN_Stat バインディングによるリアルタイムHUD更新",
  "category": "device_behavior",
  "tags": ["stat_creator_device", "MVVM", "widget", "HUD", "binding", "arenapoints"],
  "trigger": {
    "description": "プレイヤーごとのスコアやポイントをリアルタイムでHUDに表示したいとき",
    "keywords": ["stat_creator_device", "MVVM", "widget", "HUD", "スコア表示", "ポイント表示"],
    "code_patterns": ["stat_creator_device", "MVVM_UEFN_Stat", "arenapoints_widget"]
  },
  "problem": {
    "summary": "stat_creator_device でカスタムスコアを管理し、ウィジェットにリアルタイム反映するには MVVM_UEFN_Stat バインディングを正しく接続する必要があるが、設定手順が公式ドキュメントで不明瞭",
    "common_ai_mistake": "AIが直接ウィジェットの値を更新しようとするコードを生成するが、MVVM バインディングを通さないと反映されない"
  },
  "solution": {
    "summary": "stat_creator_device → MVVM_UEFN_Stat バインディング → arenapoints_widget の接続チェーンを正しく構成する。elimination イベント発火時にstat値を更新すれば、バインディング経由でHUDに自動反映される",
    "code_example": null,
    "reference_url": null
  },
  "verification": {
    "status": "verified",
    "verified_by": "taichi",
    "verified_date": "2026-03-01",
    "uefn_version": "34.00"
  },
  "severity": "warning",
  "related_ids": []
}
```

### verse-005: IARC申請の暴力表現コンテキスト回答

```json
{
  "id": "verse-005",
  "title": "IARC申請で暴力表現を「非現実的/ファンタジー」と回答する",
  "category": "workflow_tip",
  "tags": ["IARC", "publishing", "Creator Portal", "rating", "violence"],
  "trigger": {
    "description": "島を公開（パブリッシュ）する際のIARC審査プロセス",
    "keywords": ["IARC", "パブリッシュ", "公開", "審査", "レーティング", "リジェクト"],
    "code_patterns": []
  },
  "problem": {
    "summary": "IARC審査で暴力表現のコンテキストに関する質問に「realistic（リアル）」と回答するとリジェクトされる。Fortniteのアートスタイルは非現実的であるため、正しい回答は「fantasy/non-realistic」",
    "common_ai_mistake": "AIがIARC申請のアドバイスをする際、銃撃などの要素があると「realistic」を推奨してしまう"
  },
  "solution": {
    "summary": "暴力表現のコンテキスト質問では必ず「fantasy/non-realistic（ファンタジー/非現実的）」を選択する。Fortniteのビジュアルスタイル自体が非現実的であるため、これが正しい分類",
    "code_example": null,
    "reference_url": null
  },
  "verification": {
    "status": "verified",
    "verified_by": "taichi",
    "verified_date": "2025-10-01",
    "uefn_version": "31.00"
  },
  "severity": "critical",
  "related_ids": []
}
```

---

## 次のステップ

### Phase 0（現在）
- [x] スキーマ定義
- [x] 初期データ 5件作成
- [ ] Taichiの開発で新たに発見した制約を随時追加
- [ ] 目標：30件で MVP に十分なデータ量

### Phase 1（API構築）
- [ ] JSON データを検索・取得できる REST API
- [ ] キーワード検索 + コードパターンマッチングの両対応
- [ ] ホスティング（Vercel / Railway 等、月額数千円）

### Phase 2（MCP Server化）
- [ ] MCP プロトコル対応のラッパー実装
- [ ] Cursor / Claude Code からの接続テスト
- [ ] ベータユーザー募集（UEFN開発者コミュニティ）

### Phase 3（拡張）
- [ ] コミュニティからの制約レポート受付機能
- [ ] UEFNバージョン更新時の再検証フロー
- [ ] プロジェクト固有の記憶レイヤー追加（個別プロジェクトの状態管理）
