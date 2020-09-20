const Koa = require('koa');
const router = require('koa-router')();
const koaBody = require('koa-body');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const serve = require('koa-static');
const mount = require('koa-mount');
const app = new Koa();

function getRange(range) {
    var match = /bytes=([0-9]*)-([0-9]*)/.exec(range);
    const requestRange = {};
    if (match) {
        if (match[1]) requestRange.start = Number(match[1]);
        if (match[2]) requestRange.end = Number(match[2]);
    }
    return requestRange;
}

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Max-Age', 600);
    ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.set('Access-Control-Request-Method', 'PUT,POST,GET,DELETE,OPTIONS')
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, range')
    if (ctx.method === 'OPTIONS') {
        ctx.status = 204;
        return;
    }
    await next();
});


app.use(mount('/static', serve('static')));

app.use(mount('/example', serve('example')));

app.use(koaBody({ multipart: true }));

router.get('/api/download', async (ctx) => {
    const { filename } = ctx.query;
    const fStats = fs.statSync(path.join(__dirname, './static/', filename));
    ctx.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename=${filename}`,
        'Content-Length': fStats.size
    });
    ctx.body = fs.readFileSync(path.join(__dirname, './static/', filename));
})

router.get('/api/downloadUrl', async (ctx) => {
    const { filename } = ctx.query;
    ctx.body = {
        code: 0,
        data: {
            url: 'http://localhost:8888/static/1597375650384.jpg',
        }
    }
})

router.head('/api/rangeFile', async (ctx) => {
    console.log(111);
    const { filename } = ctx.query;
    const stats = fs.statSync(path.join(__dirname, './static/', filename));
    console.log(stats.size);
    ctx.set('Content-Length', stats.size);
    ctx.length = stats.size;
    ctx.status = 200;
    return;
})

router.get('/api/rangeFile', async(ctx) => {
    const { filename } = ctx.query;
    const { size } = fs.statSync(path.join(__dirname, './static/', filename));
    const range = ctx.headers['range'];
    if (!range) {
        ctx.set('Accept-Ranges', 'bytes');
        ctx.body = fs.readFileSync(path.join(__dirname, './static/', filename));
        return;
    }
    const { start, end } = getRange(range);
    if (start >= size || end >= size) {
        ctx.response.status = 416;
        ctx.body = '';
        return;
    }
    ctx.response.status = 206;
    ctx.set('Accept-Ranges', 'bytes');
    ctx.set('Content-Range', `bytes ${start}-${end ? end : size - 1}/${size}`);
    ctx.body = fs.createReadStream(path.join(__dirname, './static/', filename), { start, end });
})

router.get('/api/base64', async (ctx) => {
    const { filename } = ctx.query;
    const content = fs.readFileSync(path.join(__dirname, './static/', filename));
    const fStats = fs.statSync(path.join(__dirname, './static/', filename));
    console.log(fStats);
    ctx.body = {
        code: 0,
        data: {
            base64: content.toString('base64'),
            filename,
            type: mime.getType(filename)
        }
    }
})


router.get('/api/corslist', async (ctx) => {
    ctx.body = {
        data: [{name: '秋风的笔记'}]
    }
})



app.use(router.routes());

app.listen(8888);