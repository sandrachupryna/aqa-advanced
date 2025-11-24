function checkOrder(available, ordered) {
    if (available < 0 || ordered < 0) {
        return "Invalid order quantity."
    }
    if (available < ordered ) {
        return "Your order is too large, we don’t have enough goods."
    }
    if (ordered === 0) {
        return "Your order is empty."
    }
    return "The order is accepted."
}

console.log(`Check order with available 10 and ordered 5: ${checkOrder(10, 5)}`);
console.log(`Check order with available 10 and ordered 15: ${checkOrder(10, 15)}`);
console.log(`Check order with available 10 and ordered 0: ${checkOrder(10, 0)}`);
console.log(`Check order with available -5 and ordered 3: ${checkOrder(-5, 3)}`);
console.log(`Check order with available 8 and ordered -2: ${checkOrder(8, -2)}`);
console.log(`Check order with available 0 and ordered 0: ${checkOrder(0, 0)}`);
console.log(`Check order with available 0 and ordered 5: ${checkOrder(0, 5)}`);