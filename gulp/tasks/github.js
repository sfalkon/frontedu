import ghPages from "gulp-gh-pages";
import file from "gulp-file";

import { HOSTNAME } from "../config/github.js"

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
    .pipe(file(`CNAME`, HOSTNAME))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(ghPages());
}
