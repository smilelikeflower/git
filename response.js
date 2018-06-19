const koa = require("koa");
const app = new koa();

const main = ctx=>{
    if(ctx.request.accepts('text/html')){
        ctx.response.type="text/html";
        ctx.response.body = "<h1>response text/html页面</h1>";
    }else if(ctx.request.accepts('text')){

        ctx.response.type="text";
        ctx.response.body = "<h1>response text页面</h1>";
    }
    
    /* 2.1 原生路由
网站一般都有多个页面。通过ctx.request.path可以获取用户请求的路径，由此实现简单的路由。 */

    if(ctx.request.path != "/"){
        ctx.response.type = 'html';
        // ctx.response.body = `path:${ctx.request.path}<a href="/">Index page</a>`;
        ctx.response.body = '<a href="/">Index page</a>';
    }else{
        ctx.response.body = `path:${ctx.request.path}this is index page!`;
    }
    // if (ctx.request.accepts('xml')) {
    //     ctx.response.type = 'xml';
    //     ctx.response.body = '<data>Hello World</data>';
    //   } else if (ctx.request.accepts('json')) {
    //     ctx.response.type = 'json';
    //     ctx.response.body = { data: 'Hello World' };
    //   } else if (ctx.request.accepts('html')) {
    //     ctx.response.type = 'html';
    //     ctx.response.body = '<p>Hello World</p>';
    //   } else {
    //     ctx.response.type = 'text';
    //     ctx.response.body = 'Hello World';
    //   }
}
app.use(main);
app.listen(8000);
console.log("server is running at localhost 8000 port");
