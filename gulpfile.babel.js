import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('controllers', () =>
   gulp.src('./controllers/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/controllers')),
);

gulp.task('models', () =>
   gulp.src('./models/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/models')),
);


gulp.task('default', ['controllers', 'models']);
