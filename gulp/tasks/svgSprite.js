import svgSpite from "gulp-svg-sprite";

export const svgicons = () => {
    return app.gulp.src(app.path.src.svgicons)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "SVG",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(svgSpite({
        mode: {
          stack: {
            sprite: "../icons/icons.svg",
            example: app.isDev,
          }
        }
      }))
      .pipe(app.gulp.dest(app.path.build.images))
  };
  