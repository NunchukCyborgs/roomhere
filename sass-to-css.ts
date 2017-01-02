const sass = require('node-sass');
const fs = require('fs');

function compile(file) {
  const outFile = file.replace('.scss', '.css');
  const result = sass.renderSync({
    file: file,
    outputStyle: 'compressed',
    outFile: outFile,
    sourceMap: true
  })
  fs.writeFileSync(outFile, result.css);
}
module.exports = compile; 