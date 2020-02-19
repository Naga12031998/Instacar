import React from 'react';

// Components
import Navbar from './Navbar';

// Axios
import Axios from 'axios';

// Material-UI
import { Button, IconButton } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CakeIcon from '@material-ui/icons/Cake';
import EditIcon from '@material-ui/icons/Edit';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const token = window.localStorage.getItem('instacarToken');

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userArray: [],
			imgLocation: '',
			imgLocation1: ''
		};
	}

	componentDidMount = () => {
		this.fetchData();
	};

	fetchData = () => {
		Axios.get(`http://127.0.0.1:5000/getuser`, {
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-type': 'application/json'
			}
		}).then((res) => {
			this.setState({
				userArray: res.data
			});
		});
	};

	handlePhotoChange = (e) => {
		this.setState({
			imgLocation: e.target.files[0]
		});
	};

	handleClick = (e) => {
		e.preventDefault();
		if (this.state.imgLocation === '') {
			alert(`Fill up the required field`);
		} else {
			const formData = new FormData();
			formData.append('image', this.state.imgLocation);
			Axios.patch(`http://127.0.0.1:5000/updateprofilepic`, formData, {
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-type': 'application/json'
				}
			}).then(
				(res) => {
					// console.log(res.data)
				},
				setTimeout(() => {
					this.fetchData();
				}, 1000)
			);
		}
	};

	handleCover = (e) => {
		e.preventDefault();
		if (this.state.imgLocation1 === '') {
			alert(`Fill up the required field`);
		} else {
			const formData = new FormData();
			formData.append('image', this.state.imgLocation1);
			Axios.patch(`http://127.0.0.1:5000/updatecoverpic`, formData, {
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-type': 'application/json'
				}
			}).then(
				(res) => {
					// console.log(res.data)
				},
				setTimeout(() => {
					this.fetchData();
				}, 1000)
			);
		}
	};

	render() {
		const { userArray } = this.state;
		return (
			<div>
				<Navbar />
				<div>
					{userArray.map((e) => {
						return (
							<div className="card container my-3" key={e._id.$oid}>
								<div>
									<img
										src={`http://127.0.0.1:5000/${e.picture}`}
										alt={e.name}
										className="img-fluid my-3 mx-3"
										style={{ borderRadius: 10, height: 100, width: 100 }}
									/>
									<IconButton
										data-toggle="modal"
										data-target="#profilepicture"
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
										id="profilepicture"
										tabIndex="-1"
										role="dialog"
										aria-labelledby="profilepictureLabel"
										aria-hidden="true"
									>
										<div className="modal-dialog" role="document">
											<div className="modal-content">
												<div className="modal-header">
													<h5 className="modal-title" id="profilepictureLabel">
														Edit You Profile Picture Here
													</h5>
													<button
														type="button"
														className="close"
														data-dismiss="modal"
														aria-label="Close"
													>
														<span aria-hidden="true">&times;</span>
													</button>
												</div>
												<div className="modal-body">
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
									<br />
								</div>
								<div className="my-3">
									<h5 style={{ color: '#1A91DA' }}>
										<b>{e.name}</b>
									</h5>
									<p className="text-muted">@{e.userName}</p>
									<p>{e.bio}</p>
									<div className="row">
										<div className="col-xl-2 col-lg-2 col-md-4 col-sm-12 col-xs-12 my-3">
											<Button
												style={{ width: 150, color: '#15202B', backgroundColor: '#1A91DA' }}
												startIcon={<LocationOnIcon />}
												disabled
											>
												{e.location}
											</Button>
										</div>
										<div className="col-xl-2 col-lg-2 col-md-4 col-sm-12 col-xs-12 my-3">
											<Button
												style={{ width: 150, color: '#15202B', backgroundColor: '#1A91DA' }}
												startIcon={<CakeIcon />}
												disabled
											>
												{e.birthDate}
											</Button>
										</div>
									</div>
									<h6>{e.webSite}</h6>
									<div className="row">
										<div className="col-xl-2 col-lg-2 col-md-4 col-sm-12 col-xs-12 my-3">
											<Button href="/following">{e.following.length} following</Button>
										</div>
										<div className="col-xl-2 col-lg-2 col-md-4 col-sm-12 col-xs-12 my-3">
											<Button href="/followers">{e.followers.length} followers</Button>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 my-3">
										<Button
											variant="contained"
											style={{ color: '#15202B', backgroundColor: '#1A91DA' }}
											href="/edit"
										>
											edit profile
										</Button>
									</div>
									<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 my-3">
										<Button
											variant="contained"
											style={{ color: '#15202B', backgroundColor: '#1A91DA' }}
											href="/tweet"
										>
											Tweet
										</Button>
									</div>
									<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 my-3">
										<Button
											variant="contained"
											style={{ color: '#15202B', backgroundColor: '#1A91DA' }}
											href="/hashtagtweet"
										>
											Tweet With hashtag
										</Button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Dashboard;
