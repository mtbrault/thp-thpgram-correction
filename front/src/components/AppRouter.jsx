import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Divider from './Divider';
import Header from './Header';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

const AppRouter = () => (
	<>
		<Header />
		<Divider />
		<Switch>
			<Route exact path="/profile" component={Profile} />
			<Route exact path="/home" component={Home} />
			<Route path="/" render={() => <Redirect to="/home" />} />
		</Switch>
	</>
);

export default AppRouter;