'use strict';

function closeModal(modalSelector) { // функция, для закрытия модального окна
    const modal = document.querySelector(modalSelector); // само модальное окно
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // восстанавливает скрол на странице
}

function openModal(modalSelector, modalTimerId) { // функция по открытию модального окна
    const modal = document.querySelector(modalSelector); // само модальное окно
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // остановить скрол на странице

    console.log(modalTimerId)
    if (modalTimerId) { //если есть переменная, то только в таком случае очистка таймера
        clearInterval(modalTimerId); //не открывается само окно, если пользователь сам вызвал
    }
}

function  modal(triggerSelector, modalSelector, modalTimerId){
    //Modal.Создание модального окна и его вызов
    //1) Функция открытия модального окна
    // 2) закрытие модального окна
    //3) подвязать на несколь тригеров обработчики событий
    //4) Зафиксировать страницу, чтобы нельля было скролить пока открыто модальное окно
    //5) Сделать, чтобы модальное окно закрывалось при клике на серую подложку и кнопку esc

    const modalTrigger = document.querySelectorAll(triggerSelector), // по дата атрибуту вызов модального окна
        modal = document.querySelector(modalSelector); // само модальное окно

    modalTrigger.forEach(btn => { // функция перебора, для вызова модального окна
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId))
    });


    modal.addEventListener('click', (e) => { // закрытие при нажатии на серую плашку
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });


    document.addEventListener('keydown', (e) => { // закрытие при нажатии escape
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector)
        }
    });

    //Модификация модального окна - сделать, чтобы оно вызывалось, через определённый промежуток времени
    // сам таймер мы создаём в главном файле script.js

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}
export default modal;

export {closeModal};
export {openModal};