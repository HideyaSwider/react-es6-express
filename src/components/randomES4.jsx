'use strict';

var React = require('react'),
	Reflux = require('reflux'),
	StoreES4 = require('../stores/storeES4.js'),
	ActionsES4 = require('../actions/actionsES4.js');


var RandomES4 = React.createClass({

	mixins: [Reflux.connect(StoreES4, 'store')],

	propTypes: {
		title: React.PropTypes.string,
		likes: React.PropTypes.number
	},
	render: function() {
		return(
			<div className="random-box" onClick={this.random}>
				<div className="random-header">
					<h3>Change me in {this.props.title}</h3>
				</div>
				<div className="random-body">
					<p>{this.state.store.random}</p>
				</div>
			</div>
		);
	},

	random: function() {
		ActionsES4.random();
	}
});

module.exports = RandomES4;
