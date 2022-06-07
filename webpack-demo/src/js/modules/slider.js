'use strict';

function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) { //делаем с помощью деструктуризации
    // Slider Слайдер

    let sliderIndex = 1; // индекс для перемещения слайдера
    const slides = document.querySelectorAll(slide), // получаем блок со слайдером
        slider = document.querySelector(container), //получение слайдера
        prev = document.querySelector(prevArrow), // стрелочка назад
        next = document.querySelector(nextArrow), //стрелочка вперёд
        total = document.querySelector(totalCounter), // отображение 2-го числа
        current = document.querySelector(currentCounter), //отображение 1-го числа
        slidesWrapper = document.querySelector(wrapper), //главная обёртка
        slidesField = document.querySelector(field), //обёртка, которую создали для всех слайдов
        width = window.getComputedStyle(slidesWrapper).width; //получаем ширину обёртки объекта


    if (slides.length < 10) { //отображение второго числа при перелистывании
        total.textContent = `0${slides.length}`;
        current.textContent = `0${sliderIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = sliderIndex;
    }


    let offset = 0; //отступ, для переключения слайдов (картинок)

    slidesField.style.width = 100 * slides.length + '%'; //количество слайдов умножаем на 100%
    slidesField.style.display = 'flex'; // делаем слайды в ряд
    slidesField.style.transition = '0.5s all'; //плавное переключение

    slidesWrapper.style.overflow = 'hidden'; //скрываем все элементы, которые не попадают в область видимости


    slides.forEach(slide => {
        slide.style.width = width; // устанавливаем всем слайдам одинаковую ширину
    });

    slider.style.position = 'relative'; //все элементы, которые спозиционированы внутри слайдера,
    // будут нормально отображаться

    const indicators = document.createElement('ol'), // создание элемента
        dots = []; // создаём пустой массив для возможности, при перемещении точек выделять конкретный элемент

    indicators.classList.add('carousel-indicators'); // добавление класса для отображения
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; //создание стилей для класса навигации

    slider.append(indicators); // помещение навигации на страницу

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li'); //создаём точки
        // создание атрибута - конкретной точке, конкретное число
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `; // установка стилей точке

        if (i == 0) { // когда мы находимся на слайде 1
            dot.style.opacity = 1; //то, точка будет активна
        }
        indicators.append(dot); // добавляем точку в индикатор
        dots.push(dot); // помещаем точки в массив
    }

    //точки для слайдера
    function activePoints() {
        dots.forEach(dot => dot.style.opacity = '.5'); //в обычном состоянии непрозрачность 0.5
        dots[sliderIndex - 1].style.opacity = 1; // при клике вперед точка непрозрачная на 100%
    }

    // смещение слайда по оси Х
    function biasX() {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    //работа с добавлением 0-ля для отображения
    function zeroNumbersSlider() {
        if (slides.length < 10) { // если меньше 10-ти добавляем 0
            current.textContent = `0${sliderIndex}`;
        } else {
            current.textContent = sliderIndex;
        }
    }

    //работа с функцией - если элементы не числа, то заменяем на пустой символ
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    // для правой части - передвижение вперёд
    next.addEventListener('click', () => {

        if (offset == deleteNotDigits(width) * (slides.length - 1)) { // если отступ равен ширине полного блока
            offset = 0; //вернуться в начало
        } else {
            offset += deleteNotDigits(width); // добавляется ширина ещё одного слайда и он смещается
        }

        // если находимся на последнем слайде, то при следующем клике перейти на первый
        if (sliderIndex == slides.length) {
            sliderIndex = 1;
        } else {
            sliderIndex++;
        }

        zeroNumbersSlider(); //работа с добавлением 0-ля для отображения
        biasX(); //смещение слайда по оси Х
        activePoints(); //подсвечивание активной точки
    });


    // для левой части, передвижение назад
    prev.addEventListener('click', () => {
        if (offset == 0) { // если отступ равен нулю
            //вернуться в последний слайд
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width); // отнимаем ширину слайда и возвращаемся к последнему
        }

        // если находимся на первом слайде, при следующем клике перейти на последний
        if (sliderIndex == 1) {
            sliderIndex = slides.length;
        } else {
            sliderIndex--;
        }

        biasX(); //смещение по оси Х
        zeroNumbersSlider(); //добавление 0
        activePoints(); // изменение активности при клике
    });


    //Функционал переключения слайдов по клику на точки
    dots.forEach(dot => { //перебираем массив с точками
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to'); //обращаемся к атрибуту (объект события)

            sliderIndex = slideTo; // при клике на атрибут в индекс пойдёт соответсвующее значение
            //отступ
            offset = deleteNotDigits(width) * (slideTo - 1);


            biasX(); //смещение по оси Х
            zeroNumbersSlider(); //добавление 0
            activePoints(); // изменение активности при клике
        })
    })
}

export default slider;