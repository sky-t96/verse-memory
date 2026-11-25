# ツール台帳（TOOL_REGISTER）

対象: 引継ぎ資料（`docs/HANDOVER_25_TOOLS.md`）の H01〜H10・K01〜K15、計25件。

## この台帳の読み方

- **状態はすべて「未検証」**。どれもインストールしておらず、1件も実行していない。
- **2026-11-25 に確認したこと**（クラウドのLinuxセッションから、各リポジトリをgitで読み取り）:
  リポジトリの存在、既定ブランチのHEADコミット、タグ一覧、ルートのライセンスファイルの冒頭。K01〜K03とK11はREADMEとマニフェストの一部も読んだ。
- **確認していないこと**: Windowsでの動作、Unity Editorとの接続、同梱サードパーティのライセンス、READMEの全文（K01〜K03以外）、Releaseページの配布物。
- 状態の値: `未検証` → `ラボ合格` → `本番採用` ／ `保留（理由）`。
- 採用するときは、下の「最新タグ」ではなく**その時点で選んだタグとコミットSHA**を「採用版」欄に書く。
- ライセンス欄はリポジトリ本体のもの。素材の再配布可否はライセンス名だけで決めず、素材単位で確認する。

## 一覧

| ID | 名称 | 種類 | 最新タグ | HEAD（日付） | ライセンス | 状態 | 採用版 |
|---|---|---|---|---|---|---|---|
| H01 | [Jolt Physics](https://github.com/jrouwe/JoltPhysics) | C++物理 | v5.7.0 | cb1a624（2026-11-24） | MIT | 未検証 | — |
| H02 | [Terrain3D](https://github.com/TokisanGames/Terrain3D) | Godot 4 地形 | v1.1.0-stable | 69699ff（2026-11-21） | MIT | 未検証 | — |
| H03 | [Material Maker](https://github.com/RodZill4/material-maker) | 素材エディタ | 1.8 | 7d6daae（2026-10-24） | MIT | 未検証 | — |
| H04 | [Effekseer](https://github.com/effekseer/Effekseer) | VFX制作＋ランタイム | 1.80.1 ※1 | b570008（2026-10-30） | MIT（本体・ランタイム・ツール各ファイル） | 未検証 | — |
| H05 | [Voxel Tools for Godot](https://github.com/Zylann/godot_voxel) | Godot ボクセル | v1.7 / v1.7x | 4b29b07（2026-11-19） | MIT | 未検証 | — |
| H06 | [Recast Navigation](https://github.com/recastnavigation/recastnavigation) | C++ナビメッシュ | v1.6.0 | 9f4ce64（2026-02-27） | zlib | 未検証 | — |
| H07 | [ozz-animation](https://github.com/guillaumeblanc/ozz-animation) | C++骨格アニメ | 0.17.0 | 744eb9d（2026-08-01） | MIT | 未検証 | — |
| H08 | [The Forge](https://github.com/ConfettiFX/The-Forge) | 描画基盤 | v1.63 | cd50468（2026-08-27） | Apache-2.0 | 未検証 | — |
| H09 | [meshoptimizer](https://github.com/zeux/meshoptimizer) | メッシュ最適化 / gltfpack | v1.3 | 8547fc3（2026-11-21） | MIT | 未検証 | — |
| H10 | [FastNoise2](https://github.com/Auburn/FastNoise2) | C++ノイズ | v1.1.1 | c35d604（2026-11-05） | MIT | 未検証 | — |
| K01 | [Unity Agent Plugin](https://github.com/Unity-Technologies/unity-agent-plugin) | Claude Code プラグイン（スキル） | v0.1.10-beta | 70acf73（2026-11-24） | Unity Companion License | 未検証 | — |
| K02 | [IvanMurzak Unity-MCP](https://github.com/IvanMurzak/Unity-MCP) | MCP（Editor接続） | 1.14.3 ※2 | 9fb90b6（2026-11-24） | Apache-2.0 | 未検証 | — |
| K03 | [CoderGamester MCP Unity](https://github.com/CoderGamester/mcp-unity) | MCP（Editor接続） | 1.5.0 | d572dc8（2026-10-11） | MIT | 未検証 | — |
| K04 | [Blockbench](https://github.com/JannisX11/blockbench) | 低ポリ制作ソフト | v5.2.2 | ec0b282（2026-10-18） | GPL-3.0 | 未検証 | — |
| K05 | [Krita](https://github.com/KDE/krita) | 2D制作ソフト | v6.0.5 | a92d645（2026-11-24） | GPL-3.0（ほか `LICENSES/` に複数） | 未検証 | — |
| K06 | [LitMotion](https://github.com/annulusgames/LitMotion) | Unity Tween | v2.0.2 | 4615821（2026-11-22） | MIT | 未検証 | — |
| K07 | [UniTask](https://github.com/Cysharp/UniTask) | Unity 非同期 | 2.5.11 | a77a1b4（2026-10-06） | MIT | 未検証 | — |
| K08 | [Fluid Behavior Tree](https://github.com/ashblue/fluid-behavior-tree) | Unity 敵AI | v2.3.0 | 2781317（**2025-02-02**） | MIT | 未検証 | — |
| K09 | [Yarn Spinner for Unity](https://github.com/YarnSpinnerTool/YarnSpinner-Unity) | Unity 分岐会話 | v3.3.2 | a3b61cb（2026-11-24） | MIT（＋Third-Party Notices） | 未検証 | — |
| K10 | [Mirror](https://github.com/MirrorNetworking/Mirror) | Unity マルチプレイ | v96.11.6 | ff17fbd（2026-11-18） | MIT | 未検証 | — |
| K11 | [Crest](https://github.com/wave-harmonic/crest) | Unity 水面（Built-in） | 4.23.0 | ff0602f（2026-11-17） | MIT | 未検証 | — |
| K12 | [URP Toon Lit Shader Example](https://github.com/ColinLeung-NiloCat/UnityURPToonLitShaderExample) | シェーダー学習サンプル | タグなし | fbe276e（2026-07-02） | MIT | 未検証 | — |
| K13 | [Procedural Toolkit](https://github.com/Syomus/ProceduralToolkit) | Unity 手続き生成 | v0.1.5 | 7817fc5（2026-11-23） | MIT | 未検証 | — |
| K14 | [jsfxr](https://github.com/chr15m/jsfxr) | レトロ効果音 | タグなし | b7b6aa2（2026-05-05） | Unlicense | 未検証 | — |
| K15 | [GameCI Unity Builder](https://github.com/game-ci/unity-builder) | GitHub Actions | v6.0.0 | 107e018（2026-11-15） | MIT | 未検証 | — |

※1 Effekseer はタグの形式が不統一（`1.51`、`1.7.3.0`、`1.80.1`、`test` などが混在）。数値上の最大を書いたが、採用時にReleaseページで現行版を確認する。
※2 Unity-MCP はパッケージごとにタグが分かれている。`1.14.3` は `com.ivanmurzak.unity.mcp` の `package.json` の値。同リポジトリの `server.json` はサーバー側を `9.3.2` としている。

## 確認で分かった注意点（引継ぎ資料への追補）

| ID | 内容 | 根拠 |
|---|---|---|
| K01 | ベータ版（v0.1.10-beta）。ライセンスはOSSの寛容ライセンスではなく Unity Companion License（Unity依存プロジェクト向け）。プラグインの中身はスキル1つ（`using-unity`）とその参照資料で、フックやMCP設定は含まれていなかった。参照資料の中に `.sh` などの実行スクリプトがある（XRセットアップ用など）。 | `.claude-plugin/plugin.json`、`LICENSE.md`、ファイル一覧 |
| K01 | リポジトリのREADMEは11行で、インストール手順は書かれていなかった。引継ぎ資料の `/plugin marketplace add` 〜の手順はここでは裏取りできていない。Unity公式ドキュメントで確認する。 | `README.md` |
| K02 | **既定はCloud接続**（`ai-game.dev` の中継、アカウントのサインインあり）。ローカルは Editor側で接続を **Custom** にし、CLIなら `--transport stdio` を付ける。 | `README.md` 37〜44行、87〜91行 |
| K02 | ローカルサーバーの認証は既定で `none`。`127.0.0.1` だけで待ち受けるが、同じPC上のプログラムなら誰でもツールを呼べ、`script-execute` はEditor権限でC#を実行する。READMEが「最もプライベート」とする構成は Custom＋Authorization Token = `token`。 | `README.md` 95行、211〜218行 |
| K02 | 必要なUnityは 2022.3 以上。 | `README.md` 61行、`package.json` |
| K03 | READMEの要件は **Unity 6 以降**・Node.js 18 以降・npm 9 以降（`package.json` の `unity` 欄は 2022.3 で、表記が食い違う）。固定するEditor版で動くかを先に確認する。 | `README.md` 199〜201行、`package.json` |
| K03 | Unity側のWebSocketは既定で `localhost:8090`。「Allow Remote Connections」を有効にすると `0.0.0.0` で待ち受けるので**有効にしない**。`add_package` ツールは既定で無効。通常モードではEditorが `npm install` / `npm run build` を実行する記述がある。 | `README.md` 402行、430〜461行 |
| K08 | 最終コミットが 2025-02-02 で、約22か月更新がない。`package.json` の `unity` 欄は 2018.1、開発用プロジェクトは 2023.2.19f1。現行Editorでのコンパイル確認が先。 | `git log`、`package.json`、`ProjectSettings/ProjectVersion.txt` |
| K10 | リポジトリのルートに `.mcp.json`（GitHub Copilot のリモートMCPを指す）が入っている。Mirrorのクローンを直接Claude Codeのプロジェクトとして開かない。使うのはパッケージ部分だけ。 | `.mcp.json` |
| K11 | このリポジトリは Built-in レンダラー向け。URP / HDRP 版は Unity Asset Store の別製品（有償かどうかと条件は要確認）。 | `README.md` |
| K12・K14 | タグがない。採用するならコミットSHAで固定する。 | タグ一覧 |
| K15 | `node24` で `dist/index.js` を実行するアクション。使う場合はコミットSHAで固定し、Secretsを渡す前に中身を確認する。 | `action.yml` |

## 詳細：Claudeに接続する3件

### K01 Unity Agent Plugin
- **条件**: Claude Code（Windows）。Unity Editor / Unity CLI の要件は公式ドキュメントで確認（未確認）。
- **権限とデータ送信**: スキル（文書と参照スクリプト）をClaude Codeに読み込ませる。プラグイン自体に通信設定は見当たらなかった。スキルが案内するUnity側サービス（課金、広告、LiveOpsなど）の利用はそれぞれ別の契約。
- **検証**: `/plugin marketplace add Unity-Technologies/unity-agent-plugin` → `/plugin install unity@unity-agent-plugin` → `/reload-plugins` → `/plugin` と `/unity:using-unity`。
- **期待値**: プラグイン一覧に `unity` が出て、`/unity:using-unity` がスキルの索引を返す。**これはEditor接続の確認ではない。**
- **実測**: 未実施
- **戻し方**: `/plugin uninstall unity@unity-agent-plugin`、マーケットプレイスの登録を削除。

### K02 IvanMurzak Unity-MCP
- **条件**: Unity 2022.3 以上。専用Installer または OpenUPM `com.ivanmurzak.unity.mcp`。
- **権限とデータ送信**: Editorの読み書きとC#実行。**Cloud（既定）ではツール呼び出しが `ai-game.dev` の中継を通る**。このスタジオでは Custom（ローカル）＋stdio＋Authorization Token を使い、Cloudとアカウント連携は使わない。
- **検証**: 使い捨てプロジェクトで、Editorの接続設定を Custom にする → `/mcp` と `claude mcp list` で接続を確認 → プロジェクト名とシーン名の読み取りが一致 → テスト用Cubeを生成してUndo → ログとスクリーンショット取得 → PlayModeテスト → Editor再起動後に再接続。
- **期待値**: すべてローカルで完結し、`.mcp.json` に `ai-game.dev` のURLが書かれていない。
- **実測**: 未実施
- **戻し方**: `.mcp.json` から該当エントリを削除、`Packages/manifest.json` からパッケージとスコープ付きレジストリを削除、`packages-lock.json` の差分を確認。

### K03 CoderGamester MCP Unity
- **条件**: READMEは Unity 6 以降、Node.js 18 以降、npm 9 以降。
- **権限とデータ送信**: Editorの読み書き。ローカルのWebSocket（既定 `localhost:8090`）とNodeブリッジ。リモート接続は無効のまま使う。
- **検証**: **K02とは別のプロジェクトコピーで**、K02と同じ手順（読み取り → Cube生成とUndo → ログ → PlayMode → 再起動後の再接続）。
- **期待値**: K02と同条件で比較できる記録が残る。同じプロジェクトにK02と二重接続していない。
- **実測**: 未実施
- **戻し方**: `.mcp.json` のエントリ削除、`Packages/manifest.json` から `com.gamelovers.mcp-unity` を削除、`ProjectSettings/McpUnitySettings.json` を削除。

## 詳細：Unityパッケージ（本体プロジェクトの依存候補）

共通: UPMで**タグを固定して**導入する。導入の前後で、コンパイル・実プレイ・Windowsビルド・Editor再起動の結果を比べる。戻し方は `Packages/manifest.json` と `packages-lock.json` を導入前のコミットに戻す。ランタイムの通信は K10 以外想定していないが未確認。実測はすべて未実施。

| ID | 条件・前提 | 検証と期待値 |
|---|---|---|
| K06 LitMotion | リリースのUnity対応版と依存パッケージを確認 | UIかTransformの演出を1つ実装。停止と再開が効き、ProfilerでGC割当を記録 |
| K07 UniTask | 公式のUPM手順 | シーン切替・破棄時のキャンセル、例外の捕捉、メインスレッドへの復帰をテスト |
| K08 Fluid Behavior Tree | 更新が止まっている。現行Editorでコンパイルできるかが先 | 索敵 → 追跡 → 見失う、の小ケース。動かなければ標準C#の状態機械のままにする |
| K09 Yarn Spinner | 会話のあるゲームの場合だけ | 会話1本の分岐、中断と再開、ローカライズ |
| K10 Mirror | 初作にマルチプレイ要件がなければ保留。試すなら別ラボ | localhostで2クライアント。同期、切断、サーバー側の検証 |
| K11 Crest | Built-in用。URPの本体プロジェクトには入れず、別のBuilt-inラボで | 水面の描画とビルド。URP版が必要なら費用と条件をディレクターに提示 |
| K12 URP Toon Lit | 古いURP向けの学習サンプル。そのまま移植しない | 専用の小シーンで影・ライト・ビルドを確認し、必要な箇所だけ採用 |
| K13 Procedural Toolkit | 現行Editorでサンプルがコンパイルできるかが先 | 同じシードで形状と配置が再現する |

## 詳細：制作ソフト・素材工程（ゲームには成果物だけを渡す）

共通: Windows版を配布元から入れる独立アプリ。ゲームのプロジェクトには出力ファイル（PNG、FBX、GLB、WAVなど）だけを入れる。元データは別に保管する。戻し方はアンインストールと、取り込んだ成果物の削除。実測はすべて未実施。

| ID | 条件・前提 | 検証と期待値 |
|---|---|---|
| K04 Blockbench | — | 低ポリ小物を1点作り、Unityに取り込む。スケール・軸・UVが合う |
| K05 Krita | — | 透過PNGを出し、ゲーム内でエッジと色を確認 |
| K14 jsfxr | ブラウザで動く。Unityに入れるのはWAVだけ | 音を1つ作ってWAVで出力。音量とループ端を確認 |
| H03 Material Maker | — | ノードで材質を作りPBRマップを出力。URPで色空間・法線の向き・Roughness→Smoothness変換を確認 |
| H04 Effekseer | Unity用ランタイムのURP対応とビルドを先に確認 | エディタでエフェクトを1つ作り、ランタイムで再生 |
| H09 meshoptimizer / gltfpack | エクスポートの**複製**に対して実行 | サイズ・見た目・骨格とマテリアル・glTF拡張の対応を比較。元のFBX/GLBは残す |

## 詳細：別エンジン・C++ラボ（Unity本体には入れない）

共通: 本体プロジェクトとは別フォルダのラボで試す。採否はラボの結果だけで決め、ゲーム本体の作業と切り離す。既存のUEFNプロジェクトには持ち込まない。戻し方はラボのフォルダごと削除。ビルド時の依存取得（サブモジュール、CMakeの取得処理）は未確認。実測はすべて未実施。

| ID | ラボ | 検証と期待値 |
|---|---|---|
| H01 Jolt Physics | Windows C++ / CMake | 公式サンプルを起動。剛体を落として衝突と決定性の要件を測る。Unity標準物理は置き換えない |
| H06 Recast Navigation | Windows C++ / CMake | Recastで焼き、Detourで経路、必要ならCrowdで回避。Unityの初作は標準のAI Navigationと比較 |
| H07 ozz-animation | Windows C++ / CMake | 公式サンプルで読み込み・ブレンド・描画 |
| H08 The Forge | Windows C++（カスタムエンジン向け） | Windows対象のサンプルで描画試験 |
| H10 FastNoise2 | Windows C++ / CMake | 同じシードで生成結果が再現する。Unityには高さマップなどの成果物だけ渡す |
| H02 Terrain3D | 別のGodot 4プロジェクト（リリースの対応Godot版に合わせる） | 小さな高さマップを読み込み、地形・植生・LODを確認 |
| H05 Voxel Tools for Godot | 別のGodotラボ（版ごとの公式ビルドを確認） | 穴掘りとチャンク読み込み。Terrain3Dとは別方式として扱う |

## 詳細：CI

| ID | 条件・前提 | 検証と期待値 |
|---|---|---|
| K15 GameCI Unity Builder | 最初はローカルのWindowsビルドで足りる。CIが必要になってから。Unityライセンス・Secrets・権限・ランナー費用の確認とディレクターの承認が前提 | アクションをコミットSHAで固定し、権限を絞ったワークフローでビルドだけ行う。自動公開はしない。戻し方はワークフローファイルの削除とSecretsの削除 |
