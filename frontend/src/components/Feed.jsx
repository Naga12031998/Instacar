import React from 'react';

// Navbar
import Navbar from './Navbar';

// Axios
import Axios from 'axios';

const token = window.localStorage.getItem('instacarToken');

class Feed extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: false
		};
	}

	componentDidMount = () => {
		Axios.get(`http://127.0.0.1:5000/getdata/followinguser`, {
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-type': 'application/json'
			}
		}).then((res) => {
			// console.log(res.data[0])
			if (res.data.length !== 0) {
				this.setState({
					status: true,
					userData: res.data[0]
				});
			}
		});
	};

	render() {
		const { status, userData } = this.state;
		return (
			<div>
				<Navbar />
				{status ? (
					<div className="container">
						{userData.map((e) => {
							return (
								<div className="card my-3" key={e.tweetId}>
									<div className="row">
										<div className="col-lg-8 col-md-12 col-sm-6 mx-3 my-3">
											<p style={{ fontFamily: 'Proza Libre' }}>{e.tweet}</p>
											<p className="text-muted">by-- {e.postedBy}</p>
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
					<h2 className="mt-4 text-center" style={{ color: '#1A91DA' }}>
						No Data to show
					</h2>
				)}
			</div>
		);
	}
}

export default Feed;
