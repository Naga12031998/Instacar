import React from 'react';

// Components
import Navbar from './Navbar';

// Axios
import Axios from 'axios';
import { Button } from '@material-ui/core';

class Following extends React.Component {
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
		Axios.get(`http://127.0.0.1:5000/getalluser/followinguser/expect/loggedin`, {
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

	handleUnfollow = (name) => {
		const token = window.localStorage.getItem('instacarToken');
		Axios.patch(
			`http://127.0.0.1:5000/unfollowusers/${name}`,
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
				}, 200)
			)
			.catch(() => console.log('error'));
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
								<Button variant="contained" color="secondary" onClick={() => this.handleUnfollow(e)}>
									Unfollow
								</Button>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Following;
