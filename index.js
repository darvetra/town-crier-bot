import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { Telegraf } from 'telegraf';

import {
    COINGECKO_API_URL,
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


// Экран "Турнир "Награда Героев""
bot.action('tournament-award', (ctx) => {
    axios.post(urlFights, dataRatingFights, optionsFights)
        .then(response => {
            const players = response.data;
            console.log(players)
            const playersList = players.slice(0, 10).map((player, index) => `${index + 1}. 🛡${player.fights}   🏆${player.win}   ☠${player.loos}     ${player.full_name}`).join('\n');
            const tournamentsGiftsDescription = `Становись сильнее и побеждай в ранговых боях с крутыми призами.\n\n🏆 Игроки набравшие больше всего побед в ранговых поединках за неделю получат следующие награды: \n1. 💎 5 TON + Предмет экипировки \n2. 💎 3 TON \n3. 💎 2 TON\n \nЛидеры этой недели:\n${playersList}\n \n🛡 – всего поединков, 🏆 – победы, ☠ – поражения\n`;

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
            console.log(players)
            const playersList = players.slice(0, 10).map((player, index) => `${index + 1}. 🛡${player.fights}   🏆${player.win}   ☠${player.loos}     ${player.full_name}`).join('\n');
            const tournamentsGiftsDescription = `Каждую неделю, игрок сыгравший наибольшее количество поединков награждается предметом экипировки. \n \nЛидеры этой недели:\n${playersList}\n \n🛡 – всего поединков, 🏆 – победы, ☠ – поражения\n`;

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
//     ctx.editMessageCaption(`Хочешь узнать курс TON? ${ctx.from.first_name}? ${ctx.from.first_name} Кстати, а ты знал что можно купить подписку телеграм премиум за ТОН? на фрашменте? `, {
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
