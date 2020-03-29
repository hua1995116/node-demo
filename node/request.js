const fs = require('fs');
const path = require('path');
const request = require('request');

const stream = fs.createReadStream(path.join(__dirname, '../1.png'));

request.post({
    url: 'http://localhost:7787/files',
    formData: {
        file: {
            value: stream,
            options: {
                filename: '1.png'
            }
        },
    }
});