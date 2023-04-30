const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
//
// import { Telegraf } from 'telegraf';
// import { message } from 'telegraf/filters';
// import axios from 'axios';
const axios = require('axios');

// env
const BOT_TOKEN = '5887191883:AAFT0wTSxSZoqfU97wOa-B5EyOjAIs0KhGI';

// const bot = new Telegraf(process.env.BOT_TOKEN);
const bot = new Telegraf(BOT_TOKEN);

// const buttonOptions = {
//     reply_markup: JSON.stringify({
//         inline_keyboard: [
//             [{text: 'Дары Синдри', callback_data: 'tournament-1'}],
//             [{text: 'Турнир Громовержца', callback_data: 'tournament-2'}],
//             [{text: 'Курс TON', callback_data: 'ton-rate'}]
//         ]
//     })
// };

// bot.start((ctx) => ctx.replyWithPhoto({ source: 'src/img/town-crier.png' }, { caption: 'This is a caption!' }, buttonOptions));
bot.start((ctx) => ctx.replyWithPhoto(
    { source: 'src/img/town-crier.png' },
    {
        caption: 'Привет, дружище! Что ты хочешь узнать?',
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: '🏆 Турнир Громовержца', callback_data: 'tournament-2'}],
                [{text: 'Дары Синдри', callback_data: 'tournament-1'}],
                [{text: 'Курс TON', callback_data: 'ton-rate'}]
            ]
        })
    }
));

bot.action('tournament-2', (ctx) => {
    ctx.editMessageCaption('Хочешь увидеть лидеров Турнира Громовержца ? Эта функция будет здесь позже', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Назад', callback_data: 'back' }]
            ]
        }
    });
});

bot.action('tournament-1', (ctx) => {
    ctx.editMessageCaption('Хочешь увидеть лидеров турнира "Дары Синдри" ? Эта функция будет здесь позже', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Назад', callback_data: 'back' }]
            ]
        }
    });
});

bot.action('ton-rate', (ctx) => {
    ctx.editMessageCaption('Хочешь узнать курс TON? Эта функция будет здесь позже.', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Назад', callback_data: 'back' }]
            ]
        }
    });
});

bot.action('back', (ctx) => {
    ctx.editMessageCaption('New caption', {
        reply_markup: {
            inline_keyboard: [
                [{text: '🏆 Турнир Громовержца', callback_data: 'tournament-2'}],
                [{text: 'Дары Синдри', callback_data: 'tournament-1'}],
                [{text: 'Курс TON', callback_data: 'ton-rate'}]
            ]
        }
    });
});







// bot.help((ctx) => ctx.reply('Send me a sticker'));
// bot.action('button_pressed', (ctx) => {
//     ctx.reply('Button pressed!');
// });

// Ответ на стикер
bot.on(message('sticker'), (ctx) => ctx.reply('👍'));

// Диалог для знакомстав бота с игроками
// bot.reply('Здарова, бандиты!)')
bot.hears('Привет, дружище 😁', (ctx) => ctx.reply('Что-то ребята вы загрустили, решил разбавить ваши постные лица своей довольной "рожей") Вдарим рока в этой дыре! 🎸🤘'));
bot.hears('А ты хорош 🤣', (ctx) => ctx.reply('Турнир у вас какой-то скучный. Как он там называется? "Дары Синдри"? Пусть так, а кто лидирует? Не знаете? а я вот знаю!'));
bot.hears('О! Ну давай, расскажи нам))');
// Бот выкидывает список лидеров даров Синдри
// Ладно, фигня все это . я анонсирую свой турнир
// условия
// название из мифологии, называет его своим приятель.

// твист: Глашатай это Локи
// Озвучка бота с помощью , ,бота озвучки  tsslr или типа того
// при выдаче квеста

// Логи
bot.on('message', (ctx) => {
    console.log(ctx.message);
});

// const params = {
//     state: 'report_by_fights',
//     rating_fights: 0,
//     from: '27-04-2023',
//     to: '29-04-2023',
// };
//
// axios.get('https://api.rotgar.game/reports', { params })
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error(error);
//     });

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
