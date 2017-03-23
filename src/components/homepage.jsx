'use strict';

import React, { Component } from 'react';
import RandomES6 from './randomES6.jsx';
import RandomES4 from './randomES4.jsx';

export default class Home extends Component {
	constructor (props) {
		super(props);
	}

	render() {
		return(
			<div className="homepage">
				<RandomES4 title="ES4" />
				<RandomES6 title="ES6" />
			</div>
		);
	}
}
