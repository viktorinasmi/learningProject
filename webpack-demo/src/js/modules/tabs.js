'use strict';

function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // 1. Скрывать не нужные табы
// 2. Показать нужный таб
// 3. Назначить обработчика событий на меню
// 4. При клике, на активный элемент добавлять класс tabheader__item_active


//Tabs - создание табов
//назначение глобального обработчика событий


    let tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabFamily = document.querySelector(tabsParentSelector);


    function hideTabs() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });

    }

    function showTabs(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabs();
    showTabs();

    tabFamily.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            // при помощи данного метода, удаляем у класса точку
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabs();
                    showTabs(i);
                }
            });
        }
    });
}

export default tabs;