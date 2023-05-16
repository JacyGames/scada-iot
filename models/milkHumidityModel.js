const mongoose = require('mongoose');
const defaultSchema = require('./defaultSchema');

const milkHumiditySchema = defaultSchema;


const MilkHumidity = mongoose.model('MilkHumidity', milkHumiditySchema);

module.exports = MilkHumidity;