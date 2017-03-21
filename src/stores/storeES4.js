'use strict';

var
	Reflux = require('reflux'),
	Actions = require('../actions/actionsES4.js');

var StoreES4 = Reflux.createStore({

	listenables: Actions,

	getInitialState: function() {
		return this.state = { random: this.getRandom() };
	},

	getRandom() {
		return parseInt(Math.random() * 500);
	},

	onRandom: function() {
		this.state.random = this.getRandom();
		this.trigger(this.state);
	}
});

module.exports = StoreES4;
