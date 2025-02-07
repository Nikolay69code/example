const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sendToTelegram = require('./send_to_telegram');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});

app.post('/send_feedback', (req, res) => {
    const { name, email, message } = req.body;
    sendToTelegram.sendMessage(name, email, message);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});