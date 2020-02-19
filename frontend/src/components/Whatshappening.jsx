import React from 'react';

// Axios
import Axios from 'axios';

// Material-UI
import { Button, IconButton, Grid, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

class Whatshappening extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			what: ''
		};
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleClick = () => {
		const token = window.localStorage.getItem('instacarToken');
		Axios.post(
			`http://127.0.0.1:5000/whatshappening`,
			{
				what: this.state.what
			},
			{
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-type': 'application/json'
				}
			}
		).then((res) => {
			// console.log(res.data)
		});
		this.setState({
			what: ''
		});
	};

	render() {
		const { what } = this.state;
		return (
			<div>
				<IconButton
					data-toggle="modal"
					data-target="#whatsHappening"
					className="mx-3 my-3"
					edge="start"
					style={{ color: '#1A91DA' }}
					aria-label="menu"
					href="/"
				>
					<EditIcon />
				</IconButton>
				<div
					className="modal fade"
					id="whatsHappening"
					tabIndex="-1"
					role="dialog"
					aria-labelledby="whatsHappeningLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="whatsHappeningLabel">
									What's Happening
								</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<Grid item xs={12}>
									<TextField
										autoComplete="uname"
										name="what"
										value={what}
										onChange={this.handleChange}
										variant="outlined"
										required
										fullWidth
										multiline
										rows="12"
										id="what"
										label="What's Happening"
										autoFocus
									/>
								</Grid>
							</div>
							<div className="modal-footer">
								<Button
									variant="contained"
									color="primary"
									onClick={this.handleClick}
									data-dismiss="modal"
								>
									Save changes
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Whatshappening;
