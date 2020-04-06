const fs = require('fs');
const path = require('path');
const request = require('request');

const stream = fs.readFileSync(path.join(__dirname, '../1.png'));

request.post({
    url: 'http://localhost:7787/files',
    formData: {
        file: stream,
    }
}, (err, res, body) => {
        console.log(body);
})