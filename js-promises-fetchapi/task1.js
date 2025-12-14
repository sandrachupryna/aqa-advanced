
function printAfterDelayMillis(msg, delay) {
    setTimeout(() => { console.log(msg); }, delay);
}

printAfterDelayMillis("Print message after 2 seconds", 2000);
