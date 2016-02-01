'use strict';

/**
 * Module dependencies.
 */
var winston = require('winston');
var format = require('string-format');
var request = require('request');
var config = require('../../config/config');
var util = require('util');

exports.cpfIdByCallerId = function(req, res, next, id) {

  var query = {id};

  var getX = function() {
    return new Promise(function(resovle) {
      request.get({
        baseUrl : config.url.dom,
        url: util.format('/api/v1/CallerIdRepositories?query=%s', encodeURIComponent(JSON.stringify(query))),
        json: true
      }, (error, response, mappings) => {
        if (!error && (response.statusCode == 200)) {
          resovle(mappings);
        } else {
          reject({error,mappings});
        }
      });
    });
  };

  var p1 = function(mappings) {
    return new Promise(function(resovle, reject) {
      if (_.isEmpty(mappings)) {

      }
    });
  };

  var errorHandler = function(errInfo) {

  };

  return getX()



}