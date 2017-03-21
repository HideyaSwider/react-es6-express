'use strict'

import React, { PropTypes } from 'react';
import StoreES6, { Actions } from '../stores/storeES6.js';
//Used the component from Reflux (insead of React)
//to avoid having to deal with Decorators to solve the mixins problem.
import { Component } from 'reflux';

export default class RandomES6 extends Component {

	constructor (props) {
		super(props);
		this.store = StoreES6;
	}

	render () {
		return (
			<div className="random-box" onClick={this.random}>
				<div className="random-header">
					<h3>Change me in {this.props.title}</h3>
				</div>
				<div className="random-body">
					<p>{this.state.random}</p>
				</div>
			</div>
		)
	}

	random() {
		Actions.random();
	}
}

RandomES6.propTypes = {
	likes: PropTypes.number,
	title: PropTypes.string.isRequired
}
