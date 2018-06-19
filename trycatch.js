const Koa = require("koa");
const app = new Koa();
/* 4.3 处理错误的中间件
为了方便处理错误，最好使用try...catch将其捕获。但是，为每个中间件都写try...catch太麻烦，我们可以让最外层的中间件，负责所有中间件的错误处理。 */
const hanlder = async(ctx,next)=>{
    try {
        await next();
    } catch (err) {
        
        ctx.response.status = err.status || err.statusCode || 500;
        ctx.response.body = {
            message:err.message,
            // error:err,
            // request:{request:ctx.request},
        }
         
       
    }
}

const main = ctx=>{
    ctx.throw(500);
    // ctx.response.status = 404;
}
// app.use(hanlder);
app.use(main);
/* 4.4 error 事件的监听
运行过程中一旦出错，Koa 会触发一个error事件。监听这个事件，也可以处理错误。 */
app.on('error',(err,ctx)=>{
    console.log(err,"err");
});


app.listen(8000);
console.log("server is runing at 8000");
