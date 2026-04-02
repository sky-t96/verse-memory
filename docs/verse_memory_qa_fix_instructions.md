# Verse Memory — QAレビュー修正指示書

**作成日：** 2026年3月30日  
**対象：** 重複統合版cursor.txt（36件）  
**指示先：** Cursor（実装担当）  

---

## 修正内容

以下の修正をすべて適用し、修正済みの完全なJSON配列を出力してください。  
修正対象外のレコードはそのまま維持してください。

---

### 1. verse-004：category変更

```
変更前: "category": "language_constraint"
変更後: "category": "api_gotcha"
```

理由：weak_map上限2個はプラットフォーム制約であり、言語構文レベルの制約ではない。

---

### 2. verse-011：severity変更

```
変更前: "severity": "warning"
変更後: "severity": "critical"
```

理由：更新漏れでプレイヤー間のCompletedRoundが不一致→一部プレイヤーのデータ全消失。

---

### 3. verse-013：severity変更

```
変更前: "severity": "warning"
変更後: "severity": "critical"
```

理由：Endgame01開発で実際に毎ラウンドポイント全リセットが発生した既知障害。

---

### 4. verse-018：problem.summary具体化

```
変更前:
"summary": "条件節混在で失敗しやすい。"

変更後:
"summary": "GetSimulationElapsedTime自体は成功するが、その戻り値を使った演算をif条件内で行うとfailure context違反になる。本質的にはverse-017の具体例だが、API名での検索性を考慮し独立レコードとする。"
```

---

### 5. verse-026：title変更 + tags追加 + problem.summary補足

```
変更前:
"title": "SubscribeはOnBeginで1回のみ"
"tags": ["Subscribe", "multi_fire", "leak"]
"summary": "ハンドラ増殖で不安定になる。"

変更後:
"title": "Subscribeはライフサイクルあたり1回（ループ内再購読禁止）"
"tags": ["Subscribe", "multi_fire", "leak", "round", "lifecycle"]
"summary": "ループや状態遷移内でSubscribeを繰り返すとハンドラが増殖して不安定になる。OnBeginでのラウンドごとの再購読（verse-002）は正常な動作であり、ここで禁止しているのはライフサイクル内での重複購読。"
```

---

### 6. verse-033：title変更 + tags追加

```
変更前:
"title": "no_rollback直呼びは最小化（非推奨）"
"tags": ["no_rollback", "non_recommended", "failure_context", "queue_trigger"]

変更後:
"title": "no_rollback API呼び出しは集約・最小化する"
"tags": ["no_rollback", "non_recommended", "failure_context", "queue_trigger", "deprecated"]
```

---

### 7. related_ids 双方向化

以下のペアについて、参照先のrelated_idsに参照元のIDを追加してください。  
既存のrelated_idsは維持し、不足分のみ追加。

| 参照元 → 参照先 | 参照先に追加するID |
|---|---|
| verse-002 → verse-003 | verse-003に "verse-002" 追加 |
| verse-003 → verse-007 | verse-007に "verse-003" 追加 |
| verse-005 → verse-009 | verse-009に "verse-005" 追加 |
| verse-006 → verse-007 | verse-007に "verse-006" 追加 |
| verse-008 → verse-010 | verse-010に "verse-008" 追加 |
| verse-009 → verse-011 | verse-011に "verse-009" 追加 |
| verse-013 → verse-003 | verse-003に "verse-013" 追加 |
| verse-015 → verse-006 | verse-006に "verse-015" 追加 |
| verse-016 → verse-023 | verse-023に "verse-016" 追加 |
| verse-017 → verse-018 | verse-018に "verse-017" 追加 |
| verse-024 → verse-017 | verse-017に "verse-024" 追加 |
| verse-030 → verse-016 | verse-016に "verse-030" 追加 |
| verse-034 → verse-022 | verse-022に "verse-034" 追加 |
| verse-036 → verse-013 | verse-013に "verse-036" 追加 |
| verse-036 → verse-029 | verse-029に "verse-036" 追加 |

---

## 出力要件

- 修正済みの完全なJSON配列を出力すること（36件すべて）
- 修正対象外のレコードもそのまま含めること
- フォーマット（インデント・フィールド順序）は元ファイルと統一すること
