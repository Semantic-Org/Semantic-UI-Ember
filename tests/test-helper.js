import $ from 'jquery';
import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';
import { start } from 'ember-cli-qunit';

setResolver(resolver);

$.fn.modal.settings.context = "#ember-testing";

start();
