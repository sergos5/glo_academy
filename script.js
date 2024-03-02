'use strict';

let title = prompt('Как называется Ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
let roolback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrice;


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

const getAllServicePrices = function() {
    allServicePrices=servicePrice1+servicePrice2;
};

function getFullPrice() {
    fullPrice = screenPrice+allServicePrices;
};

let getTitle = function(str) {
    let a = str.trim();
    title = a[0].toUpperCase() + a.slice(1).toLowerCase();
};

let getServicePercentPrices = function()  {
    return servicePercentPrice = Math.ceil(fullPrice - fullPrice * (roolback/100));
};

getTitle(title);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

getAllServicePrices();
getFullPrice();

console.log("Типы экранов для разработки - " + screens);
console.log(getRollbackMessage(fullPrice));

console.log ('Cтоимость за вычетом процента отката посреднику - ', getServicePercentPrices());

