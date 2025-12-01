function printNumRecursive(num) {
    if (num >= 0) {
        console.log(num);
        printNumRecursive(num - 1);
    }
}

printNumRecursive(7);