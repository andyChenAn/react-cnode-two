import React, { Component } from 'react';
import routes from './routes';
class App extends Component {
	constructor (props) {
		super(props);
	}
	render () {
		return (
			<div>
				{routes}
			</div>
		)
	}
};
export default App;