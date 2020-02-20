import React from 'react';

// Axios
import Axios from 'axios';

// Material-UI
import { Card, CardActionArea, CardContent, Typography, Button } from '@material-ui/core/';
import Home from './Home';

const token = window.localStorage.getItem('instacarToken');

class Yourtweet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userArray: [],
			status: false
		};
	}

	componentDidMount = () => {
		this.fetchData();
	};

	fetchData = () => {
		this.setState({
			status: false
		});
		Axios.get(`http://127.0.0.1:5000/getuser`, {
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-type': 'application/json'
			}
		}).then((res) => {
			console.log(res.data[0].tweets);
			if (res.data[0].tweets.length) {
				this.setState({
					status: true,
					userArray: res.data[0].tweets
				});
			}
		});
	};

	handleClick = (id) => {
		Axios.delete(`http://127.0.0.1:5000/deletetweets/${id}`, {
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-type': 'application/json'
			}
		}).then(
			setTimeout(() => {
				this.fetchData();
			}, 200)
		);
	};

	render() {
		const { userArray, status } = this.state;
		return (
			<div>
				<Home />
				<div className="container">
					{status ? (
						<div>
							{userArray.map((e) => {
								return (
									<div className="row" key={e.tweetId}>
										<div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12">
											<Card key={e.tweetId}>
												<CardActionArea>
													<img
														className="img-fluid"
														style={{ height: 200, weight: 200 }}
														src={`http://127.0.0.1:5000/${e.picture}`}
														alt="pic"
													/>
													<CardContent>
														<Typography variant="body2" component="p">
															{e.tweet}
														</Typography>
													</CardContent>
												</CardActionArea>
												<small className="mx-3 my-2 text-muted">
													{e.month} {e.day},{e.year}
												</small>
											</Card>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-4 col-sm-12 col-xs-12 mx-3 my-3">
											<Button
												variant="contained"
												color="secondary"
												size="small"
												onClick={() => this.handleClick(e.tweetId)}
											>
												Delete
											</Button>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						<h2 className="text-center mt-5" style={{ color: '#1A91DA' }}>
							You didn't tweeted yet
						</h2>
					)}
				</div>
			</div>
		);
	}
}

export default Yourtweet;
