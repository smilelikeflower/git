const koa = require("koa");
const app = new koa();
const bodyparser = require("koa-bodyparser");//注册post request请求表单参数解析
const router = require("koa-router")();
const controller = require("./controller");
// console.log(controller,"'controller'");
// console.log(bodyparser,"bodyparser");


app.use(bodyparser()); //需放到最前面，在控制器和router.routes()之前注册。
app.use(router.routes());//路由
app.use(controller());

app.listen(8000);
console.log("server is runing at 8000");
