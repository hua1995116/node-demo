const path = require('path');
const FormData = require('form-data');
const fs = require('fs');
const http = require('http');

const form = new FormData();

form.append('file', fs.readFileSync(path.join(__dirname, '../1.png')), {
    filename: '1.png',
    contentType: 'image/jpeg',
});

const request = http.request({
    method: 'post',
    host: 'localhost',
    port: '7787',
    path: '/files',
    headers: form.getHeaders()
});

form.pipe(request);

request.on('response', function(res) {
    console.log(res.statusCode);
});