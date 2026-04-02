# X投稿（verse-061 マーケティング素材）

【AIがVerseでやりがちなミス】

❌ AIの出力：
「ListMcpResources が空だから MCP が死んでいる」と判断して設定を消す・何度も入れ直す

✅ 正解：
tool 提供型サーバーなら resource は0件でも正常。`list_verse_categories` が返れば接続OK。ログの stdio connected も併せて見る

💡 なぜ間違うか：
RESTやOpenAPIの「ヘルスエンドポイント」前提で、MCPの resource 一覧を唯一の成功信号にしてしまう

#UEFN #Verse #FortniteCreative
