import Ember from 'ember';
import resolver from './helpers/resolver';


const {
  $,
} = Ember;

import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

$.fn.modal.settings.context = "#ember-testing";
