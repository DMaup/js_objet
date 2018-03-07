var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var browserify = require("gulp-browserify");
var minifier = require("gulp-minifier");
var path = "maps";
var mainjs = "main";

gulp.task("prod", ["browserify"], function(){

    return gulp.src( "./" + path + "/dist/**.*" )
        .pipe( minifier({
            minify: true,
            minifyCSS: true,
            minifyJS: true,
            minifyHTML: {
                collapseWhitespace: true,
                conservativeCollapse: false
            }
        }) )
        .pipe(gulp.dest("./" + path + "/dist"));

});

gulp.task("browserify", function(){

    return gulp.src( "./" + path + "/js/" + mainjs + ".js", { read: false } )
        .pipe( browserify({
            debug: true
        }) )
        .pipe( gulp.dest("./" + path + "/dist") );

});

gulp.task("serve", ["browserify"], function(){

    browserSync.init({
        server: "./" + path + "/dist"
    });

    //Appelle la tâche browserify lors d'un changement dans les fichiers js
    gulp.watch("./" + path + "/js/**/**.js", ["browserify"] );

    //Recharge le navigateur quand dist est mis à jour
    gulp.watch( "./" + path + "/dist/**.*" ).on("change", browserSync.reload);

});