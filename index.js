import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { Telegraf } from 'telegraf';

import {
    FROM,
    TO,
    TO_FACT,
    // COINGECKO_API_URL,
    Buttons,
    buttonMainScreenOptions,
    ScreenDescription,
    dataAllFights,
    dataRatingFights,
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


// Экран "Турнир "Испытание Героев""
bot.action('tournament-challenge', (ctx) => {
    axios.post(urlFights, dataRatingFights, optionsFights)
        .then(response => {
            const players = response.data;
            // console.log(players)
            const playersList = players.slice(0, 10).map((player, index) => `${index + 1}. ${player.full_name} [${player.user_level}] \n   🏆${player.win}   🛡${player.fights}   ☠${player.loos} 🎖${(Math.floor(player.win / player.fights * 100))} 🏅${player.user_rating}`).join('\n');
            const tournamentsGiftsDescription = `Турнир "Испытание героев" (рейтинговые поединки)\n\nПериод проведения: ${FROM} - ${TO_FACT}\n\nСтановись сильнее и побеждай в рейтинговых поединках с крутыми призами. Турнир проходит каждую неделю. Еженедельный призовой фонд турнира 10 TON (~1500 руб.) и 2 предмета экипировки, разделят между собой два самых сильных бойца.\n\nПризовые места: \n🏆 максимальное количество побед \n🏆 максимальный винрейт среди топ-10 \n \nЛидеры этой недели:\n${playersList}\n \n🛡 – всего поединков, 🏆 – победы, ☠ – поражения, 🎖 - winrate %, 🏅 - MMR\n`;

            // меняет картинку, но исчезает кнопка
            // ctx.editMessageMedia({
            //     type: 'photo',
            //     media: { source: 'src/img/award.png' },
            //     caption: tournamentsGiftsDescription,
            ctx.editMessageCaption(tournamentsGiftsDescription, {
                reply_markup: {
                    inline_keyboard: [[{ text: Buttons.BACK, callback_data: 'back' }]]
                }
            });
        })
        .catch(error => console.error(error));
});


// Экран "Турнир "Дары Синдри""
bot.action('tournament-gifts', (ctx) => {
    axios.post(urlFights, dataAllFights, optionsFights)
        .then(response => {
            const players = response.data;
            // console.log(players)

            const playersList = players.slice(0, 10).map((player, index) => `${index + 1}. ${player.full_name} [${player.user_level}] \n   🛡${player.fights}   🏆${player.win}   ☠${player.loos}   🎖${(Math.floor(player.win / player.fights * 100))}`).join('\n');
            const tournamentsGiftsDescription = `Турнир "Дары Синдри" (тренировочные поединки)\n\nПериод проведения: ${FROM} - ${TO_FACT}\n\nКаждую неделю мастер Синдри награждает двух самых активных игроков случайными предметами экипировки! \n \nПризовые места: \n🏆 максимальное количество поединков \n🏆 максимальный винрейт среди топ-10\n \nЛидеры этой недели:\n${playersList}\n \n🛡 – всего поединков, 🏆 – победы, ☠ – поражения,  🎖 - winrate %\n`;

            // меняет картинку, но исчезает кнопка
            // ctx.editMessageMedia({
            //     type: 'photo',
            //     media: { source: 'src/img/gift.png' },
            //     caption: tournamentsGiftsDescription,
            ctx.editMessageCaption(tournamentsGiftsDescription, {
                reply_markup: {
                    inline_keyboard: [[{ text: Buttons.BACK, callback_data: 'back' }]]
                }
            });
        })
        .catch(error => console.error(error));
});


// Экран "Курс TON"
// bot.action('ton-rate', (ctx) => {
//     ctx.editMessageCaption(`Хочешь узнать курс TON? ${ctx.from.first_name}? ${ctx.from.first_name} Превратите свои навыки в Rotgar Game в подписку Telegram Premium ! Кстати, а ты знал что можно купить подписку телеграм премиум за ТОН? на фрашменте? `, {
//         reply_markup: {
//             inline_keyboard: [
//                 [{ text: 'Назад', callback_data: 'back' }]
//             ]
//         }
//     });
//
//     axios.get(`${COINGECKO_API_URL}/simple/price?ids=bitcoin&vs_currencies=usd`)
//         .then(response => {
//             console.log(response.data.bitcoin.usd);
//         })
//         .catch(error => {
//             console.error(error);
//         });
//
// });


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
