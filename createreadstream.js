/* 1.4 网页模板
实际开发中，返回给用户的网页往往都写成模板文件。我们可以让 Koa 先读取模板文件，然后将这个模板返回给用户。请看下面的例子 */
// createReadStream(fpath) 读取文件路径（一般在异步操作中常出现）
// extname(fpath) 获取文件的扩展名（png/jpg/html）
// extname = path.extname;
// fs.stat(fpath,function(err,stat){}); 获取文件的大小，创建信息stat(创建时间，修改时间等)
// new Promise(function(resolve,reject){}) 异步编程的一种解决办法，reject(err) resolve(stat) 拒绝错误，处理文件
const koa = require("koa");
const fs = require("fs");
const app = new koa();
const path = require("path");
const extname = path.extname;
const log = console.log;

// const main=ctx=>{
//     ctx.response.type="html";
//     ctx.response.body = fs.createReadStream("./demos/template.html");
// }

const readPdf=(async function(ctx){
    const fpath = path.join(__dirname,ctx.path);
    const fstat = await stat(fpath);
    log("fstat=====",fstat);
    if(fstat.isFile()){
        ctx.type = extname(fpath);
        ctx.body = fs.createReadStream(fpath);
    }
    log(555)
});

// app.use(main);
app.use(readPdf);
app.listen(3000);
log("server is running at 3000 port!");

function stat(fpath){
    return new Promise(function(resolve,reject){
        fs.stat(fpath,function(err,stat){
            if(err){
                reject(err);
            }else{
                resolve(stat);
            }
        });
    });
}




// function stat(file) {
//     return new Promise(function(resolve, reject) {
//       fs.stat(file, function(err, stat) {
//         if (err) {
//           reject(err);
//         } else {
//             log("stat======",stat);
//           resolve(stat);
//         }
        
//         log("isDirectory=======",stat.isDirectory());
//         log("isFile=======",stat.isFile());
//         if(stat.isFile()){
//             log("创建时间========",stat.birthtime);
//             log("修改时间========",stat.mtime);
//         }
//       });
//     });
// }
