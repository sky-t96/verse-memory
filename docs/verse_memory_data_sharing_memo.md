# Verse Memory — データ管理共有メモ

**作成日:** 2026-03-30
**用途:** データ管理・ナレッジ格納への引き渡し（コピペ用）

---

## 1. verse-004 — reference_url

### 主参照（1本にする場合）

https://dev.epicgames.com/documentation/en-us/uefn/map-in-verse

### 補助参照（必要に応じて solution やメモに列挙）

- https://dev.epicgames.com/documentation/en-us/fortnite/verse-persistence-best-practices
- https://dev.epicgames.com/documentation/en-us/fortnite/verse-api/versedotorg/verse/weak_map

---

## 2. verse-004 — verification（採用案）

```json
"verification": {
  "status": "verified",
  "verified_by": "taichi",
  "verified_date": "2026-03〜04頃（公式ドキュメント + Verse.digest 照合）。「weak_map 最大2個」はプロジェクト内コメント由来で公式未確認。",
  "uefn_version": "不明"
}
```

---

## 3. verse-004 — solution.summary 追記（標準版・採用）

既存の `solution.summary` の末尾に連結する。

> Epic 公式（Map in Verse / Verse Persistence Best Practices）では、モジュールスコープの `weak_map` と `persistable` に関する型・運用の指針が示される一方、「プロジェクト内で `weak_map(player, …)` を何個まで宣言できるか」という数値上限は、少なくとも当該ページ群では確認できなかった。本レコードの「乱立を避けて1レコードに集約する」は、永続データの整合性と保守性のための推奨パターンである。数値の「最大2つ」は実装コメント由来のため、公式ドキュメントで再確認できる根拠が得られたら `verification` を更新する。

---

## 4. weak_map 制限 — 調査要旨

| 項目 | 内容 |
|------|------|
| 公式 digest | `player` キーは参加中・未退場が前提。不適切な利用はランタイムエラー。`session` も weak_map キーとして言及あり。 |
| 「最大2つの weak_map」 | `fncs_solo_points.verse` コメント由来。公式の数値上限としては未確認。 |
| 推奨 | 複数 `weak_map` を増やすより、1つの `persistable` クラスにフィールドを集約する運用を推奨。 |
| verse-004 の category | QA 修正指示により `language_constraint` → `api_gotcha` に変更済み。 |

---

## 5. 重複統合版 JSON — QA 修正指示で反映した差分一覧

| ID | 変更内容 |
|----|----------|
| verse-004 | `category` → `api_gotcha` |
| verse-011 | `severity` → `critical` |
| verse-013 | `severity` → `critical` |
| verse-018 | `problem.summary` 具体化（failure context / GetSimulationElapsedTime） |
| verse-026 | `title` / `tags` / `problem.summary` 更新（ライフサイクル内の重複購読禁止の明確化） |
| verse-033 | `title` / `tags` 更新 |
| 関連 | `related_ids` 双方向化（指示書のペアどおり） |

マスターデータ: QA 修正指示適用後の 36 件フル JSON（`data/verified/all_records.json`）。

---

## 6. データ管理 — 推奨アクション

1. verse-004 に `reference_url`（主: map-in-verse）、上記 `verification`、`solution.summary` 追記（標準版） を反映する。 → **反映済み**
2. 公式に「weak_map のプロジェクトあたり最大 N 個」が明記された資料が見つかったら、`verification.verified_date` と `solution.summary` 末尾を更新する。
3. ナレッジの正本は QA 修正指示適用済みの 36 件とする。

---

## 7. 参照ファイル（プロジェクト内）

- `fncs_solo_points.verse` — 「player weak map は最大 2 つまで」コメント（verse-004 の数値根拠の出典メモ）
