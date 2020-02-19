import React from 'react';

// React-router-dom
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import LandingPage from './components/Landingpage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Edit from './components/Edit';
import Tweet from './components/Tweet';
import Hashtagtweet from './components/Hashtagtweet';
import Home from './components/Home';
import Yourtweets from './components/Yourtweets';
import Yourhashtag from './components/Yourhashtag';
import Yourwhatshappening from './components/Yourwhatshappening';
import Allusers from './components/Allusers';
import Following from './components/Following';
import Followers from './components/Followers';
import Searchhashtags from './components/Searchhashtags';
import Feed from './components/Feed';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<Router>
					<div>
						<Route path="/" exact component={LandingPage} />
						<Route path="/home" component={Home} />
						<Route path="/auth/signup" component={Signup} />
						<Route path="/auth/login" component={Login} />
						<Route path="/dashboard" component={Dashboard} />
						<Route path="/edit" component={Edit} />
						<Route path="/tweet" component={Tweet} />
						<Route path="/allusers" component={Allusers} />
						<Route path="/hashtagtweet" component={Hashtagtweet} />
						<Route path="/yourstweet" component={Yourtweets} />
						<Route path="/yourshashtagtweets" component={Yourhashtag} />
						<Route path="/following" component={Following} />
						<Route path="/followers" component={Followers} />
						<Route path="/feed" component={Feed} />
						<Route path="/searchhashtags" component={Searchhashtags} />
						<Route path="/yourswhatshappening" component={Yourwhatshappening} />
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
