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

const cmsOpenCheckbox = document.getElementById('cms-open');
const cmsSelectSection = document.querySelector('.hidden-cms-variants');

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
    cmsPercent: {},

    init: function() {             
        this.addTitle();  
        cmsOpenCheckbox.addEventListener('change', this.addCMS.bind(this));
        startBtn.addEventListener('click', this.start.bind(this));
        buttonPlus.addEventListener('click', this.addScreenBlock); 
        rollbackRange.addEventListener('input', this.getRollback.bind(this));   
        resetBtn.addEventListener('click', this.reset.bind(this));
    },

    addTitle: function () {
        document.title = title.textContent;
    },

    addCMS: function() {
        const selectCMS = cmsSelectSection.querySelector('select');
        const cmsOtherInput = cmsSelectSection.querySelector('.main-controls__input');
        const input = cmsOtherInput.querySelector('input');
        if(cmsOpenCheckbox.checked) {            
            cmsSelectSection.style.display = 'flex';   
            selectCMS.addEventListener('change', ()=> {                
                cmsOtherInput.style.display = 'none';
                input.value ='';
                this.cmsPercent.percent = 0;
                if (selectCMS.selectedIndex===2) {
                    cmsOtherInput.style.display = 'flex'; 
                    input.addEventListener('change', ()=> {
                        this.cmsPercent.percent=input.value;  
                    });                                        
                } 
                if (selectCMS.selectedIndex===1) {                                      
                    this.cmsPercent.percent = selectCMS[selectCMS.selectedIndex].value;                             
                }
                if (selectCMS.selectedIndex===0) {                                      
                    this.cmsPercent.percent = 0;                             
                }
                this.cmsPercent.name = selectCMS[selectCMS.selectedIndex].textContent; 
            });   
        } else {            
            cmsSelectSection.style.display = 'none';
            cmsOtherInput.style.display = 'none';
            selectCMS.selectedIndex = 0;
            this.cmsPercent = {};
        }       
    },  
       
    start: function () {  
        this.addScreens();
        if (this.checkEmptyScreens()) {        
            this.addServices();        
            this.addPrices();      
            this.showResult();   
            this.blockInput(true);            
            startBtn.style.display = "none";
            resetBtn.style.display = "block";            
        } 
        this.clearData();  
    },

    reset: function () {   
        rollbackRange.value = 0;
        cmsOpenCheckbox.checked = false;
        this.getRollback();
        this.clearScreenBlock(); 
        this.blockInput(false);         
        this.clearServicesCheckbox(); 
        this.clearData();
        this.addPrices();
        this.showResult(); 
        startBtn.style.display = "block";
        resetBtn.style.display = "none";  
        this.addCMS();   
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
        this.cmsPercent = {};        
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
            this.screens.push({
                id: index, 
                name:selectName, 
                price: +select.value * +input.value});
            this.count += +input.value;            
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

        if (!isNaN(parseFloat(this.cmsPercent.percent)) && isFinite(this.cmsPercent.percent)) {
            this.fullPrice = this.fullPrice + this.fullPrice * +this.cmsPercent.percent/100;
        }

        this.servicePercentPrice =  this.fullPrice - this.fullPrice * (this.roolback/100);  
    },   

    getRollback: function() {                
        this.roolback = +rollbackRange.value;
        rollbackRangeValue.textContent = rollbackRange.value+'%'; 
        
        this.servicePercentPrice =  this.fullPrice - this.fullPrice * (this.roolback/100);
        totalCountRollback.value = this.servicePercentPrice;   
    },   
    
    blockInput: function(bool) {
        screens.forEach((item)=>{
            item.querySelector('select').disabled = bool;
            item.querySelector('input').disabled = bool;            
        });
        buttonPlus.disabled = bool;
    },

    clearScreenBlock: function() {        
        screens.forEach((item,index)=>{                       
            if (index > 0) item.remove();
            item.querySelector('select').value = '';
            item.querySelector('input').value = '';                                   
        });
        screens = document.querySelectorAll('.screen');        
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
