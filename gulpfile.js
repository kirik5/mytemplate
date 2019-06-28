const	gulp = require('gulp'),
        del = require('del'),
        less = require('gulp-less'),
		rename = require('gulp-rename'),
		browsersync = require('browser-sync').create(),
		webpack = require('webpack-stream');
		
		
		//autoprefixer = require('gulp-autoprefixer'),
        //gcmq = require('gulp-group-css-media-queries'),
        //sourcemaps = require('gulp-sourcemaps'),
        //gucleancss = require('gulp-clean-css'),
        //pngquant = require('imagemin-pngquant'),
		//uglify = require('gulp-uglify'),
        //imagemin = require('gulp-imagemin');
			
const	path = {
            dist: {
                css: './dist/css/',
                fonts: './dist/fonts/',
				img: './dist/img/',
				js: './dist/js/',
				php: './dist/php/',
				html: './dist/',
            },
            src: {
                css: {
                    srcdir: './src/css/',
					srcfiles: './src/css/**/*.css'
                },
				fonts: {
                    srcfile: './src/fonts/**/*.*',
                    srcdir: './src/fonts/'
                },
				img: {
                    srcfile: './src/img/**/*.*',
                    srcdir: './src/img/'
                },
				js: {
                    srcfile: './src/js/**/*.js',
                    srcdir: './src/js/'
                },
				js_src: {
					srcfile: './src/js_src/**/*.js',
					srcdir: './src/js_src/'
				},
				less: {
                    srcdir: './src/less/',
					srcfile: './src/less/**/*.less',
                    srcfiles: ['./src/less/**/*.less',
					           '!./src/less/smart-grid.less',
							   '!./src/less/settings.less',
							   '!./src/less/mixins.less',
							   '!./src/less/fonts.less']
                },
				php: {
					srcfile: './src/php/**/*.php',
					srcdir: './src/php/'
				},
				html: {
                    srcfile: './src/*.html',
                    srcdir: './src/'
                }
            }
        };	
		
const	isDev = true;
		
const	webConfig = {
			entry: {
				main: './src/js_src/main.js'
			},
			output: {
				filename: '[name].js'
			},
			module: {
				rules: [
					{
						test: /\.js$/,
						loader: 'babel-loader',
						exclude: /node_modules/
					}
				]
			},
			mode: isDev ? 'development' : 'production',
			devtool: isDev ? 'eval-sourcemap' : 'none'
		};

var favicons = require("favicons").stream,
    log = require("fancy-log");

gulp.task("favicons", function () {
    return gulp.src("./src/logo.png").pipe(favicons({
        path: "favicon/",
        display: "standalone",
        orientation: "portrait",
        html: "index.html",
        pipeHTML: true,
        replace: true
    }))
    .on("error", log)
    .pipe(gulp.dest("./src/img/favicon/"));
});
		
function fdelcss(){
	return del(path.src.css.srcdir+'*');
}
		
function fless(){
	return gulp.src(path.src.less.srcfiles)
		   .pipe(less())
		   .pipe(rename({
			   suffix: '.min'
		   }))
           .pipe(gulp.dest(path.src.css.srcdir));
}

function freload(){
	browsersync.reload();
}

function fdeljs(){
	return del(path.src.js.srcdir+'*');
}

function fscripts(){
    return gulp.src('./src/js_src/main.js')
		   .pipe(webpack(webConfig))
		   .pipe(rename({
			   suffix: '.min'
		   }))
		   .pipe(gulp.dest(path.src.js.srcdir));
}

function fwatch() {
	browsersync.init({
		server: {
			baseDir: path.src.html.srcdir
		}/*,
		proxy: "http://childps.kirik.org.ua" */
	});
	gulp.watch(path.src.html.srcfile).on('change', freload);
    gulp.watch(path.src.less.srcfile).on('change', gulp.series(fdelcss, fless, freload));
	gulp.watch(path.src.js_src.srcfile).on('change', gulp.series(fdeljs, fscripts, freload));
	gulp.watch(path.src.img.srcfile, freload);
    gulp.watch(path.src.fonts.srcfile, freload);
}

//tasks
		
gulp.task('delsrc', function(){
	return del([path.src.css.srcdir+'*',
				path.src.fonts.srcdir+'*',
				path.src.img.srcdir+'*',
				path.src.img.srcdir+'favicon/*',
				path.src.js.srcdir+'*',
				path.src.js_src.srcdir+'*',
				path.src.js_src.srcdir+'libs/*',
				path.src.less.srcdir+'*',
				path.src.less.srcdir+'libs/*',
				path.src.php.srcdir+'*',
				'!'+path.src.img.srcdir+'favicon',
				'!'+path.src.js_src.srcdir+'main.js',
				'!'+path.src.js_src.srcdir+'libs',
				'!'+path.src.less.srcdir+'libs',
				'!'+path.src.less.srcdir+'main.less',
				'!'+path.src.less.srcdir+'mixins.less',
				'!'+path.src.less.srcdir+'settings.less',
				'!'+path.src.less.srcdir+'smart-grid.less',
				'!'+path.src.less.srcdir+'fonts.less'])
});

gulp.task('deldist', function(){
	return del(path.dist.html+'*')
});

gulp.task('awesome', function(){
	return gulp.src('./node_modules/font-awesome/fonts/**/*.*')
	       .pipe(gulp.dest(path.src.fonts.srcdir));
});

gulp.task('less', fless);

gulp.task('scripts',fscripts);

gulp.task('watch', fwatch);

gulp.task('default', gulp.series(gulp.parallel(fless, fscripts), fwatch));