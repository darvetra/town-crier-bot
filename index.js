import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { Telegraf } from 'telegraf';

import {
    COINGECKO_API_URL,
    Buttons,
    buttonMainScreenOptions,
    ScreenDescription,
    dataFights,
    optionsFights,
    urlFights
} from './src/const.js';

const bot = new Telegraf(process.env.BOT_TOKEN);


// Главный экран
bot.start((ctx) => ctx.replyWithPhoto(
    { source: 'src/img/town-crier.png' },
    {
        caption: ScreenDescription.MAIN,
        reply_markup: JSON.stringify({
            inline_keyboard: buttonMainScreenOptions
        })
    }
));


// Главный экран, по возвращению
bot.action('back', (ctx) => {
    ctx.editMessageCaption(ScreenDescription.BACK, {
        reply_markup: {
            inline_keyboard: buttonMainScreenOptions
        }
    });
});


// Экран "Турнир Громовержца"
bot.action('tournament-thunderer', (ctx) => {
    ctx.editMessageCaption('Хочешь увидеть лидеров Турнира Громовержца ? Эта функция будет здесь позже', {
        reply_markup: {
            inline_keyboard: [
                [{ text: Buttons.BACK, callback_data: 'back' }]
            ]
        }
    });
});


// Экран "Турнир "Дары Синдри""
bot.action('tournament-gifts', (ctx) => {
    ctx.editMessageCaption('Хочешь увидеть лидеров турнира "Дары Синдри" ? Эта функция будет здесь позже', {
        reply_markup: {
            inline_keyboard: [
                [{ text: Buttons.BACK, callback_data: 'back' }]
            ]
        }
    });

    axios.post(urlFights, dataFights, optionsFights)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
});


// Экран "Курс TON"
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


// Логи поля ввода
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
