/* 三、中间件
3.1 Logger 功能
Koa 的最大特色，也是最重要的一个设计，就是中间件（middleware）。为了理解中间件，我们先看一下 Logger （打印日志）功能的实现。 

像上面代码中的logger函数就叫做"中间件"（middleware），因为它处在 HTTP Request 和 HTTP Response 中间，用来实现某种中间功能。app.use()用来加载中间件。

基本上，Koa 所有的功能都是通过中间件实现的，前面例子里面的main也是中间件。每个中间件默认接受两个参数，

第一个参数是 Context 对象，第二个参数是next函数。只要调用next函数，就可以把执行权转交给下一个中间件。

 */

// 注意：
// 如果中间件内部没有调用next函数，那么执行权就不会传递下去。

const Koa = require("koa");
const app = new Koa();
const fs = require("fs.promised");
const compose = require("koa-compose");

const main=(ctx,next)=>{
    console.log("main");
     ctx.response.body='index page';
    //没有next()的中间件，不能执行后面的中间件。
    next();
}

const logger=(ctx,next)=>{
    next();
    // console.log("time："+new Date()+",method:"+ctx.request.method+",url"+ctx.request.url);
    // console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    console.log("logger");
    ctx.response.body = `${new Date()} ${ctx.request.method} ${ctx.request.url}`;
}

/* 3.3 中间件栈
多个中间件会形成一个栈结构（middle stack），以"先进后出"（first-in-last-out）的顺序执行。 */
const one = (ctx, next) => {
    console.log('>> one');
    next();
    console.log('<< one');
  }
  
  const two = (ctx, next) => {
    console.log('>> two');
    next(); 
    console.log('<< two');
  }
  
  const three = (ctx, next) => {
    console.log('>> three');
    next();
    console.log('<< three');
  }
/* 
  3.4 异步中间件
迄今为止，所有例子的中间件都是同步的，不包含异步操作。如果有异步操作（比如读取数据库），中间件就必须写成 async 函数。 
下面代码中，fs.readFile是一个异步操作，必须写成await fs.readFile()，然后中间件必须写成 async 函数。*/
// const yibu=async(ctx,next)=>{
//     ctx.response.body = await fs.readFile('./demos/template.html','utf-8');
// }
const yibu= async function(ctx,next){
    next();
    console.log("yibu");
    ctx.response.type = "html";
    ctx.response.body = await fs.readFile('./demos/template.html','utf-8');   
}

/* 3.5 中间件的合成
koa-compose模块可以将多个中间件合成为一个。 */
const middlewares = compose([yibu,logger]);
app.use(middlewares);
// app.use(yibu);
// app.use(one);
// app.use(two);
// app.use(three);
// app.use(logger);
// app.use(main);//使用每个中间件都要先注册这个中间件。
app.listen(8000);
console.log("server is runing at 8000");