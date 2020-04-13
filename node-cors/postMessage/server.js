const Koa = require("koa");
const fs = require("fs");
const path = require('path');
const app = new Koa();

app.use(async (ctx, next) => {
  if (ctx.method === "GET" && ctx.path === "/") {
    ctx.body = fs.readFileSync(path.join(__dirname, "./another.html")).toString();
  }
});

app.listen(8080);
