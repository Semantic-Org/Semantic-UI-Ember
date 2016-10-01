module.exports = function(path, property, options) {
  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    if (option == null || typeof option !== "object") {
      continue;
    }

    if (option.hasOwnProperty(path)) {
      if (typeof option[path] === "object") {
        if (option[path].hasOwnProperty(property)) {
          return option[path][property];
        }
      } else {
        return option[path];
      }
    }

    if (option.hasOwnProperty(property)) {
      return option[property];
    }
  }
};