# Cursor 向けプロンプト — verse-060〜063 再出力依頼

以下のプロンプトを Cursor にそのまま貼ってください。

---

## プロンプト本文

```
前回 all_records.json に追記した verse-060〜063 が、ファイル切り詰めにより消失しました。
同じ内容で再出力してください。

### 出力要件

1. JSON 配列（`[{...}, {...}, {...}, {...}]`）で 4件だけ返す。
2. 以下のスキーマに厳密に従うこと。

#### 必須フィールド（すべてのレコード）
- id: "verse-XXX" 形式（3桁ゼロ埋め）
- title: string
- category: "language_constraint" | "device_behavior" | "api_gotcha" | "pattern_recommended" | "pattern_antipattern" | "workflow_tip"
- tags: string[] （1個以上）
- trigger: { description, keywords: string[], code_patterns: string[] }
- problem: { summary, common_ai_mistake }
- solution: { summary, code_example: string|null, reference_url: string|null }
- verification: { status: "verified", verified_by: "taichi", verified_date: "2026-04-02", uefn_version: "" }
- severity: "critical" | "warning" | "info"
- related_ids: string[]（空配列可、参照先は実在IDのみ）
- manifest_section: string（任意）

### 各レコードの仕様

| ID | category | title の要約 | related_ids |
|---|---|---|---|
| verse-060 | pattern_recommended | `@editable` → `OnBegin` で `set` して runtime map 集約（棚コスト・収入） | ["verse-049", "verse-050", "verse-062"] |
| verse-061 | workflow_tip | MCP 疎通は `list_verse_categories` 基準。`ListMcpResources` 空は盲信しない | [] |
| verse-062 | workflow_tip | 棚拡張時の 5点セット（購読/ビジュアル/コスト/ステージ要件/収入表） | ["verse-049", "verse-050", "verse-060"] |
| verse-063 | pattern_recommended | ビットフラグ棚の ShelfId 上限と Decode 範囲を拡張と同時に見直す | [] |

### 注意事項
- verse-049 と verse-050 の related_ids には後で verse-060, verse-062 を追加するので、そちらは変更不要。
- solution.code_example / solution.reference_url は該当なければ null でOK。
- JSON だけを返すこと（説明文不要）。
```

---

## Cowork 側の後処理

Cursor から返ってきた JSON を Cowork に貼れば、以下を自動実行します：
1. スキーマバリデーション
2. verse-049 / verse-050 の related_ids に verse-060, verse-062 を追加
3. 双方向 related_ids 整合性チェック
4. all_records.json へ統合（verse-059 の後に追加）
