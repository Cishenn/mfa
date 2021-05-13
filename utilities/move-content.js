const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

function main() {
  let [from, to] = process.argv.slice(2);

  if (from === undefined) {
    from = '**/*.md';
  }
  if (to == undefined) {
    to = 'source/_posts';
  }

  glob.sync(from).forEach((filename) => {
    console.log(`Processing ${chalk.blue(filename)}`);
    const postName = path.basename(filename, path.extname(filename));
    fs.copySync(path.dirname(filename), path.join(to, postName), {
      recursive: true,
    });
    fs.moveSync(path.join(to, postName, path.basename(filename)), path.join(to, path.basename(filename)));
  });
  console.log('Completed');
}

main();
