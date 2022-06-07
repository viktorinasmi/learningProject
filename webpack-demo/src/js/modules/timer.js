'use strict';

function timer(id, deadline){
    //Times - работа с счётчиком

    // 1. Функция разницы между датами временем
    // 2. Функция установки таймера на страницу
    // 3. Функция, которая будет обновлять таймер

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) { // проверка на то, будет ли разница отрицательной
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {    // если больше 0, то формируем данные
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor(t / (1000 * 60 * 60) % 24),
                minutes = Math.floor(t / (1000 * 60) % 60),
                seconds = Math.floor(t / (1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num > 0 && num < 10) {
            return 0 + num;
        } else {
            return num;
        }
    }


    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();


        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline); // в данной функции и будут через аргумент настраиваться дата
}

export default timer;