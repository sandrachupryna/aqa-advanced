async function sleep(millis) {
    setTimeout(millis);
}

let t = Date.now()
sleep(100).then(() => console.log(Date.now() - t)) // 100