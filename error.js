const Koa = require("koa");
const compose = require("koa-compose");
const app = new Koa();


/* 4.1 500 错误
如果代码运行过程中发生错误，我们需要把错误信息返回给用户。HTTP 协定约定这时要返回500状态码。
Koa 提供了ctx.throw()方法，用来抛出错误，ctx.throw(500)就是抛出500错误。 */
const serveError=function(ctx){
    ctx.throw(500);
}
/* 4.2 404错误
如果将ctx.response.status设置成404，就相当于ctx.throw(404)，返回404错误。 */
const notfund=function(ctx){
    // ctx.throw(404);
    ctx.response.status=404;
    ctx.response.body="Page Not Fund";
}

const middlewares = compose([notfund,serveError]);//一旦报错了程序就会终止执行后面的函数
app.use(middlewares);
app.listen(8000);
console.log("server is runing at 8000");