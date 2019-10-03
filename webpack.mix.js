const mix = require("laravel-mix");
const env = require("dotenv/config");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react("resources/js/app.js", "public/js").sass(
    "resources/sass/app.scss",
    "public/css"
);

if (mix.inProduction()) {
    mix.version();
} else {
    mix.disableNotifications().browserSync({
        proxy: process.env.APP_URL
    });
}