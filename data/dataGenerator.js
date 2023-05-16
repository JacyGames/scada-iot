function generateData(data){
let count = 0;
let isReversed = false;
    return () => {
        if(count >= data.length) {
            count = data.length -1;
            isReversed = true;
        }
        if(count <= 0) {
            count = 0;
            isReversed = false;
        }
        return isReversed ? data[count--] : data[count++];
    }
 
};

module.exports = generateData;
