const rp = require('request-promise');
const $ = require('cheerio');
const url = 'http://www.mbet88vn.com/tong-hop-girl-viet-nam-sexy-cuc-nhuc-nhoi-phan-1.html';

rp(url)
  .then(function(html) {
    console.log($('#post-1763 > div > p > img', html).text());
     
  })
  .catch(function(err) {
    //handle error
  });