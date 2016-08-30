/* jshint node: true */
'use strict';

function isObject(obj) {
    if (obj === null) { return false; }
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function isObjectWithKeys(obj) {
    if (obj === null) { return false; }
    return Object.keys(obj).length > 0 && obj.constructor === Object;
}

function extend(obj, src) {
  Object.keys(src).forEach(function(key) {
    if (isObjectWithKeys(src[key])) {
      obj[key] = extend(obj[key], src[key]);
    }
    if (src[key] !== undefined && !isObject(src[key])) {
      obj[key] = src[key];
    }
  });
  return obj;
}

function oldDefaults(userOptions) {
  return userOptions['javascript'] || userOptions['css'] || userOptions['fonts'] || userOptions['images'];
}

var exports = module.exports = {};

exports.default = function(path, property, options) {
  var userOptions = options[0] || {};
  var opts = extend(options[1], userOptions);
  var old = oldDefaults(userOptions);
  if (old && path === 'imports') {
    return opts[property];
  }
  return opts[path][property];
};

exports.format = function() {
  var args = Array.prototype.slice.call(arguments);
  return args.filter(Boolean).filter(function(e) { return (typeof e === 'string') ? !e.match(/^\s+$/) : e; }).join('/');
};
