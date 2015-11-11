/**
 * Created by Willam Yang on 11/11/2015.
 */
'use strict';

var net = require('net')

var log = console.log
var client = net.connect(1234, 'yangwi-w7', function(msg) {
    client.on('data', function(data) {
        console.log(data.toString());
        process.stdin.on('readable', function() {
            var chunk = process.stdin.read();
            if (chunk !== null) {
                client.write(chunk.slice(0,chunk.length-2));
            }
        });
    });
})