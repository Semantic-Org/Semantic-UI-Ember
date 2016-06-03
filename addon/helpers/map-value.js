import Ember from 'ember';

export function mapValue([action, ...params]) {
  return action(...params);
}

export default Ember.Helper.helper(mapValue);
