'use strict';

const appData = {
    title: '', 
    screens: [], 
    screenPrice: 0, 
    adaptive: true, 
    roolback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {},
    
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
        },

    asking: function(){
        appData.title = prompt('Как называется Ваш проект?', 'Калькулятор верстки');
        while (!appData.title || isFinite(appData.title)) {
            appData.title = prompt('Введите название проекта', 'Калькулятор верстки');
        }

        for (let i=0; i<2; i++) {
            let name = prompt('Какие типы экранов нужно разработать?', 'Основной, адаптивный');
            while (isFinite(name)) {
                name = prompt('Некорректные данные! Введите типы экранов', 'Основной, адаптивный');
            }
            let price = 0;
            do {
                price = prompt('Сколько будет стоить данная работа? (введите числовое значение)', 20000);
            }  while (!appData.isNumber(price));
            appData.screens.push({id: i, name:name, price: price});
        }
                
        for (let i=0; i<2; i++){
            let name = prompt('Какой дополнительный тип услуги нужен?', 'Отправка форм, метрика');            
            while (isFinite(name)) {
                name = prompt('Некорректные данные! Введите типы услуги', 'Отправка форм, метрика');
            }
            let price = 0;
            do {
                price = prompt('Сколько это будет стоить?');
            } while (!appData.isNumber(price));
            appData.services[i+1+'. '+name] = +price;
        }
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },

    addPrices: function() {
        /* for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        } */
        appData.screenPrice = appData.screens.reduce(function(sum, item){
            return sum += +item.price;
        }, 0);
                
        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
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
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
    },

    getTitle: function() {
    appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase();
    },

    getServicePercentPrices: function()  {
        appData.servicePercentPrice =  appData.fullPrice - appData.fullPrice * (appData.roolback/100);
    },

    logger: function () {
        /* for (let key in appData) {
            console.log(appData[key]);
        } */
        console.log(appData.title);
        console.log(appData.screens);
        console.log(appData.screenPrice);
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.services);
    },

    start: function () {
        appData.asking();
        appData.addPrices();        
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();
        appData.logger(); 
    }
};

appData.start();

