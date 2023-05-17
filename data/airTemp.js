const generateData = require('./dataGenerator');

const airTemperature = [
     178, 178.3, 178.3, 
     178.5, 178.5, 178.9,  178.9, 178.9,  179.3, 179.3,  179.7, 179.7, 180, 180,   180.5, 180.5, 
    181,
];

const generateAirTemperature = generateData(airTemperature);

module.exports = generateAirTemperature;