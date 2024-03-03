'use strict';

let title; 
let screens; 
let screenPrice; 
let adaptive; 
let roolback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function(){
    title = prompt('Как называется Ваш проект?', 'Калькулятор верстки');
    while (!title) {
        title = prompt('Введите название проекта', 'Калькулятор верстки');
    }
    screens = prompt('Какие типы экранов нужно разработать?', 'Основной, адаптивный');
    do {
        screenPrice = prompt('Сколько будет стоить данная работа? (введите числовое значение)', 15000);
    }  while (!isNumber(screenPrice));
    screenPrice = +screenPrice;
    adaptive = confirm('Нужен ли адаптив на сайте?');
};

const getAllServicePrices = function() {
    let sum =0;
    for (let i=0; i<2; i++){
        if (i===0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?', 'Отправка форм');
        } else if (i===1) {
            service2 = prompt('Какой еще дополнительный тип услуги нужен?', 'Слайдер');
        }
        let servisPrice = prompt('Сколько это будет стоить?');
        while (!isNumber(servisPrice)) {
            servisPrice = prompt('Сколько это будет стоить? (введите числовое значение)');
        }
        sum += +servisPrice;        
    }
    return sum;
};

const showTypeOf = function (variable) {
    console.log(variable, typeof(variable));
};

const getRollbackMessage = function(price) {
    if (price >= 30000) {    
            return'Даем скидку в 10%';       
        } else if (price >= 15000) { 
            return'Даем скидку в 5%';
        } else if (price >= 0) { 
            return'Скидка не предусмотрена';
        } else { 
            return'Что то пошло не так';
        }
    };

function getFullPrice() {
    return screenPrice+allServicePrices;
};

let getTitle = function() {
    return title = title.trim()[0].toUpperCase() + title.trim().slice(1).toLowerCase();
};

let getServicePercentPrices = function()  {
    return fullPrice - fullPrice * (roolback/100);
};


asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);


console.log("Типы экранов для разработки - " + screens);
console.log("allServicePrices - " + allServicePrices);
console.log("fullPrice - " + fullPrice);
console.log("servicePercentPrice - " + servicePercentPrice);

console.log(getRollbackMessage(fullPrice));
console.log ('Cтоимость за вычетом процента отката посреднику - ', servicePercentPrice);

