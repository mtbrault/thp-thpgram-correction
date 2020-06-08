import React, { useState } from 'react';
import {
	Card, Row, Col, Button, message,
} from 'antd/es';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/actions';
import InputComponennt from '../../components/InputComponent';

const Login = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [show, setShow] = useState(false);

	const dispatch = useDispatch();

	const submitForm = () => {
		if (email === '' || password === '')
			return message('You need to fill all the field', 3);
		dispatch(loginUser(email, password))
			.then(res => {
				Cookies.set('token', res.token);
				history.push('/');
			})
			.catch(() => {
				message.error('Error while loging', 3);
			});
	}

	return (
		<>
			<Row type="flex" justify="center">
				<Col lg={7} md={10} sm={16} xs={24}>
					<Card bordered>
						<h1 className="text-center">THPGram</h1>
						<InputComponennt id="email" title="Email" type="text" onChange={setEmail} value={email} />
						<InputComponennt
							id="password"
							title="Password"
							type={show ? 'text' : 'password'}
							suffix={<Button type="ghost" icon={show ? 'eye-invisible' : 'eye'} onClick={() => setShow(!show)} />}
							onChange={setPassword}
							value={password}
						/>
						<Row type="flex" justify="center">
							<Col span={24} className="btn-center">
								<Button type="primary" onClick={submitForm}>
									Login
				  				</Button>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
			<Row type="flex" justify="center" className="container">
				<Col lg={7} md={10} sm={16} xs={24} className="text-center">
					<Card bordered>
						<Row type="flex" align="middle" justify="start">
							<Col span={12}>Yout don't have an account ?</Col>
							<Col span={12}>
								<Button type="link" onClick={() => history.push('/register')}>Register yourself</Button>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default Login;