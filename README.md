### wbs editor  
使用ライブラリ  
- Node.js  
- electron  

開発用ライブラリ  
- typescript  

---  
#### 開発ログ  
- 2019/12  
関数分割後のファイル読み込みのパス指定に".."は使えない  
ブロック要素は横並びにできないので、inline-blockを使う  
formを使えば簡単に読み込み画面を作れる  
electronでフロントとバックの通信をするのにipcを使う必要あり  
- 2020/1  
divの大きさ指定にはcalc()が便利  
(※ただし+,-にはスペース必須)  
スクロールバーを用いた入力フォームにrangeがある  
図メインのWBSは可読性が悪いため、表形式のWBSを作る  
console = require('electron').remote.require('console');  
→このコードでレンダラープロセスのデバックができる  
BrowserWindowは別ファイルからの構築にreturnが必須  
コマンドプロンプトでの日本語表示にchcp 65001が必須  
macOSにNode.jsを再インストールする必要あり  
macOSにelectronが入らない時には、.electronに手動でパッケージを入れる  


---  
#### インストール方法  
#### node.jsのインストール  
- Windows  
    win_node_installer.bat  
- macOS  
    sh macOS_node_installer.sh  

#### ライブラリのインストール  
npm install  
        