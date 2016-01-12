function run() {
    for (var a = 0; a < 5; a ++) {
        setTimeout(function() {
            console.log(a);
        },a * 1000);
    }

    //a = 100;
}

run();