// tested with version node v16.16.0

const fs = require("fs");

// cross checks all scsss files in src with imported scss files in src/tachyons.scss
importCheck();

function importCheck() {
  const scssFiles = fs.readdirSync("scss").filter((file) =>
    /^_.+\.scss$/.test(file)
  ).map((scss) => scss.replace(/_([\w-]+).scss/, '$1'));

  const tachyonsScss = fs.readFileSync("scss/tachyons-field.scss");
  const errors = scssFiles.filter((scss) => {
    const re = new RegExp("import.*" + scss, "g");
    return !re.test(tachyonsScss);
  });

  errors.forEach((scss) => {
    console.error(`@import '${scss}'; missing from /scss/tachyons.scss`);
  });

  if (errors.length > 0) {
    process.exit(1);
  } else {
    console.info("Healthy");
    process.exit(0);
  }
}
