const generateData = require('./dataGenerator');

const milkHumidity = [
    3.46, 3.47,
    3.48,
    3.49,3.5,3.5,3.5,
    6,6
];


const generateMilkHumidiy = generateData(milkHumidity);

module.exports = generateMilkHumidiy;