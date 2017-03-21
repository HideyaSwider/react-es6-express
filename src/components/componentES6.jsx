'use strict'

import React, { Component, PropTypes } from 'react';

export default class ComponentES6 extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div className="component-box" id="component1">
				<div className="component-header">
					<h3>{this.props.title}</h3>
				</div>
				<div className="component-body">
				</div>
				<div className="component-footer">
					<p>{this.props.likes} likes</p>
				</div>
			</div>
		)
	}
}

ComponentES6.propTypes = {
	likes: PropTypes.string,
	title: PropTypes.number.isRequired
}
