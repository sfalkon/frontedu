import gulp from "gulp";
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js'

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins,
}

import { copy } from "./gulp/tasks/copy.js";
import {clean} from "./gulp/tasks/clean.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgicons } from "./gulp/tasks/svgSprite.js";
import { github } from "./gulp/tasks/github.js";

function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)

const mainTask = gulp.parallel(copy, html, scss, js, images);
const prepTask = gulp.parallel(svgicons, fonts);
const debugTask = gulp.parallel(watcher, server);
const dev = gulp.series(clean, mainTask, debugTask);
const build = gulp.series(clean, prepTask, mainTask);
const deployGH = gulp.series(build, github);

export { svgicons };
export { fonts };
export { dev };
export { build };
export { deployGH };

gulp.task('default', dev);
