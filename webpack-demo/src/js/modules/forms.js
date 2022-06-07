'use strict';

import{closeModal, openModal} from "./modal";
import{postData} from "../services/services";

function forms(formSelector, modalTimerId) {
    //Forms - реализация при помощи fetch и JSON

    const forms = document.querySelectorAll(formSelector); //получаем все формы в вёрстке при помощи тега

    const message = { //сообщения, которые будут использоваться
        loading: `img/form/spinner.svg`, // ставим картинку вместо текста, пока грузится форма
        success: 'Спасибо! Мы скоро с вами свяжемся!',
        failure: 'Что-то пошло не так..'
    };


    forms.forEach(item => { //привязка события постинга на форму
        bindPostData(item);
    });


    function bindPostData(form) { //функция, которая отвечает за привязку постинга данных на сервер
        form.addEventListener('submit', (e) => { //обработ.события. Срабатывает каждый раз, при попытке отправить форму
            e.preventDefault(); //отмена стандартных настроек браузера


            //создаём блок с текущим статусом сообщения
            let statusMessages = document.createElement('img'); //создаём блок изображения в вёрстке
            statusMessages.src = message.loading; //подставляем атрибут src в вёрстку
            statusMessages.style.cssText = `
                display: block;
                margin: 0 auto;
            `; //добавление стилей для изображения, но лучше делать через css


            form.insertAdjacentElement('afterend', statusMessages); // размещаем изображение загрузки
            //после формы, чтобы не ехала вёрстка

            //работа с сервером

            const formData = new FormData(form); //формируем ключ-значение при помощи postData
            //в html, а именно в input должен быть в атрибут name

            //работа с JSON

            //мы для formData -делаем матрицу массивов, а потом преобразуем это матрицу в обычный объект
            // а после этого мы превращаем его в json
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json) //вызов обработки данных сервера
                .then(data => {
                    console.log(data); //data возвращается из promise, то что нам вернул сервер
                    showThanksModal(message.success); //вызываем модальное окно с текстом, что всё успешно
                    //вывод сообщения - успешная загрузка
                    statusMessages.remove(); //убираем спиннер
                }).catch(() => { // в случае если произошла ошибка
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset(); //очистка формы
            });
        });
    }

    // Красивое оповещение пользователя (К.О) -модернизация
    function showThanksModal(message) { // функция показа благодарности, после отправки данных
        //получаем элемент, который будем заменять
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide'); //скрываем данный элемент, включая класс hide
        openModal('.modal', modalTimerId ); //открытие модального окна /если будет ошибка, то код дальше идти не будет

        //Создание структуры - нового контента
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        //формирование вёрстки блока
        thanksModal.innerHTML = `
            <div class = "modal__content">
                <div class="modal__close" data-close>×</div>
                <div class = "modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal); //помещаем вёрстку на страницу
        setTimeout(() => {
            thanksModal.remove(); // удаляем блок через время, чтобы не добавлялись блоки
            prevModalDialog.classList.add('show'); //добавляем показ
            prevModalDialog.classList.remove('hide'); // удаляет отсутсвие показа
            closeModal('.modal'); //закрываем модальное окно, чтобы не мешать пользователю
        }, 4000)
    }

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json()) //берём ответ от сервера, и превращаем в js объект
    //     .then(res => console.log(res)) //результат выводим в консоль
}

export default forms;