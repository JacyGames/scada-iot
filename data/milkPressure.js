const generateData = require('./dataGenerator');


const milkPressure = [
   
    139,  139.5, 139.5, 
    139.5, 140, 140, 140.5, 
    140.5, 140.9, 140.9, 
];


const generateMilkPressure = generateData(milkPressure);


module.exports = generateMilkPressure;