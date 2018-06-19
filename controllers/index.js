var fn_index = async(ctx,next)=>{
    console.log(99999999);
    ctx.response.body = `<h1>Index</h1>
    <form action="/signin" method="post">
        <p>name:<input name="name"/></p>
        <p>password:<input type="password" name="pwd"/></p>
        <input type="submit" value="提交"/>
    </form>`;
    await next();
   
};
//接收表单数据
var fn_signin = async(ctx,next)=>{
    var
    name = ctx.request.body.name || '',
    password = ctx.request.body.pwd || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '123456') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
   
};
module.exports = {
    'GET /':fn_index,
    'POST /signin':fn_signin
}
