const Koa = require("koa");
const fs = require("fs");
const path = require("path");
const app = new Koa();

app.use(async (ctx, next) => {
    console.log(ctx.path);
  if (ctx.method === "GET" && ctx.path === "/hash/c.html") {
    ctx.body = fs.readFileSync(path.join(__dirname, "./c.html")).toString();
  }
});

app.listen(8080);
