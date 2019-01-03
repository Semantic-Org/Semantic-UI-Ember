/* eslint-env node */
'use strict';

const path = require('path')
const fs = require('fs')
const walkSync = require('walk-sync')

const defaults = {
  import: {
    css: true,
    javascript: true,
    images: true,
    fonts: true
  },
  source: {
    css: 'node_modules/semantic-ui-css',
    javascript: 'node_modules/semantic-ui-css',
    images: 'node_modules/semantic-ui-css/themes/default/assets/images',
    fonts: 'node_modules/semantic-ui-css/themes/default/assets/fonts'
  },
  destination: {
    images: 'assets/themes/default/assets/images',
    fonts: 'assets/themes/default/assets/fonts'
  }
}

const custom = {
  source: {
    css: 'semantic/dist',
    javascript: 'semantic/dist',
    images: 'semantic/dist/themes/default/assets/images',
    fonts: 'semantic/dist/themes/default/assets/fonts'
  }
}

const getDefault = require('./lib/utils/get-default')

const Funnel = require('broccoli-funnel')
const mergeTrees = require('broccoli-merge-trees')
const map = require('broccoli-stew').map

module.exports = {
  name: 'semantic-ui-ember',
  included: function (app) {
    // If the addon has the _findHost() method (in ember-cli >= 2.7.0), we'll just
    // use that. This helps support ember-engines, where we want to find 
    // the 'parent' app
    if (typeof this._findHost === 'function') {
      app = this._findHost();
    }
    let options;
    if (app && app.options['SemanticUI']) {
      options = app.options['SemanticUI']
    } else if (app && app.options['semantic-ui-ember']) {
      options = app.options['semantic-ui-ember']
    } else {
      options = {}
    }

    if (!fs.existsSync(defaults.source.css) && fs.existsSync(custom.source.css)) {
      defaults.source = custom.source
    }

    const importCss = getDefault('import', 'css', [options, defaults])
    if (importCss) {
      const sourceCss = getDefault('source', 'css', [options, defaults])
      app.import({
        development: path.join(sourceCss, 'semantic.css'),
        production: path.join(sourceCss, 'semantic.min.css')
      });
    }

    const importJavascript = getDefault('import', 'javascript', [options, defaults])
    if (importJavascript) {
      this.sourceJavascript = getDefault('source', 'javascript', [options, defaults]);
      app.import({
        development: 'vendor/semantic.js',
        production: 'vendor/semantic.min.js'
      });
    }

    const importImages = getDefault('import', 'images', [options, defaults])
    if (importImages) {
      const sourceImage = getDefault('source', 'images', [options, defaults])
      const imageOptions = {destDir: getDefault('destination', 'images', [options, defaults])}
      app.import(path.join(sourceImage, 'flags.png'), imageOptions);
    }

    const importFonts = getDefault('import', 'fonts', [options, defaults])
    if (importFonts) {
      const sourceFont = getDefault('source', 'fonts', [options, defaults])
      const fontOptions = {destDir: getDefault('destination', 'fonts', [options, defaults])}
      var fontFiles = walkSync(sourceFont, { directories: false });
      var font;
      for(font of fontFiles) {
        app.import(path.join(sourceFont, font), fontOptions);
      }
    }
  },

  treeForVendor: function(vendorTree) {
    const trees = []

    if (vendorTree) {
      trees.push(vendorTree);
    }

    const sourceJavascript = this.sourceJavascript
    if (sourceJavascript) {
      let semanticJsTree = new Funnel(sourceJavascript, {
        srcDir: '/',
        files: ['semantic.js', 'semantic.min.js']
      })

      semanticJsTree = map(semanticJsTree,
          (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);

      trees.push(semanticJsTree);
    }

    return mergeTrees(trees);
  }
};
