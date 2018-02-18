/* eslint-env node */
module.exports = {
  scenarios: [
    {
      name: 'ember-lts-2.16',
      npm: {
        devDependencies: {
          'ember-source': '2.16'
        }
      }
    },
    {
      name: 'ember-lts-2.18',
      npm: {
        devDependencies: {
          'ember-source': '2.18'
        }
      }
    },
    {
      name: 'ember-3.0',
      npm: {
        devDependencies: {
          'ember-source': '3.0'
        }
      }
    },
    {
      name: 'ember-latest',
      npm: {
        devDependencies: {
          'ember-source': 'latest'
        }
      }
    },
    {
      name: 'ember-beta',
      npm: {
        devDependencies: {
          'ember-source': 'beta'
        }
      }
    }
  ]
};
