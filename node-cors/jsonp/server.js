const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

app.use(async (ctx, next) => {
    if (ctx.path === '/api/jsonp') {
        const { cb, msg } = ctx.query;
        ctx.body = `${cb}(${JSON.stringify({msg})})`
        return;
    }
})

app.listen(8080);