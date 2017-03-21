'use strict';

var
	Reflux = require('reflux'),
	ComponentActions = require('../actions/componentActions.js');

var initialState = {
	components: [
		{
			title: 'Title #1',
		},
		{
			title: 'title #2'
		}
	]
};

var ComponentsStore = Reflux.createStore({

	listenables: ComponentActions,

	init: function() {
	},

	getInitialState: function() {
		return this.state = initialState;
	},

	onAdd: function() {
		//console.log('onAdd');
	},

	onSearch: function() {
		//console.log('Hello from the store: ' + searchWord);
	}

});

module.exports = ComponentsStore;
