var gulp        = require('gulp'), // Подключаем Gulp
	sass        = require('gulp-sass'); //Подключаем Sass пакет
    browserSync = require('browser-sync'),
    del         = require('del'); // Подключаем библиотеку для удаления файлов и папок

    // gulp.task('common-js', function() {
    //     return gulp.src([
    //         'app/js/common.js',
    //         ])
    //     // .pipe(concat('common.min.js'))
    //     // .pipe(uglify())
    //     .pipe(gulp.dest('app/js'))
    //     .pipe(browserSync.reload({stream: true}));
    // });
    
  

gulp.task('sass', function(){ // Создаем таск "sass"
	return gulp.src('app/sass/*.+(sass|scss)') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function(done) {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
        port: 3000,
        notify: false,
        // tunnel: true,
        // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
    });
    done();
});

// gulp.task('libs-js', function() {
//     return gulp.src([
//         '.app/libs/bootstrap/dist/js/bootstrap.min.js'])
//     .pipe(gulp.dest('app/js'))
//     // .pipe(browserSync.reload({stream: true}))
// });

//libs-js' 'common-js'

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	// .pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});


gulp.task('clean',  async function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('prebuild', async function() {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'app/css/main.css',
		// 'app/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	// var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
	// .pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));

});


gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.+(sass|scss)', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('code'));
	// gulp.watch(['libs/**/*.js'], gulp.parallel('libs-js'));
	// gulp.watch(['app/js/common.js'], gulp.parallel('common-js'));
	gulp.watch('app/*.html', browserSync.reload);
});
// 'libs-js'
gulp.task('default', gulp.parallel('sass','browser-sync', 'watch'));
//libs-js' 'common-js'

gulp.task('build', gulp.parallel('prebuild','clean', 'imagemin','sass'));
