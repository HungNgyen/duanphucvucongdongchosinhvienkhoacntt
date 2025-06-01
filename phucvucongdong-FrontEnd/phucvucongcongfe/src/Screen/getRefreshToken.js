


const { google } = require('googleapis');
const http = require('http');
const url = require('url');

const oauth2Client = new google.auth.OAuth2(
    '811514903790-vvral8p9fab4kj5v4tn12b3r52djtuve.apps.googleusercontent.com', // Thay bằng client_id từ Google Cloud Console
    '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', // Thay bằng client_secret
    'http://localhost:3000/callback'
);

// Tạo URL xác thực
const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.send'],
});
console.log('Authorize this app by visiting this url:', authUrl);

// Tạo server để nhận code từ Google
const server = http.createServer(async (req, res) => {
    const qs = new URL(req.url, 'http://localhost:3000').searchParams;
    const code = qs.get('code');

    if (code) {
        try {
            const { tokens } = await oauth2Client.getToken(code);
            console.log('Refresh Token:', tokens.refresh_token);
            res.end('Authorization successful! Check console for refresh token.');
            server.close();
        } catch (error) {
            console.error('Error retrieving tokens:', error);
            res.end('Error during authorization.');
            server.close();
        }
    } else {
        res.end('No code received.');
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:5093');
});