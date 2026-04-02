# X投稿（verse-060 マーケティング素材）

【AIがVerseでやりがちなミス】

❌ AIの出力：
`ShelfIncomeTable : [int]int = map{ 0 => 1, 1 => 2, ... }` をコードに直書きし、UEFN上で数値だけ変えたいときも毎回ビルドが必要

✅ 正解：
`@editable Shelf0Income` などを置き、`OnBegin` で `set ShelfIncomeTable = map{ 0 => Shelf0Income, ... }` として一度構築。ロジックはテーブル参照のみ

💡 なぜ間違うか：
TypeScriptのconst設定やExcelの固定表の感覚で「mapリテラル＝設定の正」とし、Verseの `@editable` がランナー/エディタ連携のバランス調整口になる点を見落とす

#UEFN #Verse #FortniteCreative
