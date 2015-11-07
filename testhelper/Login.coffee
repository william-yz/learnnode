'use strict'

async = require 'async'
superagent = require 'superagent'
querystring = require 'querystring'
fs = require 'fs'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

f = module.exports = (home, auth) ->

  startFromHome = (cb) ->
    superagent.get home
    .end (err, res) -> cb err, try res.header['set-cookie']

  login = (jsession, cb) ->
    console.log jsession
    superagent.post "#{home}pub/common/cs_up_web_login.jsf"
      .set Cookie : jsession
      .send querystring.stringify auth
      .end (err, res) ->
        console.info res.text
        cb err, try res.header['set-cookie']

  toEnquirePage = (jsession, cb) ->
    superagent.get "#{home}app/ar/ar_enquire_invc_search.jsf"
      .set Cookie : jsession
      .end (err, res) -> cb err, res

  async.waterfall [startFromHome, login, toEnquirePage]
    ,(err, result) ->
      console.info err
      console.info result.text


home = 'https://stics.oocllogistics.com/ics/'
loginAuth =
  'mainForm:pwdStatus':'3'
  'mainForm:numDayToExpire':'0'
  'mainForm:skipChgPwd':'false'
  'mainForm:goChgPwd':'false'
  'mainForm:numOfTimeToTry':'0'
  'ext_username-inputEl':'horsupp'
  'ext_password-inputEl':'Temp2014'
  'mainForm:tzGmtOffset':'8'
  'mainForm:username':'horsupp'
  'mainForm:password':'Temp2014'
  'mainForm:submitLogin':'Login'
  'error_message0':''
  'buttons0':''
  'methods0':''
  'mainForm:_idcl':''
  'mainForm_SUBMIT':'1'
  'javax.faces.ViewState':'yBSxsXhVBIdQjvp8NCTQXjSx+GTNPDvomd130yvufyy2QgRPYAKiMpOrXAph4Jdr7zx6KA7H9eCtxwaWQCjmQ7WJjDTPXVtDLi923rqkzeqXi//7JZsA+1It0viczCh2'
  'frm_client_submit_time': new Date().getTime()
  'frm_art_ui_start': new Date().getTime()
  'frm_request_type':'jsf'
  'frm_sto_check':''
  'frm_app_ref':''

f home, loginAuth