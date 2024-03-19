'use strict';

const title = document.getElementsByTagName('h1')[0];

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumder = document.querySelectorAll('.other-items.number');
const rollbackRange = document.querySelector('.rollback [type="range"]');
const rollbackRangeValue = document.querySelector('.rollback .range-value');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const totalFullCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
    title: '', 
    screens: [], 
    screenPrice: 0, 
    adaptive: true, 
    roolback: 10,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},

    init: function() {       
        appData.addTitle();
        startBtn.addEventListener('click', appData.start);
        buttonPlus.addEventListener('click', appData.addScreenBlock);    
    },

    addTitle: function(){
        document.title = title.textContent;
    },

    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();      

        /* appData.getServicePercentPrices();
        appData.logger(); */ 

        console.log(appData);
        appData.showResult();
    },

    showResult: function() {
        total.value = appData.screenPrice;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        totalFullCount.value = appData.fullPrice;
    },
       
    addScreens: function(){
        screens = document.querySelectorAll('.screen');
        screens.forEach(function(screen, index){
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            appData.screens.push({
                id: index, 
                name:selectName, 
                price: +select.value * +input.value});  
        });
    },

    addScreenBlock: function(){      
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length-1].after(cloneScreen);
    },

    addServices: function() {
        otherItemsPercent.forEach(function(item){
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if(check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }            
        });
        otherItemsNumder.forEach(function(item){
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if(check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }            
        });       
    },

    addPrices: function() {
        appData.screenPrice = appData.screens.reduce(function(sum, item){
            return sum += +item.price;
        }, 0);                
        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }
        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice*(appData.servicesPercent[key]/100);
        }
        appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

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
    }    
};

appData.init();


