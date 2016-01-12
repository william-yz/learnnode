/**
 * Created by yangwi on 1/4/2016.
 */
'use strict';

module.exports = {
    entry: [
        './assets/js/main.jsx'
    ],
    output: {
        path: 'public',
        filename: 'bundle.js'
    },
    module : {
        loaders : {
            test : /\.jsx$/,
            exclude : /node_modules/,
            loaders : ['babel']
        }
    }

};