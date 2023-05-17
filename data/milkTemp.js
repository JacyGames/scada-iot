const generateData = require('./dataGenerator');

const milkTemperature = [
     78.6, 78.6, 78.9, 78.9, 
     79.5, 
    79.8, 80, 80,80.2,
];



const generateMilkTemperature = generateData(milkTemperature);

module.exports = generateMilkTemperature;