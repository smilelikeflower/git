const Koa = require("koa");
const koaBody = require("koa-body");
const router = require("koa-router")();
const app = new Koa();


router.get('/login/:name',async(ctx)=>{
    // console.log(222);
    ctx.body = `request body:${ctx.params.name}`;
    // ctx.body = JSON.stringify(ctx.params);
});

router.post('/users',koaBody(),
    (ctx)=>{
        console.log(ctx.request.body);
        ctx.body = JSON.stringify(ctx.request.body);
    }
);
router.get('/users',koaBody(),
    (ctx)=>{
        console.log(ctx.params);
        ctx.body = JSON.stringify(ctx.params);
    }
);
// app.use(koaBody());
app.use(router.routes());

// app.use(ctx=>{
//     ctx.body = `request body:${JSON.stringify(ctx.request.body)}`;
// });
app.listen(3000,()=>{
    console.log("sever is running at 3000");
    console.log('curl -i http://localhost:3000/users -d "name=test"');
    
});
