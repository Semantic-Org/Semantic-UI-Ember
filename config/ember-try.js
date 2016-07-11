/*jshint node:true*/
module.exports = {
  "command": "ember test",
  "scenarios": [
    {
      "name": "default",
      "bower": {
        "dependencies": {}
      }
    },
    {
      "name": "ember-1.13",
      "bower": {
        "dependencies": {
          "ember": "~1.13.0",
          "ember-data": "~1.13.0",
          "ember-cli-shims": "0.0.6",
          "ember-hash-helper-polyfill", "0.1.1"
        }
      }
    },
    {
    name: "ember-2.0",
    bower: {
      dependencies: {
        ember: "~2.0.0",
        "ember-data": "~2.0.0",
        "ember-cli-shims": "0.0.6"
      }
    }
    },
    {
      name: "ember-2.1",
      bower: {
        dependencies: {
          ember: "~2.1.0",
          "ember-data": "~2.1.0",
          "ember-cli-shims": "0.0.6"
        }
      }
    },
    {
      name: "ember-2.2",
      bower: {
        dependencies: {
          ember: "~2.2.0",
          "ember-data": "~2.2.0",
          "ember-cli-shims": "0.0.6"
        }
      }
    },
    {
      name: "ember-2.3",
      bower: {
        dependencies: {
          ember: "~2.3.0",
          "ember-data": "~2.3.0"
        }
      }
    },
    {
      "name": "ember-2.4",
      "bower": {
        "dependencies": {
          "ember": "~2.4.0",
          "ember-data": "~2.4.0"
        }
      }
    },
    {
      "name": "ember-2.5",
      "bower": {
        "dependencies": {
          "ember": "~2.5.0",
          "ember-data": "~2.5.0"
        }
      }
    },
    {
      "name": "ember-2.6",
      "bower": {
        "dependencies": {
          "ember": "~2.6.0",
          "ember-data": "~2.6.0"
        }
      }
    },
    {
      "name": "ember-release",
      "bower": {
        "dependencies": {
          "ember": "components/ember#release",
          "ember-data": "components/ember-data#release"
        },
        "resolutions": {
          "ember": "release",
          "ember-data": "release"
        }
      }
    },
    {
      "name": "ember-beta",
      "bower": {
        "dependencies": {
          "ember": "components/ember#beta",
          "ember-data": "components/ember-data#beta"
        },
        "resolutions": {
          "ember": "beta",
          "ember-data": "beta"
        }
      }
    },
    {
      "name": "ember-canary",
      "bower": {
        "dependencies": {
          "ember": "components/ember#canary",
          "ember-data": "components/ember-data#canary"
        },
        "resolutions": {
          "ember": "canary",
          "ember-data": "canary"
        }
      }
    }
  ]
};
