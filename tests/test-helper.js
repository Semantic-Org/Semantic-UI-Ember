import resolver from './helpers/resolver';
import $ from 'jquery';

import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

$.fn.modal.settings.context = "#ember-testing";
