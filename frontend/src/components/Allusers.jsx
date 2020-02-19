import React from 'react';

// Components
import Navbar from './Navbar';

// Axios
import Axios from 'axios';
import { Button } from '@material-ui/core';

class Allusers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			allUsers: []
		};
	}

	componentDidMount = () => {
		this.fetchData();
	};

	fetchData = () => {
		const token = window.localStorage.getItem('instacarToken');
		Axios.get(`http://127.0.0.1:5000/getalluser/expect/loggedin/followinguser`, {
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

	handleFollow = (name) => {
		const token = window.localStorage.getItem('instacarToken');
		Axios.patch(
			`http://127.0.0.1:5000/followusers/${name}`,
			{
				userName: name
			},
			{
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-type': 'application/json'
				}
			}
		)
			.then(
				(res) => {
					// console.log(res.data)
				},
				setTimeout(() => {
					this.fetchData();
				}, 500)
			)
			.catch(() => console.log('error'));
	};

	render() {
		const { allUsers } = this.state;
		return (
			<div>
				<Navbar />
				{allUsers.map((e) => {
					return (
						<div className="container" key={e.email}>
							<h4>{e.name}</h4>
							<p>{e.bio}</p>
							<p>{e.location}</p>
							<Button
								variant="contained"
								style={{ width: 150, color: '#15202B', backgroundColor: '#1A91DA' }}
								onClick={() => this.handleFollow(e.name)}
							>
								Follow
							</Button>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Allusers;
