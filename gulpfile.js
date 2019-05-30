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
							   '!./src/less/mixins.less']
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
						exclude: '/node_modules/'
					}
				]
			},
			mode: isDev ? 'development' : 'production',
			devtool: isDev ? 'eval-sourcemap' : 'none'
		};
		
var favicons = require('favicons'),
    source = './src/logo.png',                     // Source image(s). `string`, `buffer` or array of `string`
    configuration = {          
        path: "/",                                // Path for overriding default icons path. `string`
        appName: null,                            // Your application's name. `string`
        appShortName: null,                       // Your application's short_name. `string`. Optional. If not set, appName will be used
        appDescription: null,                     // Your application's description. `string`
        developerName: null,                      // Your (or your developer's) name. `string`
        developerURL: null,                       // Your (or your developer's) URL. `string`
        dir: "auto",                              // Primary text direction for name, short_name, and description
        lang: "uk-UA",                            // Primary language for name and short_name
        background: "#fff",                       // Background colour for flattened icons. `string`
        theme_color: "#fff",                      // Theme color user for example in Android's task switcher. `string`
        appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
        display: "standalone",                    // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
        orientation: "any",                       // Default orientation: "any", "natural", "portrait" or "landscape". `string`
        scope: "/",                               // set of URLs that the browser considers within your app
        start_url: "/?homescreen=1",              // Start URL when launching the application from a device. `string`
        version: "1.0",                           // Your application's version string. `string`
        logging: false,                           // Print logs to console? `boolean`
        pixel_art: false,                         // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
        loadManifestWithCredentials: false,       // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
        icons: {
            // Platform Options:
            // - offset - offset in percentage
            // - background:
            //   * false - use default
            //   * true - force use default, e.g. set background for Android icons
            //   * color - set background for the specified icons
            //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
            //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
            //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
            //
            android: true,              // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            appleStartup: true,         // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            coast: true,                // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            favicons: true,             // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            firefox: true,              // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            windows: true,              // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            yandex: true                // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        }
    },
    callback = function (error, response) {
        if (error) {
            console.log(error.message); // Error description e.g. "An unknown error has occurred"
            return;
        }
        console.log(response.images);   // Array of { name: string, contents: <buffer> }
        console.log(response.files);    // Array of { name: string, contents: <string> }
        console.log(response.html);     // Array of strings (html elements)
    };

favicons(source, configuration, callback);

var favicons = require("favicons").stream,
    log = require("fancy-log");

gulp.task("favicon", function () {
    return gulp.src("./src/logo.png").pipe(favicons({
        background: "#020307",
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
				'!'+path.src.less.srcdir+'smart-grid.less'])
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