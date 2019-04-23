require("dotenv").config();

const Telegraf = require("telegraf");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");

const session = require("telegraf/session");

const fs = require("fs");
const LocalSession = require('telegraf-session-local');

var Datastore = require('nedb');

const bot = new Telegraf(process.env.BOT_TOKEN);
if (process.env.PROXY_USE) {

  const HttpsProxyAgent = require("https-proxy-agent");
  const proxyConfig = {
    telegram: {
      agent: new HttpsProxyAgent({
        host: process.env.PROXY_HOST,
        port: process.env.PROXY_PORT
      })
    }
  };

  bot.agent = proxyConfig;
}

bot.use((new LocalSession({ database: 'db.json' })).middleware())



const db = new Datastore({
  filename: 'linkanh.db',
  autoload: true
});

bot.command('hotgirl', (ctx) => {
     
  db.count({}, function (err, count) {
    if (!err && count > 0) {
      // count is the number of docs  
      // skip a random number between 0 to count-1
      console.log("so luong recode " + count);
      var skipCount = Math.floor(Math.random() * count);
      console.log("skipcount " + skipCount);
      db.find({}).skip(skipCount).limit(1).exec(function (err2, docs) {
        if (!err2) {
          // docs[0] is your random doc
          docs.forEach(function(d) {
            ctx.session.counter = ctx.session.counter || 0
            ctx.session.counter++
            console.log('Found  url:', d.url);
            ctx.replyWithPhoto( d.url);
        });
         
        }
      });
    }
  });
  db.loadDatabase();

} 

)
 


bot.catch(error => {
  console.log(
    "telegraf error",
    error.response,
    error.parameters,
    error.on || error
  );
});

bot.launch();
