var superagent = require('superagent'),
    cheerio = require('cheerio');

superagent.get('http://www.zhihu.com/question/37148145')
    .set({
        Cookie : 'Cookie: _za=46b954ac-15be-414c-a5bc-101e2b8b9183; _ga=GA1.2.1091327644.1440751371; cap_id="ODg5OWU3YjNmODEwNDVmMmI5NDJhMjY0MDM3MTdlNDk=|1445402217|638b5ebd9e29f60f4248f98f775d7016a572c9a4"; z_c0="QUFEQWxWTXRBQUFYQUFBQVlRSlZUWUNqVGxad0xtYXJpejF4MEFLNjJsTFpieWJQaEZ2RGJBPT0=|1445402240|7fcb943ffd4d146492ad247d54d4132d7154395f"; q_c1=4d3e23d88f734d2fbb662babad005ab8|1445488789000|1440045016000; _xsrf=0e97cc0e12ebb862abfb0a53a9a9662b; __utmt=1; __utma=51854390.1091327644.1440751371.1446697798.1446713929.2; __utmb=51854390.2.10.1446713929; __utmc=51854390; __utmz=51854390.1446697798.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=51854390.100-1|2=registration_date=20140425=1^3=entry_date=20140425=1'
    })
    .end(function(err , res) {
        var $ = cheerio.load(res.text);
           console.info(res.text);
        });