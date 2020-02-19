import React from 'react';

// Axios
import Axios from 'axios';

// Navbar
import Navbar from './Navbar';

class Worldnews extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hashTags: [],
			dataArr: [],
			status: false
		};
	}

	componentDidMount = () => {
		Axios.get(`http://127.0.0.1:5000/getallhastags`).then((res) => {
			this.setState({
				hashTags: res.data
			});
		});
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
		Axios.get(`http://127.0.0.1:5000/searchhashtag/${e.target.value}`)
			.then({
				dataArr: []
			})
			.then((res) => {
				this.setState({
					status: true,
					dataArr: res.data[0].hashTagTweets
				});
			})
			.catch(() => console.log('error'));
	};

	render() {
		const { hashTags, dataArr, status } = this.state;
		return (
			<div>
				<Navbar />
				<div className="container">
					<div className="input-group my-3">
						<select className="custom-select" id="inputGroupSelect01" onChange={this.handleChange}>
							<option defaultValue>Choose...</option>
							{hashTags.map((e) => {
								return <option key={e.hashTag}>{e.hashTag}</option>;
							})}
						</select>
					</div>
					{status ? (
						<div>
							{dataArr.map((e) => {
								return (
									<div className="card my-3" key={e.tweetId}>
										<div className="row">
											<div className="col-lg-8 col-md-12 col-sm-6 mx-3 my-3">
												<p style={{ fontFamily: 'Proza Libre' }}>{e.tweet}</p>
												<p className="text-muted">by--{e.name}</p>
												<p className="my-3">
													{e.month} {e.day}, {e.year}
												</p>
											</div>
											<div className="col-lg-3 col-md-0 col-sm-6">
												<img
													src={`http://127.0.0.1:5000/${e.picture}`}
													className="img-fluid my-3"
													style={{ borderRadius: 10 }}
													alt="Pic"
												/>
											</div>
											<div className="col-1" />
										</div>
									</div>
								);
							})}
						</div>
					) : (
						<h1 className="mt-5" style={{ color: '#aa614a' }}>
							Please choose a Hashtag
						</h1>
					)}
				</div>
			</div>
		);
	}
}

export default Worldnews;
