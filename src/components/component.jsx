'use strict';

var React = require('react');

var Component = React.createClass({
	propTypes: {
		title: React.PropTypes.string,
		likes: React.PropTypes.number
	},
	render: function() {
		return(
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
		);
	}
});

module.exports = Component;
