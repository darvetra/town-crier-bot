import TelegramBot from 'telegram-bot-api';

const BOT_TOKEN = '5887191883:AAFT0wTSxSZoqfU97wOa-B5EyOjAIs0KhGI';
const USER_OR_CHAT_ID = 199626730;


const bot = new TelegramBot({ token: BOT_TOKEN });

bot.sendMessage({
    chat_id: USER_OR_CHAT_ID,
    text: 'Мне нужны твоя одежда и мотоцикл!',
});
