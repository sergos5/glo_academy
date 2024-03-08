'use strict';

const appData = {
    title: '', 
    screens: '', 
    screenPrice: 0, 
    adaptive: true, 
    roolback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    service1: '',
    service2: '',
    asking: function(){
        appData.title = prompt('Как называется Ваш проект?', 'Калькулятор верстки');
        while (!appData.title) {
            appData.title = prompt('Введите название проекта', 'Калькулятор верстки');
        }
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Основной, адаптивный');
        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа? (введите числовое значение)', 20000);
        }  while (!appData.isNumber(appData.screenPrice));
        appData.screenPrice = +appData.screenPrice;
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
    },
    getAllServicePrices: function() {
        let sum =0;
        
        for (let i=0; i<2; i++){
            if (i===0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?', 'Отправка форм');
            } else if (i===1) {
                appData.service2 = prompt('Какой еще дополнительный тип услуги нужен?', 'Слайдер');
            }
            let servisPrice = prompt('Сколько это будет стоить?');
            while (!appData.isNumber(servisPrice)) {
                servisPrice = prompt('Сколько это будет стоить? (введите числовое значение)');
            }
            sum += +servisPrice;        
        }
        return sum;
    },
    getRollbackMessage: function(price) {
        if (price >= 30000) {    
                return'Даем скидку в 10%';       
            } else if (price >= 15000) { 
                return'Даем скидку в 5%';
            } else if (price >= 0) { 
                return'Скидка не предусмотрена';
            } else { 
                return'Что то пошло не так';
        }
    },
    getFullPrice: function () {
        return appData.screenPrice + appData.allServicePrices;
    },
    getTitle: function() {
    return appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase();
    },
    getServicePercentPrices: function()  {
    return appData.fullPrice - appData.fullPrice * (appData.roolback/100);
    },
    logger: function () {
        for (let key in appData) {
            console.log(appData[key])
        }

    },
    start: function () {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.title = appData.getTitle();
        appData.logger() 
    }

};

appData.start();


console.log(appData.fullPrice);
console.log(appData.servicePercentPrice);

