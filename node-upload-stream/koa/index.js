const Koa = require('koa');
const router = require('koa-router')();
const koaBody = require('koa-body');
const stream = require('stream');
const fs = require('fs');
const cors = require('koa-cors');
const app = new Koa();

app.use(koaBody({ multipart: true }));
app.use(cors());

app.use(async (ctx, next) => {
    console.log('url==', ctx.url);
    await next();
});

router.post('/files', async (ctx) => {
    if (!ctx.request.files) {
        ctx.body = {
            code: 888,
            msg: '文件不存在'
        }
        return;
    }
    const keys = Object.keys(ctx.request.files);
    console.log(ctx.request.files);
    if (keys.length == 0) {
        ctx.body = {
            code: 888,
            msg: '文件不存在'
        }
        return;
    }
    for (let i = 0; i < keys.length; i++) {
        if (typeof ctx.request.files[keys[i]] !== 'object') {
            ctx.body = {
                code: 999,
                msg: '文件格式错误'
            }
            return;
        }
    }
    fs.ReadStream(ctx.request.files.file.path).pipe(fs.WriteStream(ctx.request.files.file.name))
    ctx.body = {
        msg: '文件上传成功',
        code: 0
    };
  }
);

app.use(router.routes());

app.listen(7787);