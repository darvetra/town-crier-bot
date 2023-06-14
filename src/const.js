import dayjs from "dayjs";
import 'dayjs/locale/ru.js';

// Дата
export const europeMoscow = 'Europe/Moscow';

export const TODAY = dayjs().locale('ru').format('DD-MM-YYYY');
export const TOURNAMENT_START = dayjs().locale('ru').startOf('week').format('DD-MM-YYYY');
export const TOURNAMENT_END = dayjs().locale('ru').endOf('week').add(1, 'day').format('DD-MM-YYYY');
export const TOURNAMENT_END_FACT = dayjs().locale('ru').endOf('week').format('DD-MM-YYYY');


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

// Бои и победы
export const urlFights = 'https://api.rotgar.game/reports';

export const dataTrainingFights = {
    "state": "report_by_fights",
    "rating_fights": 0,
    "invite_fights": 0,
    "normal_fights": 1,
    "from": TOURNAMENT_START,
    "to": TOURNAMENT_END
};

export const dataRatingFights = {
    "state": "report_by_fights",
    "rating_fights": 1,
    "invite_fights": 0,
    "normal_fights": 0,
    "from": TOURNAMENT_START,
    "to": TOURNAMENT_END
};

export const optionsFights = {
    headers: {
        'Content-Type': 'application/json',
    }
};


// Коингеко и ТОН
export const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';
