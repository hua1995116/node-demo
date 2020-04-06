const path = require('path');
const fs = require('fs');
const http = require('http');
// 定义一个分隔符，要确保唯一性
const boundaryKey = '-------------------------461591080941622511336662';
const request = http.request({
    method: 'post',
    host: 'localhost',
    port: '7787',
    path: '/files',
    headers: {
        'Content-Type': 'multipart/form-data; boundary=' + boundaryKey, // 在请求头上加上分隔符
        'Connection': 'keep-alive'
    }
});
// 写入内容头部
request.write(
    `--${boundaryKey}\r\nContent-Disposition: form-data; name="file"; filename="1.png"\r\nContent-Type: image/jpeg\r\n\r\n`
);
// 写入内容
const fileStream = fs.createReadStream(path.join(__dirname, '../1.png'));
fileStream.pipe(request, { end: false });
fileStream.on('end', function () {
    // 写入尾部
    request.end('\r\n--' + boundaryKey + '--' + '\r\n');
});
request.on('response', function(res) {
    console.log(res.statusCode);
});