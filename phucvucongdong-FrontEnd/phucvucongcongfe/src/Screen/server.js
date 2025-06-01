











const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(express.json());

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'http://localhost:3000/callback'
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
});

const sendEmail = async (to, subject, body) => {
    try {
        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

        const email = [
            `From: nguyenxuanhung12.13tpk@gmail.com`, // Thay bằng Gmail của bạn
            `To: ${to}`,
            'Content-Type: text/plain; charset=utf-8',
            'MIME-Version: 1.0',
            `Subject: ${subject}`,
            '',
            body,
        ].join('\n');

        const encodedEmail = Buffer.from(email)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedEmail,
            },
        });
    } catch (error) {
        throw new Error(`Gmail API error: ${error.message}`);
    }
};

app.post('/send-email', async (req, res) => {
    const { to, subject, body } = req.body;
    try {
        if (!to || !subject || !body) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        await sendEmail(to, subject, body);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});