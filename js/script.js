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

const cmsCheckbox = document.getElementById('cms-open');
const cmsVar = document.querySelector('.hidden-cms-variants');


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
        this.addTitle();
        startBtn.addEventListener('click', appData.start);
        buttonPlus.addEventListener('click', appData.addScreenBlock); 
        rollbackRange.addEventListener('input', appData.getRollback);   
        resetBtn.addEventListener('click', appData.reset);
    },

    addTitle: function () {
        document.title = title.textContent;
    },

    start: function () {                
        appData.addScreens();
        if (appData.checkEmptyScreens()) {        
            appData.addServices();        
            appData.addPrices();      
            appData.showResult();   
            appData.blockInput(true);            
            startBtn.style.display = "none";
            resetBtn.style.display = "block";  
            console.log(appData);
        } 
        appData.clearData();   
    },

    reset: function () {   
        rollbackRange.value = 0;
        appData.getRollback();
        appData.blockInput(false);
        appData.clearScreenBlock();  
        appData.clearServicesCheckbox(); 
        appData.clearData();
        appData.addPrices();
        appData.showResult(); 
        startBtn.style.display = "block";
        resetBtn.style.display = "none";
        console.log(appData);
    },

    checkEmptyScreens: function () {       
        let count = 1;
        this.screens.forEach(function(item){
            count *=item.price;            
        });        
        return !!count;        
    },

    clearData: function () {
        this.screens.length = 0;
        this.count = 0;  
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;  
        this.servicesPercent = {};
        this.servicesNumber = {};          
    },

    showResult: function () {        
        total.value = this.screenPrice;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        totalFullCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice; 
        totalCount.value = this.count;       
    },
       
    addScreens: function() {        
        screens = document.querySelectorAll('.screen');
        screens.forEach((screen, index)=>{
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
  
    addScreenBlock: function () {      
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length-1].after(cloneScreen);
    },

    addServices: function () {        
        otherItemsPercent.forEach((item)=>{            
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if(check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }            
        });
        otherItemsNumder.forEach((item)=>{            
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if(check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }            
        });       
    },
  
    addPrices: function (){
        this.screenPrice = this.screens.reduce((sum, item)=>{
            return sum += +item.price;
        }, 0);                
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }
        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice*(this.servicesPercent[key]/100);
        }
        this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
        this.servicePercentPrice =  this.fullPrice - this.fullPrice * (this.roolback/100);  
    },   

    getRollback: function() {        
        appData.roolback = +rollbackRange.value;
        rollbackRangeValue.textContent = rollbackRange.value+'%'; 
        
        appData.servicePercentPrice =  appData.fullPrice - appData.fullPrice * (appData.roolback/100);
        totalCountRollback.value = appData.servicePercentPrice;         
    },   
    
    blockInput: function(bool) {
        screens.forEach((item)=>{
            item.querySelector('select').disabled = bool;
            item.querySelector('input').disabled = bool;            
        });
    },

    clearScreenBlock: function() {
        screens.forEach((item,index)=>{                       
            if (index > 0) item.remove();
            item.querySelector('select').value ='';
            item.querySelector('input').value =0;            
        });  
    },
    
    clearServicesCheckbox: function() {
        otherItemsPercent.forEach((item)=>{
            item.querySelector('.custom-checkbox').checked=false;
        });
        otherItemsNumder.forEach((item)=>{
            item.querySelector('.custom-checkbox').checked=false;
        });
    }






};

appData.init();



