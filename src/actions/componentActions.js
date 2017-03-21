'use strict';

var Reflux = require('reflux');

var ComponentActions = Reflux.createActions({
	'add': { asyncResult: true },
	'search': { asyncResult: true }
});

module.exports = ComponentActions;
