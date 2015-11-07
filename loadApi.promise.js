/**
 * Created by Willam Yang on 11/5/2015.
 */
'use strict';


var fs = require('fs'),
    Promise = require('bluebird'),
    superagent = require('superagent'),
    cheerio = require('cheerio');


var load = module.exports = function (url) {

    function get(url, autoReload, maxReloadTime) {
        return new Promise(function (resolve) {
            var count = 0;

            console.log('Get from : ' + url);
            function _get(url) {
                superagent.get(url)
                    .end(function (err, res) {
                        if (err) {
                            console.log(err.code);
                            if (autoReload && count < maxReloadTime) {
                                count++;
                                console.log('Reload(' + count + ') : ' + url);
                                _get(url);
                            } else {
                                console.log('Auto reload time exceed!');
                            }
                        } else {
                            resolve(res);
                        }
                    });
            }

            _get(url);
        })
    }

    function getModules(res) {
        return new Promise(function (resolve) {
            var $ = cheerio.load(res.text);
           // saveFile('index.html', res.text);
            var all = $('[href]');
            for (var i in all) {
                var attrs = all[i].attribs;
                if (attrs) {
                    var href = attrs.href;
                    if (href && !href.match(/^https:|^http:/)) {
                        resolve(url + href, false);
                    }
                }
            }
        });
    }

    function save(res) {
        var $ = cheerio.load(res.text);
        $('img').remove();
        $('script').remove();
        console.info(res.req.path);
        // saveFile(res.path, $.html());
    }

    function saveFile(path, htmlStr) {
        fs.writeFile(path, htmlStr, function (err) {
            if (err) {
                console.info(err);
            } else {
                console.log(path + ' save success!')
            }
        });
    }

    return get(url, true, 10)
        .then(getModules)
        .then(get)
        .then(save);
};

load('https://nodejs.org/docs/latest-v0.12.x/api/');
