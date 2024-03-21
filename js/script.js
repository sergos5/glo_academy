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
    count: 0,
    screenPrice: 0, 
    adaptive: true, 
    roolback: 0,
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
        rollbackRange.addEventListener('change', appData.getRollback);   
    },

    addTitle: function(){
        document.title = title.textContent;
    },

    start: function () {        
        appData.addScreens();
        if (appData.checkEmptyScreens()) {        
        appData.addServices();        
        appData.addPrices();      
        appData.showResult();
        console.log(appData);
      } 
        appData.clearData();  
    },

    checkEmptyScreens:  function(){
        let count = 1;
        appData.screens.forEach(function(item){
            count *=item.price;            
        });        
        return !!count;
    },

    clearData: function() {
        appData.screens.length = 0;
        appData.count = 0;  
        appData.servicePricesPercent = 0;
        appData.servicePricesNumber = 0;  
        appData.servicesPercent = {};
        appData.servicesNumber = {};  
    },

    showResult: function() {
        total.value = appData.screenPrice;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        totalFullCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice; 
        totalCount.value = appData.count;
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
            appData.count += +input.value;     
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
        appData.servicePercentPrice =  appData.fullPrice - appData.fullPrice * (appData.roolback/100);  
    },   

    getRollback: function() {
        appData.roolback = +rollbackRange.value;
        rollbackRangeValue.textContent = rollbackRange.value+'%'; 
        
        appData.servicePercentPrice =  appData.fullPrice - appData.fullPrice * (appData.roolback/100);
        totalCountRollback.value = appData.servicePercentPrice; 
    }    
};

appData.init();


