// tested with version node v16.16.0

const fs = require("fs");

// cross checks all css files in src with imported css files in src/tachyons.css
importCheck();

function importCheck() {
  const cssFiles = fs.readdirSync("src").filter((file) =>
    /^_.+\.css/.test(file)
  ).map((css) => css.replace(".css", ""));
  const tachyonsCss = fs.readFileSync("src/tachyons.css");
  const errors = cssFiles.filter((css) => {
    const re = new RegExp("import.*" + css, "g");
    return !re.test(tachyonsCss);
  });

  errors.forEach((css) => {
    console.error(`@import './${css}'; missing from /src/tachyons.css`);
  });

  if (errors.length > 0) {
    process.exit(1);
  } else {
    console.info("Healthy");
    process.exit(0);
  }
}
