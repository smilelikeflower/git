const Koa = require("koa");
const KoaBody = require("koa-body");
const fs= require("fs");
const route= require("koa-route");
const app = new Koa();
/* 5.2 表单
Web 应用离不开处理表单。本质上，表单就是 POST 方法发送到服务器的键值对。koa-body模块可以用来从 POST 请求的数据体里面提取键值对。 */
const main = ctx=>{
    ctx.response.type = "html";
    ctx.response.body = fs.createReadStream('./demos/template.html');
}
const login = async function(ctx){
    const body = ctx.request.body;
    // if(!body.name){
    //     ctx.throw(404,'name is required!');
    // }
    if(!body.name) ctx.throw(404,'name is required!');
    
    if(!body.password) ctx.throw(404,'password is required!');
        
    ctx.body = {name:body.name,password:body.password}
    // ctx.response.body = {
    //     name:body.name,
    //     password:body.password,
    //     // 'name':body.name,
    //     // 'password':body.password,
    // }
}

app.use(KoaBody());
app.use(route.get('/',main));
app.use(route.post('/login',login));
app.listen(8000);
console.log("server is 8000");
