const Koa = require("koa");
const KoaBody = require("koa-body");
const fs= require("fs");
const route= require("koa-route");
const os= require("os");
const path= require("path");

const app = new Koa();
/* 5.2 表单
Web 应用离不开处理表单。本质上，表单就是 POST 方法发送到服务器的键值对。koa-body模块可以用来从 POST 请求的数据体里面提取键值对。 */
const main = ctx=>{
    
    ctx.response.type = "html";
    ctx.response.body = fs.createReadStream('./demos/template.html');
}
const login = async(ctx)=>{
    const tmpdir = os.tmpdir();
    const filePaths = [];
    const newfile = {};
    newfile.name = ctx.request.body.files;
    newfile.path = path.join(__dirname);
    console.log(newfile.path,"path++++++++++++++++++++++++");
    
    console.log(typeof(fff),"fff================");
    
    const files = ctx.request.body.files || {};

    
}


app.use(KoaBody());
app.use(route.get('/',main));
app.use(route.post('/login',login));
app.listen(8000);
console.log("server is 8000");


