// @ts-ignore
import { Telegraf, ContextMessageUpdate } from 'telegraf';
// @ts-ignore
import { message } from 'telegraf/typings/composer';

const BOT_TOKEN = '5887191883:AAFT0wTSxSZoqfU97wOa-B5EyOjAIs0KhGI';

// const bot = new Telegraf(process.env.BOT_TOKEN);
const bot = new Telegraf(BOT_TOKEN);
bot.start((ctx: ContextMessageUpdate) => ctx.reply('Welcome !'));
bot.help((ctx: ContextMessageUpdate) => ctx.reply('Send me a sticker'));
bot.on('message', (ctx: ContextMessageUpdate) => {
    if (ctx.message.sticker) {
        ctx.reply('👍');
    }
});
bot.hears('hi', (ctx: ContextMessageUpdate) => ctx.reply('Hey there'));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
