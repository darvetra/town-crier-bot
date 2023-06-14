import dayjs from 'dayjs'

// Дата
export const humanizeDate = (date) => dayjs(date).format('DD.MM.YYYY HH:MM');

export const FROM = '12-06-2023';
export const TO = '19-06-2023';

export const TO_FACT = '18-06-2023';


// Ссылки
export const ButtonLinks = {
    GUIDE: 'https://t.me/rotgarchat_ru/23886/23926',
    GAME: 'https://t.me/rotgar_bot',
};


// Описание экранов
export const ScreenDescription = {
    MAIN: `приветствую!\n\nЧто ты хочешь узнать? Я здесь для того чтобы помочь тебе.\n\nИграй в [Rotgar Game](${ButtonLinks.GAME}) и зарабатывай ценные призы в турнирах!`,
    BACK: `что ты хочешь узнать на этот раз?\n\nТы уже играл в [Rotgar Game](${ButtonLinks.GAME})? А призы заработал? Может и Telegram Premium приобрел на заработанные в игре тоны?`,
};


// Кнопки
export const Buttons = {
    PLAY: '⚔ Играть в Rotgar Game',
    TOURNAMENT_CHALLENGE: '🎖 Турнир "Испытание Героев"',
    TOURNAMENT_GIFTS: '🏆 Турнир "Дары Синдри"',
    RATE_TON: '💎 Курс TON',
    HOW_TO_PLAY: '🎮 Как играть?',
    CHARACTER_INFO: 'Информация о персонаже',
    BACK: 'Назад',
};


// Кнопки основного экрана
export const buttonMainScreenOptions = [
    [{text: Buttons.PLAY, url: ButtonLinks.GAME}],
    [{text: Buttons.TOURNAMENT_CHALLENGE, callback_data: 'tournament-challenge'}],
    [{text: Buttons.TOURNAMENT_GIFTS, callback_data: 'tournament-gifts'}],
    [{text: Buttons.RATE_TON, callback_data: 'ton-rate'}],
    [{text: Buttons.HOW_TO_PLAY, url: ButtonLinks.GUIDE}],
];


// Персонаж
export const urlUser = 'https://api.rotgar.game/users';

export const dataUser = {
    state: 'get_by_hide_id',
    hide_id: '4s0ikmhn'
};


// Бои и победы
export const urlFights = 'https://api.rotgar.game/reports';

export const dataTrainingFights = {
    "state": "report_by_fights",
    "rating_fights": 0,
    "invite_fights": 0,
    "normal_fights": 1,
    "from": FROM,
    "to": TO
};

export const dataRatingFights = {
    "state": "report_by_fights",
    "rating_fights": 1,
    "invite_fights": 0,
    "normal_fights": 0,
    "from": FROM,
    "to": TO
};

export const optionsFights = {
    headers: {
        'Content-Type': 'application/json',
    }
};


// Коингеко и ТОН
export const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

// https://api.coingecko.com/api/v3/simple/price?ids="&B10&"&vs_currencies=USD
