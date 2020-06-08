import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Button } from 'antd/es';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { logoutUser, getPublications } from '../store/actions';

const Header = ({ history }) => {

	const data = useSelector(store => store.authReducers);
	const dispatch = useDispatch();

	useEffect(() => {
		if (data.token === "")
			history.push('/login');
	}, [data, history]);

	useEffect(() => {
		dispatch(getPublications());
	}, [dispatch])

	const logout = () => {
		dispatch(logoutUser());
		Cookies.remove('token');
		history.push('/login');
	}

	return (
		<Row type="flex" align="middle" justify="space-between" className="header-container">
			<Col xs={0} md={4} lg={3} onClick={() => history.push('/home')}>
				<h1 className="title-h1 cursor-pointer">THPGram</h1>
			</Col>
			<Col xs={2} md={0} onClick={() => history.push('/home')}>
				<h1 className="title-h1 cursor-pointer">U</h1>
			</Col>
			<Col xs={8} md={10} lg={14}>
			</Col>
			<Col xs={3} md={2} lg={1}>
			</Col>
			<Col xs={3} md={2} lg={1}>
			</Col>
			<Col xs={0} md={3} lg={2}>
				<Button type="ghost" icon="user" onClick={() => history.push('/profile')}>
					Profil
        		</Button>
			</Col>
			<Col xs={0} md={3} lg={2}>
				<Button type="danger" icon="logout" onClick={logout}>
					Logout
        		</Button>
			</Col>
			<Col xs={2} md={0}>
				<Button type="ghost" icon="user" onClick={() => history.push('/profile')} />
			</Col>
			<Col xs={2} md={0}>
				<Button type="danger" icon="logout" onClick={logout} />
			</Col>
		</Row>
	);
}

export default withRouter(Header);