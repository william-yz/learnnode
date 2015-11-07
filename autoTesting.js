/**
 * Created by Willam Yang on 11/3/2015.
 */
'use strict';

var superagent = require('superagent'),
    Promise = require('bluebird'),
    querystring = require('querystring'),
    fs = require('fs');

var toDateQueryString = function(dateString) {
    return dateString.replace(/\s/g,'%20').replace('(','%28').replace(')','%29');
}
var jsession = '';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//var ca = fs.readFileSync('./icsqaca.cer');

var homeUrl = 'https://stics.oocllogistics.com/ics/',
    loginAuth = {
        'mainForm:pwdStatus':'3',
        'mainForm:numDayToExpire':'0',
        'mainForm:skipChgPwd':'false',
        'mainForm:goChgPwd':'false',
        'mainForm:numOfTimeToTry':'0',
        'ext_username-inputEl':'horsupp',
        'ext_password-inputEl':'Temp2014',
        'mainForm:tzGmtOffset':'8',
        'mainForm:username':'horsupp',
        'mainForm:password':'Temp2014',
        'mainForm:submitLogin':'Login',
        'error_message0':'',
        'buttons0':'',
        'methods0':'',
        'mainForm:_idcl':'',
        'mainForm_SUBMIT':'1',
        'javax.faces.ViewState':'8FlGBOYmdVTvRHBOwqK0scoqSePS+RePu7UqbaVsuGv7uFA3mog+RAFR7osR477dU4U7/7sQGZrWzm9NXIyt5rHSIOTwVUPWFEkKLGcOXC2uFtsINWbSUKMCU3Usb+C0',
        'frm_client_submit_time': new Date().getTime(),
        'frm_art_ui_start': new Date().getTime(),
        'frm_request_type':'jsf',
        'frm_sto_check':'',
        'frm_app_ref':''
    };

function login(home, auth) {
    function startFromHome() {
        return new Promise(function(resolve, reject) {
           superagent.get(home)
               .end(function(err, res) {
                   if (err || res === undefined) {
                       console.log(err);
                       reject('Can not access to home page!');
                       return;
                   }
                   if (res.status !== 200) {
                       reject('got not 302');
                   } else {
                     //  console.info(res);
                       resolve(res.header['set-cookie']);
                   }
               });
        });
    }

    function login(jsession) {
        return new Promise(function(resolve, reject) {
           superagent.post(homeUrl + 'pub/common/cs_up_web_login.jsf')
               .set({
                   Cookie : jsession
               })
               .send(querystring.stringify(auth))
               .end(function(err, res) {
                   //console.info(res);
                   resolve(res.header['set-cookie']);
            });
        });
    }

    function toEnquirePage(jsession) {
        return new Promise(function(resolve, reject) {
            superagent.get(homeUrl + 'app/ar/ar_enquire_invc_search.jsf')
                .set({
                    Cookie : jsession
                })
                .end(function(err, res){
                    console.info(res.text);
                })
        })
    }
    return startFromHome()
        .then(login)
        .then(toEnquirePage);
}

login(homeUrl,loginAuth);

/*superagent.post(homeUrl + 'pub/common/cs_up_web_login.jsf')
    .send('mainForm%3ApwdStatus=3&mainForm%3AnumDayToExpire=0&mainForm%3AskipChgPwd=false&mainForm%3AgoChgPwd=false&mainForm%3AnumOfTimeToTry=0&ext_username-inputEl=horsupp&ext_password-inputEl=Temp2014&mainForm%3AtzGmtOffset=8&mainForm%3Ausername=horsupp&mainForm%3Apassword=Temp2014&mainForm%3AsubmitLogin=Login&error_message0=&buttons0=&methods0=&mainForm%3A_idcl=&mainForm_SUBMIT=1&javax.faces.ViewState=YS%2BRFg7TaUYv5YXtRXnQj9v3dXbm5AkUvKLxELGE7OSBUKcsc5maPm2BCmJ1HTLGoRATt%2BhuGagNRSgm8cQFFXK0j7FxaujiVsdVduMvGoFlClZKwdpRSF8E%2BiRpneIT&frm_client_submit_time=1446540394275&frm_art_ui_start=1446540394277&frm_request_type=jsf&frm_sto_check=&frm_app_ref=')
    .end(function(err, res) {
        // console.info(err);
        console.info(res);
    });*/