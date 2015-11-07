'use strict'

fs = require 'fs'
Promise = require 'bluebird'
superagent = require 'superagent'
cheerio = require 'cheerio'

log = console.log
load = module.exports = (url) -> (
  get = (url, autoReload, maxReloadTime) -> (
    new Promise((resolve) -> (
      count = 0
      log("Get From #{url}")
      _get = (url) -> (
        superagent.get url
          .end (err, res) -> (
            if err
              log(err.code)
              if autoReload and count < maxReloadTime
                count++
                log("Reload(#{count}) : #{url}")
                _get url
              else
                log 'Auto reload time exceed'
            else
              resolve res
          )
      )
      _get url
    ))
  )

  getModules = (res) -> (
    new Promise((resolve) -> (
      $ = cheerio.load  res.text
      all = $ '[href]'
      (attr) -> (
        href = attr.href
        if href and !href.match /^https:|^http:/
          resovle url+href,false
      ) attr.attribs for attr in all
    ))
  )

  save = (res) -> (
    $ = cheerio.load res.text
    $('igm').remove()
    $('script').remove()
    info(res.req.path);
  )

  saveFile = (path, htmlStr) -> (
    fs.writeFile path, html, (err) -> (
      log if err then err else "#{path} save success"
    )
  )

  get url,true,10
  .then getModules
  .then get
  .then save
)

load 'https://nodejs.org/docs/latest-v0.12.x/api/'