// Copy plugin derived from [hexo-generator-copy](https://github.com/niahoo/hexo-generator-copy)

// Accepts following configurations:
//   static_dir: string, directory containing files for copying, default 'static'
//   ignore_hidden_files: boolean, whether to ignore directories and files beginning with '.',
//                        default true

'use strict';

var path = require('path');
var fs = require('fs');

function generator(locals) {

  var config = hexo.config;
  var base_dir = hexo.base_dir;
  var route = hexo.route;

  var static_dir = config.static_dir || 'static';
  var ignore_hidden_files = !!config.ignore_hidden_files;

  var source_dir = path.join(base_dir, static_dir);

  function read(root) {
    var files = fs.readdirSync(root);
    files.forEach(function (file) {
      if (ignore_hidden_files && file[0] === '.') {
        return;
      }
      var filepath = path.join(root, file);
      var stats = fs.statSync(filepath);
      if (stats.isDirectory()) {
        read(filepath);
      } else {
        route.set(path.relative(source_dir, filepath), fs.readFileSync(filepath));
      }
    });
  }
  read(source_dir);
};

hexo.extend.generator.register('static', generator);
