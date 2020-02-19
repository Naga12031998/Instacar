import React from 'react';

// Components
import Login from './Login';
import Home from './Home';

class Landingpage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: false
		};
		setTimeout(() => {
			const token = window.localStorage.getItem('instacarToken');
			if (token) {
				this.setState({
					status: true
				});
			}
		});
	}

	render() {
		const { status } = this.state;
		return <div>{status ? <Home /> : <Login />}</div>;
	}
}

export default Landingpage;
