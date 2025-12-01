function divide(numerator, denominator) {
    if (denominator === 0) {
        throw new Error('Division by zero is not allowed.');
    }
    if (typeof numerator !== 'number' || typeof denominator !== 'number') {
        throw new Error('Both arguments must be numbers.');
    }
    return numerator / denominator;
}

// Case #1: Valid division
try {
    console.log(`Dividing 10 by 2:`);
    console.log(divide(10, 2));
}
catch (error) {
    console.error('Error:', error.message);
}
finally {
    console.log('Execution completed.');
}

// Case #2: Valid division with floating-point numbers
try {
    console.log(`Dividing 15.2 by 3.567:`);
    console.log(divide(15.2, 3.567));
}
catch (error) {
    console.error('Error:', error.message);
}
finally {
    console.log('Execution completed.');
}

// Case #3: Division by zero
try {
    console.log(`Dividing 10 by 0:`);
    console.log(divide(10, 0));
}
catch (error) {
    console.error('Error:', error.message);
}
finally {
    console.log('Execution completed.');
}

// Case #4: Invalid input types
try {
    console.log(`Dividing 10 by 'asd':`);
    console.log(divide(10, 'asd'));
}
catch (error) {
    console.error('Error:', error.message);
}
finally {
    console.log('Execution completed.');
}
