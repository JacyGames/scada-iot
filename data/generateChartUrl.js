const QuickChart = require('quickchart-js');
const generateDataForGraph = require('../graph/statistic-draw');

function generateUrl(label, data) {
    const s = generateDataForGraph(label, data);
    const myChart = new QuickChart();
myChart
  .setConfig({
    type: 'line',
    ...s
  })
  .setWidth(600)
  .setHeight(400)
  .setBackgroundColor('transparent');

return myChart.getUrl();
}

module.exports = generateUrl;