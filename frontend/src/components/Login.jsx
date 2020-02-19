import React from 'react';

// Material-UI
import { CssBaseline, Container, Button, TextField, Typography, Grid } from '@material-ui/core/';

// React-router-dom
import { Link, Redirect } from 'react-router-dom';

// Axios
import Axios from 'axios';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			status: false
		};
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleClick = (e) => {
		e.preventDefault();
		Axios.post(`http://127.0.0.1:5000/auth/login`, {
			email: this.state.email,
			password: this.state.password
		}).then((res) => {
			// console.log(res.data)
			if (res.data.status === 401) {
				alert(`Invalid credentials`);
			} else {
				window.localStorage.setItem('instacarToken', res.data.status);
				this.setState({
					status: true
				});
			}
		});
		this.setState({
			password: '',
			email: ''
		});
	};

	render() {
		const { email, password, status } = this.state;
		return (
			<div>
				<Container component="main" maxWidth="xs" style={{ marginTop: 100 }}>
					<CssBaseline />
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center'
						}}
					>
						<Typography component="h1" variant="h5">
							Log in
						</Typography>
						<form style={{ width: '100%' }} noValidate>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								value={email}
								onChange={this.handleChange}
								autoComplete="email"
								autoFocus
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								value={password}
								onChange={this.handleChange}
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
							<div style={{ marginTop: 15 }}>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									onClick={this.handleClick}
								>
									Sign In
								</Button>
							</div>
							<Grid container justify="flex-end" style={{ marginTop: 20 }}>
								<Grid item>
									<Link to="/auth/signup" variant="body2">
										<i>Dont have an account? Sign Up</i>
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
					{status ? <Redirect to="/home" /> : null}
				</Container>
			</div>
		);
	}
}

export default Login;
