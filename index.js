/* eslint-env node */
'use strict';

const path = require('path')

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

const getDefault = require('./lib/utils/get-default')

const Funnel = require('broccoli-funnel')
const mergeTrees = require('broccoli-merge-trees')
const map = require('broccoli-stew').map

module.exports = {
  options: {
    'babel': {
      sourceMaps: 'both'
    },
    'ember-cli-babel': {
      sourceMaps: 'both'
    }
  },
  name: 'semantic-ui-ember',

  included: function (app) {
    const options = (app && app.project.config(app.env)['SemanticUI']) || {}

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
      const fontExtensions = ['.eot', '.otf', '.svg', '.ttf', '.woff', '.woff2']
      const sourceFont = getDefault('source', 'fonts', [options, defaults])
      const fontOptions = {destDir: getDefault('destination', 'fonts', [options, defaults])}
      for (let i = fontExtensions.length - 1; i >= 0; i--) {
        app.import(path.join(sourceFont, 'icons' + fontExtensions[i]), fontOptions);
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
