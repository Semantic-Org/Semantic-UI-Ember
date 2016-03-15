import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('modules', function() {
    this.route('accordion');
    this.route('checkbox');
    this.route('dimmer');
    this.route('dropdown');
    this.route('embed');
    this.route('modal');
    this.route('nag');
    this.route('popup');
    this.route('progress');
    this.route('rating');
    this.route('search');
    this.route('shape');
    this.route('sidebar');
    this.route('sticky');
    this.route('tab');
    this.route('transition');
  });
});

export default Router;
