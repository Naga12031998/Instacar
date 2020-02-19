import React from 'react';

// components
import Navbar from './Navbar';
import Whatshappening from './Whatshappening';

// Material-UI
import { Button } from '@material-ui/core';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<Navbar />
				<div className="conatiner text-center">
					<Whatshappening />
					<Button
						variant="contained"
						style={{ width: 150, color: '#15202B', backgroundColor: '#1A91DA' }}
						className="my-3 mx-3"
						href="/yourstweet"
					>
						Your Tweets
					</Button>
					<Button
						variant="contained"
						style={{ width: 150, color: '#15202B', backgroundColor: '#1A91DA' }}
						className="my-3 mx-3"
						href="/yourshashtagtweets"
					>
						Your HashTag Tweets
					</Button>
					<Button
						variant="contained"
						style={{ width: 150, color: '#15202B', backgroundColor: '#1A91DA' }}
						className="my-3 mx-3"
						href="/yourswhatshappening"
					>
						Your Whats Happening
					</Button>
					<Button
						variant="contained"
						style={{ width: 150, color: '#15202B', backgroundColor: '#1A91DA' }}
						className="my-3 mx-3"
						href="/allusers"
					>
						All users
					</Button>
					<Button
						variant="contained"
						style={{ width: 150, color: '#15202B', backgroundColor: '#1A91DA' }}
						className="my-3 mx-3"
						href="/searchhashtags"
					>
						Search Hashtag
					</Button>
					<Button
						variant="contained"
						style={{ width: 150, color: '#15202B', backgroundColor: '#1A91DA' }}
						className="my-3 mx-3"
						href="/feed"
					>
						Feed
					</Button>
				</div>
			</div>
		);
	}
}

export default Home;
