'use strict';

function calc() {
    //calculator

    const result = document.querySelector('.calculating__result span'); //переменная с результатом расчёта


    let sex, ratio, height, weight, age; //просто объявляем переменные

    //условие для пола при работе с local хранилищем
    if (localStorage.getItem('sex')) { //при условии, что в local уже что-то есть
        sex = localStorage.getItem('sex')
    } else { // значение по defolt
        sex = 'female';
        localStorage.setItem('sex', "female"); // запись в local
    }

    //условие для активности, при работе с local
    if (localStorage.getItem('ratio')) { //при условии, что в local уже что-то есть
        let ratio = localStorage.getItem('ratio')
    } else { //значение по дефолту
        ratio = '1.375';
        localStorage.setItem('ratio', 1.375); // запись в local
    }

    //Функция подсчёта калорий
    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) { //проверка. Если один из параметров не заполнен, то возвращает
            result.textContent = '__';
            return; // досрочно прерывает функцию, что бы не пошли расчёты дальше
        }

        // условие пола
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    // функция назначения класса элемента из значения local - проверка по data ratio и id

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass); // удаляем активный класс

            if (elem.getAttribute('id') === localStorage.getItem('sex')) { //условия для пола
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) { //для активности
                elem.classList.add(activeClass)
            }
        });
    }

    //обрабатывает пол
    initLocalSettings('#gender div', "calculating__choose-item_active");
    //обрабатывает активность
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    // функция для обработки кликов статической информации - активность, пол
    function getStaticInformation(selector, activeClass) { // родитель, активный класс
        const elements = document.querySelectorAll(selector);

        // обработку клика на элемент делаем перебором, а не через родителя
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute("data-ratio")) {
                    ratio = +e.target.getAttribute("data-ratio"); // устанавливаем в значение атрибута в проверке
                    localStorage.setItem('ratio', +e.target.getAttribute("data-ratio")); //установка значений в local
                } else {
                    sex = e.target.getAttribute('id'); //работаем с полом и проверяем женщина, или мужчина
                    localStorage.setItem('sex', e.target.getAttribute('id')); //установка значений в local
                }


                //класс активности
                elements.forEach(elem => {
                    elem.classList.remove(activeClass); // каждый элемент внутри избавляется от активного класса
                });

                e.target.classList.add(activeClass); //объекту события на который мы кликнули, назначаем класс события

                calcTotal(); // расчёт данных калькулятора
            });
        })
    }

    //обрабатывает пол
    getStaticInformation('#gender div', "calculating__choose-item_active");
    //обрабатывает активность
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    //Функция для обработки свободных полей -рост, вес, возраст
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector); // получаем селектор

        input.addEventListener('input', () => {
            // проверка на тип данных записанное в поле
            if (input.value.match(/\D/g)) { //если пользователь вводит не число
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch (input.getAttribute('id')) {
                case 'height': //если пользовать что-то записал в значение рост
                    height = +input.value; // в переменную рост записываем, то что ввел пользователь
                    break; // останавливаем цикл
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal(); // расчёт данных калькулятора
        });
    }

    //вызовы функции для статических данных
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}

export default calc;