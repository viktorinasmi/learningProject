'use strict';

let path = require('path'); // техническая переменная

module.exports = {
  mode: 'development', // режим в котором работаем
  entry: './src/js/script.js', //файл входа
  output: { //файл выхода
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  watch: true,

  devtool: "source-map",

  module: {} // модули и плагины
};
