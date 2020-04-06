const Koa = require('koa');
const axios = require('axios');
const router = require('koa-router')();
const app = new Koa();

router.get('/v1/getSuperList', async (ctx) => {
    const result = await axios.get('http://127.0.0.1:3000/v1/getList');
    console.log(result);
    ctx.body = {
        data: result.data.data.map(item => ({...item, github: 'hua1995116'})),
        msg: 'success',
        errno: 0
    }
});

app.use(router.routes());

app.listen(3001);