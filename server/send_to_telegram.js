const request = require('request');

const TELEGRAM_BOT_TOKEN = '7690897426:AAFd796vNh5w3YhnrSfsZKDOzWM8bDhO5I8';
const CHAT_ID = '8195408385';

function sendMessage(name, email, message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const text = `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`;
    const options = {
        url: url,
        form: {
            chat_id: CHAT_ID,
            text: text
        }
    };

    request.post(options, (error, response, body) => {
        if (error) {
            console.error('Error sending message to Telegram:', error);
        } else {
            console.log('Message sent to Telegram:', body);
        }
    });
}

module.exports = {
    sendMessage
};