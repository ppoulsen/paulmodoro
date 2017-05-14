const spawn = require('cross-spawn');
const path = require('path');

const s = `\\${path.sep}`;
const pattern = process.argv[2] === 'e2e'
  ? `test${s}e2e${s}.+\\.spec\\.(js|jsx)?`
  : `test${s}(?!e2e${s})[^${s}]+${s}.+\\.spec\\.(js|jsx)?$`;

spawn.sync(path.normalize('./node_modules/.bin/jest'), [pattern], { stdio: 'inherit' });
