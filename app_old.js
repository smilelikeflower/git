// 安装koa包>npm install koa --save-dev
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：

app.use(async (ctx,next)=>{
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    console.log(`${ctx.method} ${ctx.url}`);
    
    const start = new Date().getTime();
    await next();//await next()来调用下一个async函数,没有调用则后面的异步函数将不会执行。
    const time = new Date().getTime()-start;
    
    console.log(`间隔时间:${time}ms`);
    console.log(111);
    
    
    
});
app.use(async (ctx, next) => {
    
    // ctx.response.type = 'text/html';
    // ctx.response.body = '<h1>Hello, koa2!4444</h1>';
    await next();
    ctx.type = 'text/html';
    ctx.body = '<h1>Hello, koa2!4444</h1>';
    console.log(333);
    
    
});
app.use(async (ctx, next) => {
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!1111</h1>';
    console.log(222);
    await next();
});



  
// 在端口3000监听:
app.listen(8000);
console.log('app started at port 8000...');