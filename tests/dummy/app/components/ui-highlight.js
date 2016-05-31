import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this._super(...arguments);
    const elem = this.$('pre.code');
    elem.html(elem.html().trim());
    if (this.get('before')) {
      this.get('before')(elem.html());
    }
    hljs.highlightBlock(elem[0]);
  }
});
