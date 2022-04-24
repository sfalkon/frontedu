import ghPages from "gulp-gh-pages";

export const github = () => {
  return app.gulp.src(app.path.src.github)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "GitHub",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(ghPages());
};