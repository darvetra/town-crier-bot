import dotenv from 'dotenv';
dotenv.config();

import { Telegraf } from 'telegraf';
import axios from 'axios';

import {
    TOURNAMENT_START,
    TOURNAMENT_END_FACT,
    COINGECKO_API_URL,
    Buttons,
    buttonMainScreenOptions,
    ScreenDescription,
    dataTrainingFights,
    dataRatingFights,
    optionsFights,
    urlFights
} from './src/const.js';


const bot = new Telegraf(process.env.BOT_TOKEN);


// Главный экран
bot.start((ctx) => ctx.replyWithPhoto(
    { source: 'src/img/town-crier.png' },
    {
        caption: `${ctx.from.first_name}, ${ScreenDescription.MAIN}`,
        parse_mode: 'Markdown',
        reply_markup: JSON.stringify({
            inline_keyboard: buttonMainScreenOptions
        })
    }
));


// Главный экран, по возвращению
bot.action('back', (ctx) => {
        ctx.editMessageMedia({
            type: 'photo',
            media: { source: 'src/img/town-crier.png' },
            caption: `${ctx.from.first_name}, ${ScreenDescription.BACK}`,
            parse_mode: 'Markdown',
        }, {
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
            const playersSortByWins = players.sort((a, b) => b.win - a.win).slice(0, 10);
            const playersChallengeList = playersSortByWins.slice(0, 10).map((player, index) => `${index + 1}. [${player.full_name}](https://api.rotgar.game/webapp/inventory.html?hide_id=${player.hide_id}) [[${player.user_level}]] \n    🏆${player.win}   🛡${player.fights}   ☠${player.loos} 🎖${(Math.floor(player.win / player.fights * 100))} 🏅${player.user_rating}`).join('\n');
            const top1challenge = playersSortByWins[0];
            const sortByWinRate = players.slice(0, 10).sort((a, b) => {
                const winRateA = Math.floor(a.win / a.fights * 100);
                const winRateB = Math.floor(b.win / b.fights * 100);
                return winRateB - winRateA;
            });
            const top1challengeByWinRate = sortByWinRate[0];

            console.log(top1challenge);
            console.log(top1challengeByWinRate);

            // 🏆${top1challenge ? top1challenge.win : 132} ${top1challenge ? top1challenge.full_name : 'Городской глашатай'} [${top1challenge ? top1challenge.user_level : 132}]
            const tournamentsChallengeDescription = `*Турнир "Испытание героев"* (_рейтинговые поединки_)\n\nПериод проведения: _${TOURNAMENT_START} - ${TOURNAMENT_END_FACT}_\n\n_Становись сильнее и побеждай в рейтинговых поединках с крутыми призами. Турнир проходит каждую неделю. Еженедельный призовой фонд турнира 💎 10 TON (~1500 руб., см. курс TON) и 2 предмета экипировки, разделят между собой два самых сильных бойца._\n\n*Призовые места:*\n💎 Максимальное количество побед: ⚔${top1challenge.win} [${top1challenge.full_name}](https://api.rotgar.game/webapp/inventory.html?hide_id=${top1challenge.hide_id}) [[${top1challenge.user_level}]] \n💎 Максимальный винрейт среди топ-10: 🎖${(Math.floor(top1challengeByWinRate.win / top1challengeByWinRate.fights * 100))} [${top1challengeByWinRate.full_name}](https://api.rotgar.game/webapp/inventory.html?hide_id=${top1challengeByWinRate.hide_id}) [[${top1challengeByWinRate.user_level}]] \n \n*Лидеры этой недели:*\n${playersChallengeList}\n \n_⚔ – всего поединков, 🏆 – победы, ☠ – поражения, 🎖 - winrate (%), 🏅 - MMR_\n`;

            ctx.editMessageMedia({
                type: 'photo',
                media: { source: 'src/img/tournament-challenge.png' },
                caption: tournamentsChallengeDescription,
                parse_mode: 'Markdown',
            }, {
                reply_markup: {
                    inline_keyboard: [[{ text: Buttons.BACK, callback_data: 'back' }]]
                }
            });
        })
        .catch(error => console.error(error));
});


// Экран "Турнир "Дары Синдри""
bot.action('tournament-gifts', (ctx) => {
    axios.post(urlFights, dataTrainingFights, optionsFights)
        .then(response => {
            const players = response.data;
            // console.log(players)

            const top1gifts = players[0];
            const playersGiftsList = players.slice(0, 10).map((player, index) => `${index + 1}. [${player.full_name}](https://api.rotgar.game/webapp/inventory.html?hide_id=${player.hide_id}) [[${player.user_level}]] \n    ⚔${player.fights}   🏆${player.win}   ☠${player.loos}   🎖${(Math.floor(player.win / player.fights * 100))}`).join('\n');

            const sortByWinRate = players.slice(0, 10).sort((a, b) => {
                const winRateA = Math.floor(a.win / a.fights * 100);
                const winRateB = Math.floor(b.win / b.fights * 100);
                return winRateB - winRateA;
            });

            const top1giftsByWinRate = sortByWinRate[0];

            const tournamentsGiftsDescription = `*Турнир "Дары Синдри"* (_тренировочные поединки_)\n\nПериод проведения: _${TOURNAMENT_START} - ${TOURNAMENT_END_FACT}_\n\n_Каждую неделю мастер Синдри награждает двух самых активных игроков случайными предметами экипировки!_\n \n*Призовые места:*\n💎 Максимальное количество поединков: ⚔${top1gifts.fights} [${top1gifts.full_name}](https://api.rotgar.game/webapp/inventory.html?hide_id=${top1gifts.hide_id}) [[${top1gifts.user_level}]]\n💎 Максимальный винрейт среди топ-10: 🎖${(Math.floor(top1giftsByWinRate.win / top1giftsByWinRate.fights * 100))} [${top1giftsByWinRate.full_name}](https://api.rotgar.game/webapp/inventory.html?hide_id=${top1giftsByWinRate.hide_id}) [[${top1giftsByWinRate.user_level}]] \n \n*Лидеры этой недели:*\n${playersGiftsList}\n \n_⚔ – всего поединков, 🏆 – победы, ☠ – поражения,  🎖 - winrate (%)_\n`;

            ctx.editMessageMedia({
                type: 'photo',
                media: { source: 'src/img/tournament-gifts.png' },
                caption: tournamentsGiftsDescription,
                parse_mode: 'Markdown',
            }, {
                reply_markup: {
                    inline_keyboard: [[{ text: Buttons.BACK, callback_data: 'back' }]]
                }
            });
        })
        .catch(error => console.error(error));
});


// Экран "Курс TON"
bot.action('ton-rate', (ctx) => {

    const coin = 'the-open-network';

    axios.get(`${COINGECKO_API_URL}/simple/price?ids=${coin}&vs_currencies=usd`)
        .then(response => {
            const coinRateUSD = response.data[coin].usd;
            // console.log(coinRateUSD);

            const rateDescription = `\n*💎 Текущий курс TON* составляет *${coinRateUSD} $*\n\n💭 Кстати, ты знал, что на 💎TON, выигранные на турнире, можно купить подписку [Telegram Premium](https://t.me/premium). Сделать это можно на маркетплейсе [Fragment](https://fragment.com/premium).\n\nКотировки берутся с [CoinGecko](https://www.coingecko.com/en/coins/toncoin) 🦎`

            ctx.editMessageMedia({
                type: 'photo',
                media: { source: 'src/img/ton-rate.png' },
                caption: rateDescription,
                parse_mode: 'Markdown',
            }, {
                reply_markup: {
                    inline_keyboard: [[{ text: Buttons.BACK, callback_data: 'back' }]]
                }
            });
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
