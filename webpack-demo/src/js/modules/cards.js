'use strict';

import {getResource} from "../services/services";

function cards() {
// Используем class для карточек
    // сделать конвертацию валют


    class MenuCard {
        constructor(src, alt, title, discr, price, parentSelector, ...classes) {
            this.src = src; // картинка
            this.alt = alt; // текст, вместо картинки
            this.title = title; // оглавление
            this.discr = discr; // текст
            this.price = price; // цена
            this.classes = classes; //передаём с помощью rest классы (тут всегда будет массив)
            this.parent = document.querySelector(parentSelector); // назначение родителя
            this.priceCurs = 27; // курс
            this.convertCurrent(); // вызов метода конвертации валюты
        }

        convertCurrent() { // метод конвертации валюты
            this.price = +this.price * this.priceCurs;
        }

        render() { // шаблон карточки
            const element = document.createElement('div');

            if (this.classes.length === 0) { // если нет ни одного класса, то по умолчанию будет класс
                this.classes = 'menu__item';
                element.classList.add(this.classes)
            } else {
                this.classes.forEach(className => element.classList.add(className)); //перебор классов и добавление
                //их в массив
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.discr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            this.parent.append(element); //добавляем родителя
        };
    }

    getResource("http://localhost:3000/menu")
        .then(data => {
            //перебираем массив, с объектами при помощи деструктуризации объекта - {}
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
                //конструктор будет создаваться столько раз, сколько объектов придёт с сервера
            })
        });
}



export default cards;