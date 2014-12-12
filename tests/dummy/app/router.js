import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('modules', function() {
    this.route('accordion');
    this.route('checkbox');
  });
});

export default Router;
