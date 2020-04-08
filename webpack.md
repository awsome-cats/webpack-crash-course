
# webpack

## webpackとは各種ファイルを指定のファイルの中に取り込んで関連の機能を一つのファイルに束ねるという機能(モジュールバンドラー)

- はじめ
- 入門
- ローダー
- プラグイン
- 落ち穂拾い

## はじめ

## webpackの全体像を把握1

- webpackとは何かを知るために単純なモジュールの取り込みから一つのファイルに束ねるとこまでをハンズオンで知る

### 学習をpushするためにgithubの設定とクローンを行う

- githubでリポジトリ作成
- [ssh公開鍵の作成の参考](https://qiita.com/shizuma/items/2b2f873a0034839e47ce)
- git cloneで取り込む

### package.jsonの作成やwebpackのinstall

- npm init -y
- npm info webpack
- npm install --save-dev webpack@4.29.0
- npm install --save-dev webpack-cli@3.2.1 --コマンドライン
- less package.json

### srcフォルダとindex.jsの作成

- mkdir src
- touch src/index.js

### index.htmlの作成

- vim index.html

### 便利なモジュールlive-serverでファイルの変更をリアルタイム確認

- npm info live-server
- npm install --save-dev live-server@1.2.1
- ./node_modules/.bin/live-server
- npx live-server

### index.jsにJavaScript記述し、コードの確認をする

- ./src/index.jsの編集

### lodashをCDNでhtmlに配置する

- git add .
- git st
- git diff --cached
- git commit -m '----'
- git push -u origin HEAD
- git checkout -
- git merge --no -ff -
- git push origin HEAD

## webpackの全体像を把握2

### blanchをきる

- git checkout -b getting-started-after-webpack

### distフォルダの作成

- mkdir dist
- distはbundleした成果物が集まる場所としてdefaultに設定されている

### index.htmlをdistに移動させる

- git mv index.html dist/
- git status

### lodashをnpmでinstall

- npm info lodash
- npm install --save lodash`4.17.11
- vim package.jsonで確認

### srcのindex.jsにimportする

- import _ from 'lodash';

### index.htmlからlodashのスクリプトタグを削除

### webpackがbundleするときに必要なファイルはmain.js

- index.htmlにscriptタグでmain.jsを指定する
- index.jsのscirptは消してしまう

### 差分の確認

- git diff dist/index.html

## npx webpackでbundleする

- lodashが使われているindex.jsのJavaScriptやindex.htmlの記述が一つのファイルで合わさる

## webpack.config.jsを作成し設定する

- webpackの設定ファイル

[公式](https://webpack.js.org/configuration/)

- entryはbundleする対象

```js
//outputするためにnpm pathが必要
//絶対パスの指定
const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');
//定型文
module.exports = {
    entry: './src/index.js',
    output: {
    filename: 'main.js',
    path: outputPath
    }
}

```

### npm webpackの実行

- 設定したパスなどターミナルに出力される

### webpack.config.jsを明示的にしたい時のコマンド

- npx --config webpack.config.jsとなる
- productionかdevelopmentか環境を指定するようwarningがでる
- npx webpack --mode development

## 6.webpack-dev-serverを導入して開発環境を整備しよう

- webpack 専用の本命のツールを導入

### 作業前にブランチをきる

- git checkout -b webpack-dev-server

## 導入

- npm info webpack-dev-server
- npm install --save-dev webpack-dev-server@3.1.14
- npx webpack dev-server

### document rootとしてフォルダなどが表示されているから修正する

- npx webpack-dev-server -h (help表示)
- npx webpack-dev-server --open

### default brawserをindex.htmlに変更したい

- webpack.config.jsの修正

```js

const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');
module.exports = {
    entry: './src/index.js',
    output: {
    filename: 'main.js',
    path: outputPath
    },
    //加える部分
    devServer: {
     contentBase: outputPath
}

}
```

- index.htmlがdocument rootになる
- リアルタイムで変更点がhtmlに描画される

### packge.jsonでコマンドの修正(エイリアスの設定)

```js
"scripts": {
   "start": "webpack-dev-server --open --mode development"
  },

```

- nom run serveが使えるようになる
- --openはoption
- mode developmentは環境設定で設定しておくとwarningを避けられる

## 7.開発環境と本番環境の違いについて

- npx webpack --mode production

- bildをproduction環境で行うとminifiされる

## 8. モジュールについて

- moduleの体験
- src/utilities.jsの作成
- utilities.jsに関数を作成
- utilities.jsをexportする

```js
export function @@(){

}
//変数もOK
export const name = kenny;
```

- importする
- src/index.js

```js
//import
import _ from 'lodash';
import { NiJou} from './utilities'


//utilities.jsの関数を確かめる
console.log(NiJou(7))

function component(){
const element = document.createElement('div');
const array = ['Hello','webpack', '!!']
element.innerHTML= _.join(array, ' ')
return element;
}
document.body.appendChild(component());
```

- 他のimport方法]
- アスタリスクを使う

```js
//アスタリスク
import * as utilities from './utilities'

//他のnameと被らないように指定してimportする
import { NAME as NAME_OF_KENNY} from './utilities'
```

- exportの別の方法
- vue.jsで使われてない？

```js
export default class Lion {
    static say(){
        return 'Roar'
    }
}
```

- import方法

```js
//直接classを指定している
import Lion from  './utilities'

//実はLionである必要はない
```

## 9.css-loaderとstyle-loaderでスタイ…

### css loader install

- git check -b css-loader-and-style-loader
- npm info css-loader
- npm install --save-dev css-loader@2.1.0
- git add .

## webpack.config.jsの修正

- css-loaderをmoduleとして読み込む

```js

const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');
module.exports = {
    entry: './src/index.js',
    output: {
    filename: 'main.js',
    path: outputPath
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                 use: ['css-loader']
            }
    ]

},
    devServer: {
     contentBase: outputPath
        }
```

- 確認
- npm install --save-dev style-loader@0.23.1
- 追加

```js
//webpack.config.js
module: {
    //loaderの順番が逆になっている
    //errorになるよ
   rules: [{ test:/\.css$/, use: ['css-loader', 'style-loader']}]
   //正しくはこちら
   rules: [{ test:/\.css$/, use: ['style-loader', 'css-loader']}]


},
```

- index.jsに

```js
//cssのため
document.body.classList.add('haikei')
```

- styleが適用されることになるが内訳としては,style-loaderはstyleタグを作成している

## 10. url-loaderで画像を取り込もう、file-loaderで画像をファイルとして…

## 11.sass-loaderでSassのコードを取り…

## 12. babel-loaderやhtml-webpack-pluginを利用しReact開発環境を構築しよう

## 13.mini-css-extract-pluginでstyleをcssファイルに分離しよう

## 14.uglifyjs-webpack-pluginでconsole.log関数の自動削除しよう

- javascriptの圧縮方法
- codeだけでなくカスタマズする
- console.logの消し忘れを消す

[uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin)

### production modeで動作するよ

```js
"scripts": {
    //作成
    "launch": "webpack-dev-server --open --mode production",
    "start": "webpack-dev-server --open --mode development"
  },

```

### This plugin uses uglify-js to minify your JavaScript

- uglify-jsのminifyをラッパーしているだけ
- 圧縮するのはuglifyJs3になるがconsoleの削除をするメソッドもuglifyJs3が持っている

[uglifyjs3](https://github.com/mishoo/UglifyJS2)

## 15.optimize-css-assets-webpack-pluginでスタイルシートを圧縮しよう

## section5 落ち葉拾い編

## 16.ソースマップを生成しよう

## 17.eslint-loaderでjavascriptの静的解析をリアルタイムに実行しよう
