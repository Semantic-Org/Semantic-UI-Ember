import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

$.fn.modal.settings.context = "#ember-testing";
