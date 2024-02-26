let title = prompt('Как называется Ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let roolback = 0;
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
let fullPrice = screenPrice+servicePrice1+servicePrice2;
let servicePercentPrice  = Math.ceil(fullPrice - fullPrice * (roolback/100));
console.log ('Итоговая стоимость работы ' + servicePercentPrice);

switch (true) {
    case fullPrice >= 30000: 
        console.log ('Даем скидку в 10%');
        break;
    case fullPrice >= 15000: 
        console.log ('Даем скидку в 5%');
        break;
    case fullPrice >= 0: 
        console.log ('Скидка не предусмотрена');
        break;
    case fullPrice < 0: 
        console.log ('Что то пошло не так');
        break;
}


//осталось от урока 2
/* console.log('Тип данных title - ' + typeof(title));
console.log('Тип данных fullPrice - ' + typeof(fullPrice));
console.log('Тип данных adaptive - ' + typeof(adaptive));
console.log('Длина строки screens - ' + screens.length);
console.log('Стоимость верстки экранов '+ screenPrice + ' рублей.');
console.log('Стоимость разработки сайта '+ fullPrice + ' рублей.');
console.log(screens.toLowerCase().split(', '));
console.log('Откат посреднику ' + fullPrice * (roolback/100) + ' денег'); */