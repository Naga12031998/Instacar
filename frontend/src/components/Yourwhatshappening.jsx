import React from 'react';

// Axios
import Axios from 'axios';

// Material-UI
import { Card, CardActionArea, CardContent, Typography, Button } from '@material-ui/core/';

// components
import Home from './Home';

const token = window.localStorage.getItem('instacarToken');

class Yourwhatshappening extends React.Component {
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
			status : false
		})
		Axios.get(`http://127.0.0.1:5000/getuser`, {
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-type': 'application/json'
			}
		}).then((res) => {
			// console.log(res.data[0].whatsHappening)
			if (res.data[0].whatsHappening.length) {
				this.setState({
					userArray: res.data[0].whatsHappening,
					status: true
				});
			}
		});
	};

	handleClick = (id) => {
		Axios.delete(`http://127.0.0.1:5000/deletewhatshappening/${id}`, {
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
				<div className="container text-center">
					{status ? (
						<div>
							{userArray.map((e) => {
								return (
									<div className="row" key={e.whatId}>
										<div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12">
											<Card>
												<CardActionArea>
													<CardContent>
														<Typography variant="body2" component="p">
															{e.what}
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
												onClick={() => this.handleClick(e.whatId)}
											>
												Delete
											</Button>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						<h2 className="mt-3 text-center" style={{ color: '#1A91DA' }}>
							No Message to show
						</h2>
					)}
				</div>
			</div>
		);
	}
}

export default Yourwhatshappening;
