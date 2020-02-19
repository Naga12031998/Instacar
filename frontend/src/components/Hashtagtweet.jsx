import React from 'react';

// Components
import Navbar from './Navbar';

// Material-UI
import { CssBaseline, Container, Button, TextField, Typography, Grid } from '@material-ui/core/';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

// Axios
import Axios from 'axios';

class Hashtagtweet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tweet: '',
			hashTag: '',
			imgLocation: ''
		};
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handlePhotoChange = (e) => {
		this.setState({
			imgLocation: e.target.files[0]
		});
	};

	handleClick = (e) => {
		e.preventDefault();
		if (this.state.imgLocation === '' || this.state.tweet === '') {
			alert(`Fill up the required field`);
		} else {
			const token = window.localStorage.getItem('instacarToken');
			const formData = new FormData();
			formData.append('image', this.state.imgLocation);
			Axios.post(`http://127.0.0.1:5000/hashtagtweets`, formData, {
				headers: {
					Authorization: 'Bearer ' + token,
					tweet: this.state.tweet,
					hashTag: this.state.hashTag,
					'Content-type': 'application/json'
				}
			}).then(
				(res) => {
					// console.log(res.data)
				},
				setTimeout(() => {
					this.props.history.push('/dashboard');
				}, 1000)
			);
		}
	};

	render() {
		const { tweet, hashTag } = this.state;
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
						<Typography component="h1" variant="h5" style={{ marginBottom: 10, color: '#1A91DA' }}>
							<b>Post Your Thoughts</b>
						</Typography>
						<form style={{ width: '100%' }} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										name="hashTag"
										value={hashTag}
										onChange={this.handleChange}
										variant="outlined"
										required
										fullWidth
										id="hashtag"
										label="Hashtag"
										autoFocus
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										name="tweet"
										value={tweet}
										onChange={this.handleChange}
										variant="outlined"
										required
										fullWidth
										multiline
										rows="12"
										id="tweet"
										label="Here You Go"
									/>
								</Grid>
								<Grid item xs={12}>
									<input
										accept="image/*"
										style={{ display: 'none' }}
										id="contained-button-file"
										multiple
										type="file"
										onChange={this.handlePhotoChange}
									/>
									<label htmlFor="contained-button-file">
										<Button
											variant="contained"
											color="secondary"
											component="span"
											startIcon={<CloudUploadIcon />}
										>
											Upload
										</Button>
									</label>
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

export default Hashtagtweet;
