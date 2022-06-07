'use strict';

const postData = async (url, data) => { //функция, которая отвечает за постинг данных на сервер
    let res = await fetch(url, {
        method: 'POST', //каким образом обрабатываем запрос
        headers: {
            'Content-type': 'application/json' //какой тип данных отправляем на сервер
        },
        body: data // получаем ответ от сервера, например, что запостили успешно
    });

    return await res.json(); // полученные данные переводим в jason формат
};

async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
}


export {postData}; //обработка данных на форме
export {getResource}; // обработка запросов на карточках



