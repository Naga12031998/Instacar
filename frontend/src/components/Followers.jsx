import React from 'react';

// Components
import Navbar from './Navbar';

// Axios
import Axios from 'axios';

class Followers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allUsers: []
		};
	}

	componentDidMount = () => {
		this.fetchData();
	};

	fetchData = () => {
		const token = window.localStorage.getItem('instacarToken');
		Axios.get(`http://127.0.0.1:5000/getallfollowers`, {
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-type': 'application/json'
			}
		}).then((res) => {
			// console.log(res.data)
			this.setState({
				allUsers: res.data
			});
		});
	};

	render() {
		const { allUsers } = this.state;
		return (
			<div>
				<Navbar />
				<div className="conatiner text-center my-3 mx-3">
					{allUsers.map((e) => {
						return (
							<div key={e}>
								<p>{e}</p>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Followers;
