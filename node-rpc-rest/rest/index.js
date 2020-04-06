const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

router.get('/v1/getList', async (ctx) => {
    ctx.body = {
        data: [{ user: 'qiufeng', age: 18 }],
        msg: 'success',
        errno: 0
    }
});

app.use(router.routes());

app.listen(3000);