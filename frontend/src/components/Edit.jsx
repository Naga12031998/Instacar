import React from 'react';

// Axios
import Axios from 'axios';

// Components
import Navbar from './Navbar';

// Material-UI
import { CssBaseline, Container, Button, TextField, Typography, Grid } from '@material-ui/core/';

const token = window.localStorage.getItem('instacarToken');

class Edit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userArray: [],
			bio: '',
			location: '',
			webSite: '',
			birthDate: ''
		};
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleClick = (e) => {
		e.preventDefault();
		if (
			this.state.name === '' ||
			this.state.bio === '' ||
			this.state.location === '' ||
			this.state.webSite === '' ||
			this.state.birthDate === ''
		) {
			alert(`Fill up the required field`);
		} else {
			let data = {
				bio: this.state.bio,
				location: this.state.location,
				webSite: this.state.webSite,
				birthDate: this.state.birthDate
			};
			Axios.patch(`http://127.0.0.1:5000/updateuserdeatils`, data, {
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-type': 'application/json'
				}
			}).then(
				(res) => {
					// console.log(res.data)
					this.setState({
						name: '',
						bio: '',
						location: '',
						webSite: '',
						birthDate: ''
					});
				},
				setTimeout(() => {
					this.props.history.push('/dashboard');
				}, 500)
			);
		}
	};

	componentDidMount = () => {
		Axios.get(`http://127.0.0.1:5000/getuser`, {
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-type': 'application/json'
			}
		}).then((res) => {
			// console.log(res.data)
			this.setState({
				userArray: res.data
			});
		});
	};

	render() {
		const { bio, location, webSite, birthDate } = this.state;
		return (
			<div>
				<Navbar />
				<Container component="main" maxWidth="xs" style={{ marginTop: 50 }}>
					<CssBaseline />
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center'
						}}
					>
						<Typography component="h1" variant="h5" style={{ marginBottom: 10 }}>
							Edit Here
						</Typography>
						<form style={{ width: '100%' }} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="bio"
										label="Bio"
										name="bio"
										value={bio}
										onChange={this.handleChange}
										autoComplete="bio"
										autoFocus
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										name="webSite"
										value={webSite}
										onChange={this.handleChange}
										label="Web Site"
										type="text"
										id="webSite"
										autoComplete="webSite"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										name="location"
										value={location}
										onChange={this.handleChange}
										label="Location"
										id="location"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										name="birthDate"
										value={birthDate}
										onChange={this.handleChange}
										label="DD/MM/YYYY"
										id="birthDate"
										autoComplete="birthDate"
									/>
								</Grid>
							</Grid>
							<div style={{ marginTop: 15 }}>
								<Button
									type="submit"
									fullWidth
									style={{ color: '#15202B', backgroundColor: '#1A91DA' }}
									onClick={this.handleClick}
								>
									Submit
								</Button>
							</div>
						</form>
					</div>
				</Container>
			</div>
		);
	}
}

export default Edit;
