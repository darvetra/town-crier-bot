
// Описание экранов
export const ScreenDescription = {
    MAIN: ' — Привет, дружище! Что ты хочешь узнать?',
    BACK: ' — Что ты хочешь узнать на этот раз?',
};


// Кнопки
export const Buttons = {
    TOURNAMENT_THUNDERER: '🏆 Турнир Громовержца',
    TOURNAMENT_GIFTS: 'Дары Синдри',
    RATE_TON: 'Курс TON',
    CHARACTER_INFO: 'Информация о персонаже',
    BACK: 'Назад',
};


// Кнопки основного экрана
export const buttonMainScreenOptions = [
    [{text: Buttons.TOURNAMENT_THUNDERER, callback_data: 'tournament-thunderer'}],
    [{text: Buttons.TOURNAMENT_GIFTS, callback_data: 'tournament-gifts'}],
    [{text: Buttons.RATE_TON, callback_data: 'ton-rate'}]
];


// Персонаж
export const urlUser = 'https://api.rotgar.game/users';

export const dataUser = {
    state: 'get_by_hide_id',
    hide_id: '4s0ikmhn'
};


// Бои и победы
export const urlFights = 'https://api.rotgar.game/reports';

export const dataFights = {
    "state": "report_by_fights",
    "rating_fights": 0,
    "from": "01-05-2023",
    "to": "08-05-2023"
};

export const optionsFights = {
    headers: {
        'Content-Type': 'application/json',
    }
};


// Коингеко и ТОН
export const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

// https://api.coingecko.com/api/v3/simple/price?ids="&B10&"&vs_currencies=USD
