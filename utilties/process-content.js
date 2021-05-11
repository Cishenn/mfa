const fs = require('fs');
const glob = require('glob');
const chalk = require('chalk');

function main() {
  const patterns = process.argv.slice(2);
  if (patterns.length === 0) {
    patterns.push('**/*.md');
  }

  const filenames = new Set();
  patterns.forEach(pattern => glob.sync(pattern).forEach(filename => filenames.add(filename)));
  const filenameList = Array.from(filenames.values());

  for (let i = 0; i < filenameList.length; ++i) {
    const filename = filenameList[i];
    const progress = `[ ${Math.floor(i / filenameList.length * 100)}%]`;
    console.log(`${progress} Processing ${chalk.blue(filename)}`);
    let content = fs.readFileSync(filename).toString();
    const match = content.match(/(---\r?\ntitle:.*)/s);
    if (!match) {
      console.log(chalk.red`${progress} Error: cannot find valid header`);
    } else {
      content = match[1];
      fs.writeFileSync(filename, content);
    }
  }

  console.log(`[100%] Completed`);
}

main();
