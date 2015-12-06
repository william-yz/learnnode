// "use strict"

function func1 () {
    var a = 0;
    for (var i = 0; i < 10; i ++) {
        var b = 10;
        a ++ ;
    }

    (function() {
        var c = 10;
    })();

    console.log(i);
    console.log(a);
    console.log(b);
    console.log(c);
}

function func2 () {
    //must in strict mode
    "use strict"
    let a = 0;
    for (let i = 0; i < 10; i ++) {
        let b = 10;
        a ++ ;
    }


    console.log(i);
    console.log(a);
    console.log(b);
}

// func1();
// func2();