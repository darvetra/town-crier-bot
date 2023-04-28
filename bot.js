"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var telegram_bot_api_1 = require("telegram-bot-api");
var BOT_TOKEN = '5887191883:AAFT0wTSxSZoqfU97wOa-B5EyOjAIs0KhGI';
var USER_OR_CHAT_ID = 199626730;
var bot = new telegram_bot_api_1({ token: BOT_TOKEN });
bot.sendMessage({
    chat_id: USER_OR_CHAT_ID,
    text: 'Hello, World!',
});
