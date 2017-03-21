'use strict';

var React = require('react');
import ComponentES6 from './componentES6.jsx';
import Component from './component.jsx';

var Home = React.createClass({

	render: function() {
		return(
			<div className="homepage">
				<h1>ES6</h1>
				<Component title="Hideya" likes={102} />
				<ComponentES6 title="Hideya ES6" likes={122} />
			</div>
		);
	}
});

module.exports = Home;
