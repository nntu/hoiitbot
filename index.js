require("dotenv").config();
const util = require("util");
const urlExists = util.promisify(require("url-exists"));
const Telegraf = require("telegraf");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
const session = require("telegraf/session");
const fs = require("fs");
const LocalSession = require("telegraf-session-local");

var Datastore = require("nedb");
let bot = new Telegraf(process.env.BOT_TOKEN);

if (process.env.PROXY_USE) {
  console.log("user proxy");
  console.log("proxy host: " + process.env.PROXY_HOST);
  console.log("proxy port : " + process.env.PROXY_PORT);
  const HttpsProxyAgent = require("https-proxy-agent");
  const proxyConfig = {
    telegram: {
      agent: new HttpsProxyAgent({
        host: process.env.PROXY_HOST,
        port: process.env.PROXY_PORT
      })
    }
  };

  // bot.agent = proxyConfig;
  bot = new Telegraf(process.env.BOT_TOKEN, proxyConfig);
  // console.log(bot);
}
/*
bot.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log("Response time %sms", ms);
  console.log(ctx.message);
});
*/
bot.use(new LocalSession({ database: "db.json" }).middleware());
bot.start(ctx => ctx.reply("Welcome"));
bot.help(ctx => ctx.reply("Send me a sticker"));
bot.on("sticker", ctx => ctx.reply("👍"));
bot.hears("hi", ctx => ctx.reply("Hey there"));
const db = new Datastore({
  filename: "linkanh.db",
  autoload: true
});

bot.command("hotgirl", ctx => {
  db.count({}, function(err, count) {
    if (!err && count > 0) {
      // count is the number of docs
      // skip a random number between 0 to count-1
      console.log("so luong recode " + count);
      var skipCount = Math.floor(Math.random() * count);
      console.log("skipcount " + skipCount);
      db.find({})
        .skip(skipCount)
        .limit(1)
        .exec(function(err2, docs) {
          if (!err2) {
            // docs[0] is your random doc
            docs.forEach(function(d) {
              ctx.session.counter = ctx.session.counter || 0;
              ctx.session.counter++;
              console.log("Found  url:", d.url);
              ctx.replyWithPhoto(d.url);
            });
          }
        });
    }
  });
  db.loadDatabase();
});

bot.command("addurl", ctx => {
  const regex = /^\/([^@\s]+)@?([\s\S]*)$/i;
  const parts = regex.exec(ctx.message.text);
  console.log(parts);
  let url = parts[2];
  if (!url) {
    ctx.reply("Sai cú pháp /addurl url");
  }
  urlExists(url.trim())
    .then(() => {
      console.log("url exists!");
      if (parts[2].trim().length != 0) {
        var doc = {
          url: parts[2].trim(),
          loai: "hotgirl",
          nguon: "addbybot",
          nguoidonggop: ctx.from
        };
        console.log(doc);
        db.insert(doc, function(err, newDoc) {
          // Callback is optional
          // newDoc is the newly inserted document, including its _id
          // newDoc has no key called notToBeSaved since its value was undefined
          if (!err) {
            ctx.reply("Cám ơn sự đóng góp của bạn");
          }
        });
        db.loadDatabase();
      }
    })
    .catch(() => {
      ctx.reply("Link die hoặc không đúng");
    });

  /*
   */
});

bot.command("test", ctx => {
  console.log(ctx.from);
});

bot.catch(error => {
  console.log(
    "telegraf error",
    error.response,
    error.parameters,
    error.on || error
  );
});

bot.launch();
