function generateDataForGraph(label, data) {

    const today = new Date();

    const yesterday = new Date(today.getTime());
    yesterday.setDate(today.getDate() - 1);

    const secondsDay = (today.getTime()) - (yesterday.getTime());

    const step = Math.ceil(secondsDay / data.length);

    const labels = [];

    for(let i = secondsDay; i>=0; i-=step) {
        const tempDate = new Date(today.getTime() - i );
        labels.push(`${tempDate.getHours()}:${tempDate.getMinutes()}`)
    }


    return {
        data: {
            labels: labels,
            datasets: [{ label, data}],
          },
    };
}

module.exports = generateDataForGraph;