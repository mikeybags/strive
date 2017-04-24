const Imagemin = require('imagemin');
//always run from project root directory
new Imagemin()
  .src('./lib/emoji/*.png')
  .dest('./lib/optimized-emoji')
  .use(Imagemin.optipng({optimizationLevel: 7}))
  .run((err, files) => {
    console.log("****EMOJI OPTIMIZED***")
  });