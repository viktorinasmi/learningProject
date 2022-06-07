'use strict'

function myModule(){
    this.hello = function () {
        console.log('hello');
    }
    this.goodbye =function (){
        console.log('bye')
    }
}

//При помощи синтаксиса command js

module.exports = myModule; //экспортируем
// в файле куда мы переносим, мы прописываем импорт