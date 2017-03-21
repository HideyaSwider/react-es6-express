'use strict';

import Reflux from 'reflux';

//Actions are pretty much the same. Possible use of ../actions/actionsES4.js.
//Just wanted to use the real Reflux standards.
export var Actions = Reflux.createActions(['random': { asyncResult: true }]);

export default class StoreES6 extends Reflux.Store {
	constructor() {
		super();
		this.state = { random: this.getRandom() };
		this.listenables = Actions;
	}

	onRandom() {
		this.state.random = this.getRandom();
		this.trigger(this.state);
	}

	getRandom() {
		return parseInt(Math.random() * 500);
	}

}
