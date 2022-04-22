const TelegramBoat = require('node-telegram-bot-api');
const TOKEN = '5398758343:AAEbFEWgxdUpTxy2mzA0Ya3pcp9fK2UWinI';

const bot = new TelegramBoat(TOKEN, {  polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, resp);
});

bot.onText(/\/pnx/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = "PNX это по-русски ПНХ"
    bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(msg)
    bot.sendMessage(chatId, `echo: ${msg.text}`);
});