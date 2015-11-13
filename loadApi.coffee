'use strict'

fs = require 'fs'
async = require 'async'
superagent = require 'superagent'
cheerio = require 'cheerio'
pathpath = require 'path'

log = console.log
loadApi = (url) ->
  get = (url, autoReload, maxReloadTime, cb) ->
    return (cb) ->
      count = 0
      log "get from #{url}"
      _get = (url) ->
        superagent.get url
          .end (err, res) ->
            if err
              log err.code
              if autoReload and count < maxReloadTime
                count++
                log "reload(#{count}) : #{url}"
                _get url
              else
                log 'Auto reload time exceed'
            else
              if cb?
                cb null, res
              else
                save res
      _get url
      return

  getModules = (res) ->
    $ = cheerio.load res.text
    all = $ '[href]'
    getHref = (attr) ->
      href = attr.href
      if href and !href.match /^http:|^https:/
        get(url + href, false, 0)()
    getHref attr.attribs for attr in all
    return

  save = (res) ->
    $ = cheerio.load res.text
    $ 'img'
      .remove()
    $ 'script'
      .remove()
    saveFile res.req.path, $.html()
    return

  saveFile = (path, htmlStr) ->
    fs.writeFile pathpath.join('./',path), htmlStr, (err) -> (
      log if err then err else "#{path} save success"
    )
    return

  async.waterfall [get 'https://nodejs.org/api/', true, 10
    getModules],
    (err, result) ->
      log err
      log result

#loadApi 'https://nodejs.org/docs/latest-v0.12.x/api/'
loadApi 'https://nodejs.org/api/'

