import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

import About from './components/pages/About';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import User from './components/users/User';

class App extends Component {
	state = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null,
	};

	//if the method is defined outside of render,
	//we use the 'this' keyword to reference it inside render().

	async componentDidMount() {
		this.setState({
			loading: true,
		});
		const res = await axios.get(
			`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		console.log(res.data);

		this.setState({
			users: res.data,
			loading: false,
		});
	}

	//fetch user repos from API
	getUserRepos = async (username) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({ repos: res.data, loading: false });
	};

	//fetch users from API
	getUser = async (username) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		console.log(res.data);
		this.setState({
			user: res.data,
			loading: false,
		});
	};

	//search for users via API
	searchUsers = async (text) => {
		this.setState({ loading: true });
		console.log(text);
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		console.log(res.data.items);
		this.setState({
			users: res.data.items,
			loading: false,
		});
	};

	//clear users from populated search results.
	clearUsers = () => {
		this.setState({ users: [], loading: false });
	};

	//alert message for search without text input
	setAlert = (msg, type) => {
		this.setState({
			alert: {
				msg,
				type,
			},
		});
		setTimeout(() => {
			this.setState({ alert: null });
		}, 5000);
	};

	//render is actually a lifecycle method
	render() {
		const { users, user, loading, repos } = this.state;
		return (
			<Router>
				<div className='app'>
					<Navbar title='GitHub Finder' icon={faGithub} />
					<div className='container'>
						<Alert alert={this.state.alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => (
									<Fragment>
										<Search
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											showClear={
												users.length > 0 ? true : false
											}
											setAlert={this.setAlert}
										/>
										<Users
											loading={loading}
											users={users}
										/>
									</Fragment>
								)}
							/>
							<Route exact path='/about' component={About} />
							<Route
								exact
								path='/user/:login'
								render={(props) => (
									<User
										{...props}
										getUser={this.getUser}
										getUserRepos={this.getUserRepos}
										user={user}
										repos={repos}
										loading={loading}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
