var Telegraf = require('telegraf').Telegraf;
var message = require('telegraf/filters').message;
var BOT_TOKEN = '5887191883:AAFT0wTSxSZoqfU97wOa-B5EyOjAIs0KhGI';
// const bot = new Telegraf(process.env.BOT_TOKEN);
var bot = new Telegraf(BOT_TOKEN);
bot.start(function (ctx) { return ctx.reply('Welcome'); });
bot.help(function (ctx) { return ctx.reply('Send me a sticker'); });
bot.on(message('sticker'), function (ctx) { return ctx.reply('👍'); });
bot.hears('hi', function (ctx) { return ctx.reply('Hey there'); });
bot.launch();
// Enable graceful stop
process.once('SIGINT', function () { return bot.stop('SIGINT'); });
process.once('SIGTERM', function () { return bot.stop('SIGTERM'); });
