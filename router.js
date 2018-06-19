const koa = require("koa");
const router = require("koa-router")();
// npm install koa-bodyparser --save-dev
//post请求通常会发送一个表单，或者JSON，它作为request的body发送，koa-bodyparser解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中
const bodyparser = require("koa-bodyparser");
const app = new koa();

app.use(async(ctx,next)=>{
    console.log(`方式,路径：${ctx.request.method} ${ctx.request.url}`);
    await next();
    
});

// add url-route
router.get('/hello/:name&:age',async(ctx,next)=>{
    var name  = ctx.params.name;
    var age  = ctx.params.age;
    console.log(name,'name');
    console.log(age,'age');
    ctx.response.body = `<h1>你好,name：${name},age：${age}</h1>`;
});
router.get('/',async(ctx,next)=>{
    ctx.response.body = `<h1>这是index页面</h1>`;
    await next();
});


router.get('/',async(ctx,next)=>{
    ctx.response.body = `<h1>Index</h1>
    <form action="/signin" method="post">
        <p>name:<input name="name"/></p>
        <p>password:<input type="password" name="pwd"/></p>
        <input type="submit" value="提交"/>
    </form>`;
    await next();
});
//接收表单数据
router.post('/signin',async(ctx,next)=>{
    var name = ctx.request.body.name || ''; //没有数据则为空
    var pwd = ctx.request.body.pwd || '';
    if(name =='koa' && pwd=='123456'){
        ctx.response.body = `Welcome ${name}`
    }else{
        ctx.response.body = `<h1>Login failed!</h1>
        <a href="/">try again</a>`;
    }
});


// add router middleware:
// koa-bodyparser必须在router之前被注册到app对象上。
app.use(bodyparser());
app.use(router.routes());
app.listen(8000);
console.log("Server is running at 8000");