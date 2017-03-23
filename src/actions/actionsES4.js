'use strict';

var Reflux = require('reflux');

var ComponentActions = Reflux.createActions({
	'random': { asyncResult: true }
});

module.exports = ComponentActions;
