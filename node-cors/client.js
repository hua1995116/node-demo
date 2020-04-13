const Koa = require("koa");
const fs = require("fs");
const app = new Koa();

app.use(async (ctx, next) => {
  if (ctx.method === "GET" && ctx.path === "/") {
    ctx.body = fs.readFileSync("./index.html").toString();
  }

  if (ctx.method === "GET" && ctx.path === "/charles") {
    ctx.body = fs.readFileSync("./charles/index.html").toString();
  }

  if (ctx.method === "GET" && ctx.path === "/nginx") {
    ctx.body = fs.readFileSync("./nginx/index.html").toString();
  }

  if (ctx.method === "GET" && ctx.path === "/jsonp") {
    ctx.body = fs.readFileSync("./jsonp/index.html").toString();
  }

  if (ctx.method === "GET" && ctx.path === "/websocket") {
    ctx.body = fs.readFileSync("./websocket/index.html").toString();
  }

  if (ctx.method === "GET" && ctx.path === "/postMessage") {
    ctx.body = fs.readFileSync("./postMessage/index.html").toString();
  }
    
  if (ctx.method === "GET" && ctx.path === "/hash/a.html") {
    ctx.body = fs.readFileSync("./hash/a.html").toString();
  }
  if (ctx.method === "GET" && ctx.path === "/hash/b.html") {
    ctx.body = fs.readFileSync("./hash/b.html").toString();
  }
    
  if (ctx.method === "GET" && ctx.path === "/name/a.html") {
    ctx.body = fs.readFileSync("./name/a.html").toString();
  }
  if (ctx.method === "GET" && ctx.path === "/name/b.html") {
    ctx.body = fs.readFileSync("./name/b.html").toString();
  }

    
  if (ctx.method === "GET" && ctx.path === "/cors-any") {
    ctx.body = fs.readFileSync("./cors-any/index.html").toString();
  }
});

app.listen(8000);
