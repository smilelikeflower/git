/* 2.2 koa-route 模块
原生路由用起来不太方便，我们可以使用封装好的koa-route模块。 */
const Koa = require("koa");
const app = new Koa();
const route = require("koa-route");
const fs = require("fs");

const template=ctx=>{
    ctx.response.type="html";
    ctx.response.body=fs.createReadStream('./demos/template.html');
}

const main=ctx=>{
    ctx.response.type="html";
    ctx.response.body="这就是index页面";
}

app.use(route.get('/',main));
app.use(route.get('/template',template));

app.listen(8000);
console.log("8000 is ok");








