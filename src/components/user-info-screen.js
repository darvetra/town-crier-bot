// user_info

// axios.post(url, {
//     state: 'get_by_hide_id',
//     hide_id: '4s0ikmhn'
// })
//     .then(response => console.log(response.data))
//     .catch(error => console.error(error));

// bot.action('info', async (ctx) => {
import axios from "axios";

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
