# Verse Memory — QAレビュー依頼書

**作成日：** 2026年3月30日  
**依頼元：** プロダクト開発レイヤー  
**対象：** QA担当  

---

## 概要

Verse Memoryは、UEFN開発者がAIツール（Cursor / Claude Code）と作業する際に、検証済みのVerse制約・パターンを自動注入するナレッジベースSaaSです。

Cursorとの開発実績から一括抽出した**36件のスキーマレコード**が完成しました。これをプロダクトの正式データ（verified）として格納する前に、QAレビューを依頼します。

---

## レビュー対象ファイル

本依頼書と一緒に共有される `重複統合版cursor.txt`（JSON配列、36件）

---

## スキーマ構造（レビュー時の参照用）

各レコードは以下のフィールドを持ちます：

| フィールド | 役割 | レビュー観点 |
|---|---|---|
| `id` | 一意のID（verse-001〜036） | 連番に欠番・重複がないか |
| `title` | 制約・パターンの端的な名称 | 内容を正確に要約しているか |
| `category` | 分類カテゴリ（下記6種） | 正しいカテゴリに分類されているか |
| `tags` | 検索用タグ | 検索で引っかかるべきキーワードが含まれているか |
| `trigger.description` | この知識が必要になる状況 | 開発者の行動として自然な記述か |
| `trigger.keywords` | キーワード検索用 | 漏れ・過不足がないか |
| `trigger.code_patterns` | コードマッチングパターン | 実際のVerseコードで出現するパターンか |
| `problem.summary` | 何が問題か | 端的で正確か |
| `problem.common_ai_mistake` | AIの典型的な間違い | 実際にAIが犯しやすいミスか |
| `solution.summary` | 正しい対処法 | 正確で実行可能か |
| `solution.code_example` | 正しいコード例 | コードが正しいか・省略が適切か |
| `verification.status` | 検証ステータス | 全件 "verified" であるべき |
| `severity` | 重要度（critical/warning/info） | 基準に照らして妥当か |
| `related_ids` | 関連レコードのID | 参照先が実在するか・関連性が妥当か |

### category 一覧

| category | 意味 | 該当例 |
|---|---|---|
| `language_constraint` | Verse言語レベルの制約（コンパイルに影響） | decides角括弧、suspends/decides併用不可 |
| `device_behavior` | デバイスの挙動・設定の罠 | creative_device再初期化、scoreboard列 |
| `api_gotcha` | APIの非直感的挙動 | eliminationイベント順序、OnBegin直後stat |
| `pattern_recommended` | 推奨される実装パターン | weak_map永続、勝敗冪等ロック |
| `pattern_antipattern` | やってはいけないパターン | PersistTotal設計ミス、多重Subscribe |
| `workflow_tip` | 開発フロー上のTips | Direct Event Binding、MVVM設計 |

### severity 基準

| severity | 基準 |
|---|---|
| `critical` | これを知らないとコードが動かない・ビルドが通らない |
| `warning` | 動くが意図しない挙動やパフォーマンス問題を引き起こす |
| `info` | 知っていると効率が上がるTips |

---

## レビュー観点（チェックリスト）

各レコードに対して、以下の5観点でレビューしてください。

### ① 正確性
- `problem.summary` の記述は事実として正しいか
- `solution.summary` の対処法は実際に有効か
- `solution.code_example` のコードに構文ミスや論理ミスがないか

### ② 分類の妥当性
- `category` は正しいカテゴリに割り当てられているか
- `severity` は基準に照らして適切か（特にcritical/warningの境界）

### ③ 検索性
- `trigger.keywords` に、開発者がこの問題にぶつかったとき検索しそうな単語が含まれているか
- `trigger.code_patterns` に、実際のVerseコードで出現するパターンが含まれているか
- `tags` に漏れがないか

### ④ 一貫性
- レコード間で用語・表現が統一されているか
- `related_ids` の参照先IDが実在するか
- `related_ids` の関連性が双方向で整合しているか（AがBを参照→BもAを参照しているか）

### ⑤ 重複・欠落
- 内容が重複しているレコードがないか
- 明らかに抜けている重要な制約がないか（レビュアーの知見の範囲で）

---

## 出力フォーマット

レビュー結果は以下の形式で報告してください。

### 全体サマリ
- 総件数：36件
- 問題なし（PASS）：XX件
- 要修正（FIX）：XX件
- 要議論（DISCUSS）：XX件

### 個別レポート（問題があるレコードのみ）

```
【verse-XXX】タイトル
判定：FIX / DISCUSS
観点：①正確性 / ②分類 / ③検索性 / ④一貫性 / ⑤重複
指摘内容：（具体的な問題点）
修正案：（可能であれば）
```

### related_ids 整合性チェック
- 片方向のみの参照があるペアをリストアップ

---

## 補足情報

### データの出自
- 36件すべて、Taichiが実際のUEFN開発（Endgame01：48人ソロBR、CURSED TYCOON 1V1）で発見・検証した制約
- 実装担当のCursor（AIコーディングツール）が開発履歴に基づいて一括抽出し、重複統合を行った

### レビュー後のフロー
1. QAレビュー完了
2. FIX指摘をTaichiが修正
3. DISCUSS項目をプロダクト開発レイヤーで判断
4. 全件PASS後、`data/verified/` に格納
5. Phase 1（API構築）に進行

### 注意事項
- `verification.verified_date` が「2026-03頃」「2026-03末」など曖昧な記載がある。これはデータ収集時の制約であり、QAでの指摘は不要（今後の新規レコードでは正確な日付を記録する運用に変更済み）
- `verification.uefn_version` が「不明」のものが多い。同上の理由で、今回は指摘不要
