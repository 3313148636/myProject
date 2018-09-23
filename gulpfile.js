let gulp = require("gulp");//引入gulp模块
let minifyJS = require("gulp-babel-minify");//引入编译压缩js模块
let minifyCSS = require("gulp-clean-css");//引入压缩css模块
let connect = require("gulp-connect");
let sass = require("gulp-sass");
var Proxy = require('gulp-connect-proxy');
//创建任务
gulp.task("build",()=>{

    //压缩js并复制到dist文件夹
    gulp.src("./src/**/*.js")//读取js
    .pipe(minifyJS())//编译压缩处理
    .pipe(gulp.dest("./dist"))//复制到制定文件夹

    //压缩css并复制到dist文件夹
    gulp.src("./src/**/*.css")//读取css
    .pipe(minifyCSS())//压缩处理
    .pipe(gulp.dest("./dist"))//复制到制定文件夹

    gulp.src("./src/**/*.scss")//读取scss
    .pipe(sass({
        outputStyle : "expanded"
    })).on('error',sass.logError)
    //.pipe(minifyCSS())//压缩处理
    .pipe(gulp.dest("./dist"))//复制到制定文件夹

    //复制HTML文件到dist文件夹
    gulp.src("./src/**/*.html")//读取html文件
    .pipe(gulp.dest("./dist"))//复制到制定文件夹
})

gulp.task("refreshHtml",()=>{
    gulp.src("./src/**/*.html")
    .pipe(gulp.dest("./dist"))
    .pipe(connect.reload());
})

gulp.task("refreshCss",()=>{
    gulp.src("./src/**/*.css")
    .pipe(minifyCSS())
    .pipe(gulp.dest("./dist"))
})

gulp.task("refreshScss",()=>{
    gulp.src("./src/**/*.scss")
    .pipe(sass({
        outputStyle : "expanded"
    })).on('error',sass.logError)
    //.pipe(minifyCSS())
    .pipe(gulp.dest("./dist"))
})

gulp.task("refreshJs",()=>{
    gulp.src("./src/**/*.js")
    .pipe(minifyJS())
    .pipe(gulp.dest("./dist"))
})

gulp.task("server",()=>{
    connect.server({
        root : "dist",
        port : 8080,
        livereload : true,
        middleware: function (connect, opt) {
            opt.route = '/proxy';
            var proxy = new Proxy(opt);
            return [proxy];
          }
    })

    gulp.watch("./src/**/*.html",["refreshHtml"]);
    gulp.watch("./src/**/*.css",["refreshCss","refreshHtml"]);
    gulp.watch("./src/**/*.scss",["refreshScss","refreshHtml"]);
    gulp.watch("./src/**/*.js",["refreshJs","refreshHtml"]);
})