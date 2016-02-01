// 'use strict';
function run() {

    function a() {
        console.log('run a');
    }

    {
        function b() {
            console.log('run b');
        }
    }

    a();
    b();
}


run();