const Koa = require("koa"),
app = new Koa(),
log = console.log,
router = require("koa-router")(),
koaBody = require("koa-body"),
port = process.env.PORT || 3000,
host = process.env.HOST || 'http://localhost';

router.post('/post/users',koaBody(),(ctx)=>{
  const body = ctx.request.body;
  // log('body',body);
  // log();
  // log(JSON.stringify(body));
  log(JSON.stringify(body,null,3));//打印在后台中
  ctx.body = JSON.stringify(body,null,2);//打印在浏览器中
});

router.get('/',(ctx)=>{
  ctx.set({'Content-type':'text/html'});
  ctx.body = `
    <!document html>
    <html>
      <body>
        <form action="/post/upload" method="post" enctype="multipart/form-data">
          <input type="text" name="username" placeholder="username"/><br/>
          <input type="text" name="title" placeholder="title of file"/><br/>
          <input type="file" name="uploads" multiple="multiple"/><br/>
          <button type="submit">Upload</button>
        </form>
      </body>
    </html>
  `;
});

router.post('/post/upload',koaBody(),(ctx)=>{
  
});




app.use(router.routes());
app.listen(port);
log('Visit %s:%s/ in browser.',host,port);
log('Test with executing this commands:');
log('curl -i %s:%s/post/users/ -d "name=admin"',host,port);
log('curl -i %s:%s/post/upload/ -F ');
log('Press CTRL+C to stop...');