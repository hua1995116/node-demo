const fs = require('fs');
const http = require('http');
const querystring = require('querystring');
const server = http.createServer((req, res) => {
  if (req.url === "/files" && req.method.toLowerCase() === "post") {
    parseFile(req, res)
  }
})
function parseFile(req, res) {
  req.setEncoding("binary");
  let body = "";
  let fileName = "";
  // 边界字符
  let boundary = req.headers['content-type']
    .split('; ')[1]
    .replace("boundary=", "")
  
  req.on("data", function(chunk) {
    body += chunk;
  });
  req.on("end", function() {
    // 按照分解符切分
    const list = body.split(boundary);
    let contentType = '';
    let fileName = '';
    for (let i = 0; i < list.length; i++) {
      if (list[i].includes('Content-Disposition')) {
        const data = list[i].split('\r\n');
        for (let j = 0; j < data.length; j++) {
          // 从头部拆分出名字和类型
          if (data[j].includes('Content-Disposition')) {
            const info = data[j].split(':')[1].split(';');
            fileName = info[info.length - 1].split('=')[1].replace(/"/g, '');
            console.log(fileName);
          }
          if (data[j].includes('Content-Type')) {
            contentType = data[j];
            console.log(data[j].split(':')[1]);
          }
        }
      }
    }
    // 去除前面的请求头
    const start = body.toString().indexOf(contentType) + contentType.length + 4; // 有多\r\n\r\n
    const startBinary = body.toString().substring(start);
    const end = startBinary.indexOf("--" + boundary + "--") - 2; // 前面有多\r\n
     // 去除后面的分隔符
    const binary = startBinary.substring(0, end);
    const bufferData = Buffer.from(binary, "binary");
    fs.writeFile(fileName, bufferData, function(err) {
      res.end("sucess");
    });
    ;
  })
}

server.listen(7787)
