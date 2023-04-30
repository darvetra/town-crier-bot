const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const BOT_TOKEN = '5887191883:AAFT0wTSxSZoqfU97wOa-B5EyOjAIs0KhGI';

// const bot = new Telegraf(process.env.BOT_TOKEN);
const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.on('message', (ctx) => {
    console.log(ctx.message);
});
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
