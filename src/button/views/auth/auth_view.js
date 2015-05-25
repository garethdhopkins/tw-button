var View = require('ampersand-view');
var api = require('../../api/api');

var AuthView = View.extend({

  template: require('./auth_view.hbs'),

  props: {
    hub: 'state'
  },

  events: {
    'click [data-hook=button-sign-in]': 'onSubmit',
    'click [data-hook=button-cancel]': 'onCancel'
  },

  render: function() {
    this.renderWithTemplate(this);
    return this;
  },

  onSubmit: function() {
    var hub = this.hub;
    hub.trigger('loader:show');

    api.auth.authenticate().then(function() {
      hub.trigger('loader:hide');
      hub.trigger('popup:show:task');
    });
  },

  onCancel: function(event) {
    event.preventDefault();
    this.hub.trigger('popup:close');
  }

});

module.exports = AuthView;