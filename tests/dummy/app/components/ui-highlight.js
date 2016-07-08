/* global hljs */
import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this._super(...arguments);
    const elem = this.$('pre.code');
    let html = elem.html().trim();
    let escaped = this.escapeHtml(html);
    elem.html(escaped);
    if (this.get('before')) {
      this.get('before')(html);
    }
    hljs.highlightBlock(elem[0]);
  },

  escapeHtml(html) {
    return html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
 }
});
