// 先导入fs模块，然后用readdirSync列出文件
const fs = require("fs");
// const koa = require("koa");
// const router = require("koa-router")();
// const bodyparser = require("koa-bodyparser");
// const app = new koa();

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            console.log(path,"path");
            console.log(mapping[url],"mapping[url]");
            
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}
function addControllers(router,dir) {
    var files = fs.readdirSync(__dirname + '/'+dir);
    
    var js_files = files.filter((f) => {
        return f.endsWith('.js');

    });
    for (var f of js_files) {//遍历controller下的js文件名称
        let mapping = require(__dirname + '/'+dir+'/' + f);
        addMapping(router, mapping); //映射
    }
}
// module.exports = function(dir){
//     var controllers_dir = dir || "controllers";
//     var router = require("koa-router")();
//     return addControllers(router,controllers_dir);
// }
module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();
        // bodypareser = require('koa-bodyparser');
    addControllers(router, controllers_dir);
    console.log(router.routes(),"router.routes()");
    
    return router.routes();
};
/* // 这里可以用sync是因为启动时只运行一次，不存在性能问题:
var files = fs.readdirSync(__dirname + '/controllers');

// 过滤出.js文件:
var js_files = files.filter((f)=>{
    return f.endsWith('.js');
});
console.log(__dirname,',"__dirname"');
// 处理每个js文件:
for (var f of js_files) {
    console.log(`process controller: ${f}...`);
    // 导入js文件:
    let mapping = require(__dirname + '/controllers/' + f);
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            // 如果url类似"GET xxx":
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            // 如果url类似"POST xxx":
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            // 无效的URL:
            console.log(`invalid URL: ${url}`);
        }
    }
}
 */
/* 
addControllers(router);
// add router middleware:
// koa-bodyparser必须在router之前被注册到app对象上。
app.use(bodyparser());
app.use(router.routes());
app.listen(8000);
console.log("Server is running at 8000"); */

