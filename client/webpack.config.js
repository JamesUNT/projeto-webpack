const path = require('path'); //
const babiliPlugin = require('babili-webpack-plugin'); //plugin de minificação do bundle
// const MinifyPlugin = require("babel-minify-webpack-plugin"); //outro plugin de minificação do bundle que eu estava testando

let plugins = []; //arrays de plugins

//caso o ambiente node seja de produção, adicionar plugin ao array "plugins"
if (process.env.NODE_ENV == 'production') {
  plugins.push(new babiliPlugin());
}

module.exports = {
  entry: './app-src/app.js', //ponto de entrada dos arquivos que usaram os recursos do bundle
  output: {
    filename: 'bundle.js', //arquivo de output com tudo que o app.js irá utilizar
    path: path.resolve(__dirname, 'dist'), //caminho da pasta que será criada e onde o bundle ficará
    publicPath: 'dist' //caminho público para o webpack-dev-server ter o acesso do bundle direto da memória
  },
  module: { //Objeto onde as regras ficarão, podendo comportar "n" regras
    rules: [ //regras para arquivos
      {
        test: /\.js$/, //expressão regular: "para todo o que termine com .js"
        exclude: /node_modules/, //exclua os node_modules desta regra
        use: {
          loader: 'babel-loader' //loader capaz de interpretar formatos de varios arquivos e EC6 (JS moderno)
        }
      }
    ]
  },
  plugins //em EC6, se a variável tiver o mesmo nome do  camplo, então basta colocar somente um
}

/*
Por que um loader é importante ?
O webpack so conhece JS e além disso, não reconhece alguns recursos modernos da linguagem, o que pode acabar gerando conflitos
na hora da compilação. Por esse motivo, utilizamos um loader diferente para compilar não so JS moderno, mas outros tipos de
estenxão como .css, .sass, .html, etc.

Vantagens de usar o webpack-dev-server:
Em ambiente de desenvolvimento, o webpac-dev-server faz com que os bundles sejam criados em memoria, ou seja, seu acesso fica
muito mais rápido, além de proporcionar um hot reload da página
 */