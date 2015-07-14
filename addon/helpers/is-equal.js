import Ember from 'ember';

export function isEqual([lhs, rhs]) {
  return lhs === rhs;
}

export default Ember.Helper.helper(isEqual);
