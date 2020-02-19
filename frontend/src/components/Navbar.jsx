import React from 'react';

// Axios
import Axios from 'axios';

// Material-UI
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// React-router-dom
import { Redirect } from 'react-router-dom';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: false
		};
		setTimeout(() => {
			var token = window.localStorage.getItem('instacarToken');
			if (token != null) {
				this.setState({
					status: true
				});
			}
		}, 0);
	}

	componentDidMount = () => {
		this.fetchData();
	};

	fetchData = () => {
		var token = window.localStorage.getItem('instacarToken');
		Axios.get(`http://127.0.0.1:5000/getuser`, {
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-type': 'application/json'
			}
		}).then((res) => {
			this.setState({
				userPic: res.data[0].picture
			});
		});
	};

	handleLogout = () => {
		window.localStorage.removeItem('instacarToken');
		this.setState({
			flag: true
		});
	};

	render() {
		const { status, flag, userPic } = this.state;
		return (
			<div style={{ flexGrow: 1 }}>
				<AppBar position="static" style={{ backgroundColor: '#15202B' }}>
					<Toolbar>
						<IconButton edge="start" style={{ color: '#1A91DA' }} aria-label="menu" href="/home">
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" style={{ flexGrow: 1, color: '#1A91DA' }}>
							Home
						</Typography>
						<Button
							className="my-3"
							startIcon={
								<Avatar src={`http://127.0.0.1:5000/${userPic}`} className="img-fluid" alt="Pic" />
							}
							href="/dashboard"
							style={{ width: 150, color: '#15202B', backgroundColor: '#1A91DA' }}
						>
							dashboard
						</Button>
						{status ? (
							<Button
								className="my-3 mx-3"
								startIcon={<ExitToAppIcon />}
								onClick={this.handleLogout}
								style={{ width: 150, color: '#15202B', backgroundColor: '#1A91DA' }}
							>
								Logout
							</Button>
						) : null}
					</Toolbar>
				</AppBar>
				{flag ? <Redirect to="/auth/login" /> : null}
			</div>
		);
	}
}

export default Navbar;
