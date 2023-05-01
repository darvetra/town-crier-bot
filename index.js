// 'use strict'
require('dotenv').config();
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const bot = new Telegraf(process.env.BOT_TOKEN);

// import { Telegraf } from 'telegraf';
// import { message } from 'telegraf/filters';
// import axios from 'axios';
const axios = require('axios');


// env

// const bot = new Telegraf(BOT_TOKEN);

// const buttonOptions = {
//     reply_markup: JSON.stringify({
//         inline_keyboard: [
//             [{text: 'Дары Синдри', callback_data: 'tournament-gifts'}],
//             [{text: 'Турнир Громовержца', callback_data: 'tournament-thunderer'}],
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
                [{text: '🏆 Турнир Громовержца', callback_data: 'tournament-thunderer'}],
                [{text: 'Дары Синдри', callback_data: 'tournament-gifts'}],
                [{text: 'Информация о персонаже', callback_data: 'info'}],
                [{text: 'Курс TON', callback_data: 'ton-rate'}]
            ]
        })
    }
));

bot.action('back', (ctx) => {
    ctx.editMessageCaption('Что ты хочешь узнать?', {
        reply_markup: {
            inline_keyboard: [
                [{text: '🏆 Турнир Громовержца', callback_data: 'tournament-thunderer'}],
                [{text: 'Дары Синдри', callback_data: 'tournament-gifts'}],
                [{text: 'Информация о персонаже', callback_data: 'info'}],
                [{text: 'Курс TON', callback_data: 'ton-rate'}]
            ]
        }
    });
});

// user_info
const urlUser = 'https://api.rotgar.game/users';
const dataUser = {
    state: 'get_by_hide_id',
    hide_id: '4s0ikmhn'
};
// axios.post(url, {
//     state: 'get_by_hide_id',
//     hide_id: '4s0ikmhn'
// })
//     .then(response => console.log(response.data))
//     .catch(error => console.error(error));


// tournament
const urlFights = 'https://api.rotgar.game/reports';
const dataFights = {
    "state": "report_by_fights",
    "rating_fights": 0,
    "from": "01-05-2023",
    "to": "08-05-2023"
};
const optionsFights = {
    headers: {
        'Content-Type': 'application/json',
    }
};



bot.action('tournament-thunderer', (ctx) => {
    ctx.editMessageCaption('Хочешь увидеть лидеров Турнира Громовержца ? Эта функция будет здесь позже', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Назад', callback_data: 'back' }]
            ]
        }
    });
});

bot.action('tournament-gifts', (ctx) => {
    ctx.editMessageCaption('Хочешь увидеть лидеров турнира "Дары Синдри" ? Эта функция будет здесь позже', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Назад', callback_data: 'back' }]
            ]
        }
    });

    axios.post(urlFights, dataFights, optionsFights)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
});

// bot.action('info', async (ctx) => {
bot.action('info', (ctx) => {
    ctx.editMessageCaption(
`
Информация о персонаже:
ID Персонажа: ${ctx.from.hide_id}
Имя: ${ctx.from.first_name}
Уровень: ${ctx.from.user_level}
Боевой рейтинг: ${ctx.from.user_rating}
Тикеты: ${ctx.from.user_tickets}
Очки сброса: ${ctx.from.reset_points}
`

        // `
        // Информация о персонаже:\n +
        // ID Персонажа: ${ctx.from.hide_id}\n
        // Уровень: ${ctx.from.user_level}\n
        // Здоровье: ${ctx.from.user_hp}\n
        // Урон: ${ctx.from.user_damage}\n
        // Тикеты: ${ctx.from.user_tickets}\n
        // Тикеты: ${ctx.from.reset_points}\n
        // `
        , {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Назад', callback_data: 'back' }]
            ]
        }
    });

    axios.post(urlUser, dataUser)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
});

// "https://api.coingecko.com/api/v3/simple/price?ids="&B10&"&vs_currencies=USD"
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';



bot.action('ton-rate', (ctx) => {
    ctx.editMessageCaption(`Хочешь узнать курс TON? ${ctx.from.first_name}? ${ctx.from.first_name}`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Назад', callback_data: 'back' }]
            ]
        }
    });

    axios.get(`${COINGECKO_API_URL}/simple/price?ids=bitcoin&vs_currencies=usd`)
        .then(response => {
            console.log(response.data.bitcoin.usd);
        })
        .catch(error => {
            console.error(error);
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
// Именем "и.о. Короля" объявляю Турнир Громовержцев открытым!

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
