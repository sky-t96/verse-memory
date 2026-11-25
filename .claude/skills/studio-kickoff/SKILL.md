---
name: studio-kickoff
description: Fable AI Game Studio のフェーズ0（探索）を実行し、市場調査からコンセプトピッチ3案を作ってディレクターに上申する。ディレクターが「新しいゲームを考えたい」「企画を出して」「何を作るか決めたい」と言ったとき、または /studio-kickoff で使う。
---

# studio-kickoff — フェーズ0 探索

スタジオヘッドとして実行する。先に `studio/CLAUDE.md` と `studio/pipeline.md` を読む。

## 1. 条件の確認

引数や会話から次を拾う。分からない項目は、既定値で進めて上申時に前提として明記する（質問で止めない）。

- 希望の配信先（既定: 1本目はUnity前提。Unityから出せる配信先を絞らず比較する）
- 使える時間と予算（既定: ディレクター1名＋AI、初期費用は最小）
- 避けたいジャンル・やりたい方向（既定: なし）

## 2. 市場調査（並列）

`market-analyst` に発注する。プラットフォームごとに分けて並列で出して良い。
成果物: `studio/projects/_discovery/market_scan_YYYY-MM-DD.md`

## 3. 機会とピッチ

1. `game-designer` に、調査結果を渡して機会10個 → 上位3案のコンセプトピッチを発注（`studio/templates/concept_pitch.md`）。
2. 3案それぞれについて並列で発注:
   - `monetization-designer`: 収益モデルと収支レンジ
   - `gameplay-engineer`: 実現性とプロトタイプ工数

成果物: `studio/projects/_discovery/pitch_<slug>.md`

## 4. 統合と上申

- 3案を突き合わせ、部署間の矛盾を解消する。
- 数字に出典があるか、楽観ケースだけで語っていないかを確認する。
- 比較表（市場性 / 収益性 / 実現性 / 工数 / 最大リスク）と推奨1案を作る。
- ディレクターに上申する: 推奨案 → 根拠 → 他の2案 → 決めてほしいこと。

## 5. 決裁後

ディレクターが案を選んだら、`studio/projects/<project>/` を作成してピッチを移し、`gates/G0.md` と `studio/decision_log.md` に記録する。フェーズ1に進む。
