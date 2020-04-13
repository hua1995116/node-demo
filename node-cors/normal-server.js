const Koa = require('koa');
const router = require('koa-router')();
const koaBody = require('koa-body');
const fs = require('fs');
const app = new Koa();
const token = 'dwqwqe1231';

app.use(async (ctx, next) => {
    console.log(ctx.path);
    if (ctx.path === '/api/login') {
        await next();
        return;
    }
    const cookies = ctx.cookies.get('token');
    console.log(cookies);
    if (cookies && cookies === token) {
        await next();
        return;
    }
    ctx.body = {
        code: 401,
        msg: '权限错误',
    }
    return;
})

// app.use(cors());
app.use(koaBody({ multipart: true }));

router.get('/api/corslist', async (ctx) => {
    ctx.body = {
        data: [{name: '秋风的笔记'}]
    }
})

router.post('/api/login', async (ctx) => {
    ctx.cookies.set('token', token, {
        expires: new Date(+new Date() + 1000 * 60 * 60 * 24 * 7),
    })
    ctx.body = {
        msg: '成功',
        code: 0
    };
  }
);

app.use(router.routes());

app.listen(8080);