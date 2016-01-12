/**
 * Created by yangwi on 1/6/2016.
 */
'use strict';

var debug = require('debug')('express:router:route'),
    flatten = require('array-flatten'),
    layer = require('./layer'),
    methods = require('method');

var slice = Array.prototype.slice;
var toString = Object.prototype.toString;

module.exports = Route;

class Route {
    constructor(path) {
        this.path = path;
        this.stack = [];

        debug(`new ${path}`);
        this.methods = {};
    }

    private handler_method(method) {
        if (this.methods._all) {
            return true;
        }

        let name = method.toLowerCase();
        if (name === 'head' && !this.methods['head']) {
            name = 'get';
        }
        return Boolean(this.methods[name])
    }

    private options() {
        var methods = Object.keys(this.methods);

        if (this.methods.get && !this.methods.head) {
            methods.push('head');
        }
        for (let i = 0; i < methods.length; i++) {
            methods[i] = methods[i].toUpperCase();
        }
        return methods;
    }

    private dispatch(req, res, done) {
        let idx = 0,
            stack = this.stack;
        if (stack.length === 0) {
            return done();
        }

        let method = req.method.toLowerCase();
        if (method === 'head' && !this.methods['head']) {
            method = 'get';
        }
        req.route = this;

        next();

        function next(err) {
            if (err && err === 'route') {
                return done();
            }

            let layer = stack[idx++];
            if (!layer) {
                return done(err);
            }

            if (layer.method && layer.method !== method) {
                return next(err);
            }

            if (err) {
                layer.handle_error(err, req, res, next);
            } else {
                layer.handle_request(req, res, next);
            }
        }
    }

    public all() {
        let handles = flatten(slice.call(arguments));

        for (let i = 0; i < handles.length; i++) {
            let handle = handles[i];

            if (typeof handle !== 'function') {
                let type = toString.call(handle),
                    msg = `Route. ${method}() requires callback functions but got a ${type}`;
                throw new Error(msg);
            }

            debug(`${method} ${this.path}`);

            let layer = Layer('/', {}, handle);
            layer.method = method;

            this.methods[method] = true;
            this.stack.push(layer);
        }

        return this;
    }
}

methods.forEach(function(method) {
   Route.prototype[method] =
});