const handleEven = (num) => console.log(`Number ${num} is even`);
const handleOdd = (num) => console.log(`Number ${num} is odd`);

function handleNum(num, evenCallback, oddCallback) {
  num % 2 === 0 ? evenCallback(num) : oddCallback(num);
}

handleNum(4, handleEven, handleOdd); // even
handleNum(7, handleEven, handleOdd); // odd
handleNum(0, handleEven, handleOdd); // even
handleNum(-3, handleEven, handleOdd); // odd
