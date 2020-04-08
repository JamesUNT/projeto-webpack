const path = require('path'); //
const babiliPlugin = require('babili-webpack-plugin'); //plugin de minificação do bundle
const extractTextPlugin = require('extract-text-webpack-plugin'); //Plugin responsável por separal o css e js no bundle
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //plugin responsável por minificar o css
const webpack = require('webpack');
// const MinifyPlugin = require("babel-minify-webpack-plugin"); //outro plugin de minificação do bundle que eu estava testando

let plugins = []; //arrays de plugins

plugins.push(new extractTextPlugin('styles.css'));

plugins.push(new webpack.ProvidePlugin({
  '$': 'jquery/dist/jquery.js',
  'jQuery': 'jquery/dist/jquery.js'
}));

//caso o ambiente node seja de produção, adicionar plugin ao array "plugins"
if (process.env.NODE_ENV == 'production') {
  plugins.push(new babiliPlugin());

  plugins.push(new optimizeCSSAssetsPlugin({
    cssProcessor: require('cssnano'),
    cssProcessorOptions: {
      discardComments: { removeAll: true }
    },
    canPrint: true
  }));
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
      },
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({ // configuração do plugin que separará o css do js
          fallback: 'style-loader', //"caso o css-loader não carregar, carregue esse loader em seu lugar"
          use: 'css-loader'
        })
        // loader: 'style-loader!css-loader'//ponto de esclamação indica que ele aplicará primeiro um loader depois o outro, da direitra pra esquerda
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
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
  Diferentes loaders podem ser requisitados quando se trata de partes específicas de arquivos, como por exemplo, as fontes nõo padrões que veem em
  css compilado como o bootstrap usado acima.

Vantagens de usar o webpack-dev-server:
Em ambiente de desenvolvimento, o webpac-dev-server faz com que os bundles sejam criados em memoria, ou seja, seu acesso fica
muito mais rápido, além de proporcionar um hot reload da página
 */