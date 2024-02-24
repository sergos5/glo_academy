let title = 'lesson02';
let screens = 'Простые, Сложные, Интерактивные';
let screenPrice = 5000;
let roolback = 15;
let fullPrice = 200000;
let adaptive = true;
// Вывести в консоль тип данных значений переменных title, fullPrice, adaptive
console.log('Тип данных title - ' + typeof(title));
console.log('Тип данных fullPrice - ' + typeof(fullPrice));
console.log('Тип данных adaptive - ' + typeof(adaptive));
// Вывести в консоль длину строки из переменной screens 
console.log('Длина строки screens - ' + screens.length);
// Вывести в консоль “Стоимость верстки экранов (screenPrice) рублей/ долларов/гривен/юани” и “Стоимость разработки сайта (fullPrice) рублей/ долларов/гривен/юани” 
console.log('Стоимость верстки экранов '+ screenPrice + ' рублей.');
console.log('Стоимость разработки сайта '+ fullPrice + ' рублей.');
// Привести строку screens к нижнему регистру и разбить строку на массив, вывести массив в консоль 
console.log(screens.toLowerCase().split(', '));
// Вывести в консоль Процент отката посреднику за работу (fullPrice * (rollback/100)) 
console.log('Откат посреднику ' + fullPrice * (roolback/100) + ' денег');