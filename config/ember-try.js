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
          "ember-cli-shims": "0.0.6"
        }
      },
      npm: {
        dependencies: {
          "ember-hash-helper-polyfill": "0.1.1"
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
      },
      npm: {
        dependencies: {
          "ember-hash-helper-polyfill": "0.1.1"
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
      },
      npm: {
        dependencies: {
          "ember-hash-helper-polyfill": "0.1.1"
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
      "name": "ember-2.7",
      "bower": {
        "dependencies": {
          "ember": "~2.7.0",
          "ember-data": "~2.7.0"
        }
      }
    },
    {
      "name": "ember-2.8",
      "bower": {
        "dependencies": {
          "ember": "~2.8.0",
          "ember-data": "~2.8.0"
        }
      }
    },
    {
      "name": "ember-release",
      "bower": {
        "dependencies": {
          "ember": "components/ember#release",
          "ember-data": "components/ember-data#release",
          "jquery": "<3"
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
    },
    {
      name: 'ember-alpha',
      allowedToFail: true,
      bower: {
        dependencies: {
          "ember": "alpha",
          "ember-data": "components/ember-data#release",
        },
        resolutions: {
          "ember": "alpha"
        }
      }
    },
    {
      "name": "semantic-2.1.8",
      "bower": {
        "dependencies": {
          "semantic-ui": "2.1.8"
        }
      }
    },
    {
      "name": "semantic-2.2.2",
      "bower": {
        "dependencies": {
          "semantic-ui": "2.2.2"
        }
      }
    },
    {
      "name": "semantic-2.2.3",
      "bower": {
        "dependencies": {
          "semantic-ui": "2.2.3"
        }
      }
    },
    {
      "name": "semantic-2.2.4",
      "bower": {
        "dependencies": {
          "semantic-ui": "2.2.4"
        }
      }
    },
    {
      "name": "semantic-latest",
      "bower": {
        "dependencies": {
          "semantic-ui": "latest"
        }
      }
    }
  ]
};
