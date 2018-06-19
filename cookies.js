const Koa = require("koa");
const app = new Koa();

const main = function(ctx){
    var num = Number(ctx.cookies.get('view')||0)+1;
    ctx.cookies.set('view',num);
    ctx.response.body = 'view:'+num;
}
app.use(main);
app.listen(8000);
console.log("server is 8000");
