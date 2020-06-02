import React, { useState, useEffect } from 'react';
import {
	Card, Row, Col, Button, message,
} from 'antd/es';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/actions';
import InputComponent from '../../components/InputComponent';

const Register = ({ history }) => {
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const submitForm = () => {
		const regMail = new RegExp('([A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3})$');

		if (username === '' || email === '' || password === '' || firstname === '' || lastname === '')
			message.error('You need to fill each field', 3);
		else if (!regMail.test(email))
			message.error('Bad email format', 3);
		else if (password !== passwordConfirm)
			message.error('Your 2 password must match', 3);
		else {
			dispatch(registerUser(email, password))
				.then(() => {
					message.success('You are well registered, you can now login !', 3);
				})
				.catch((err) => {
					if (err.response)
						message.error(err.response.data.message, 3);
					else
						message.error("Impossible to connnect to API", 3);
				});
		}
	};

	return (
		<>
			<Row type="flex" justify="center">
				<Col lg={7} md={10} sm={16} xs={24}>
					<Card bordered>
						<h1 className="text-center">THPGram</h1>
						<InputComponent id="email" title="EMail" type="text" onChange={setEmail} value={email} />
						<InputComponent id="username" title="Username" type="text" onChange={setUsername} value={username} />
						<InputComponent id="firstname" title="Firstname" type="text" onChange={setFirstname} value={firstname} />
						<InputComponent id="lastname" title="Lastname" type="text" onChange={setLastname} value={lastname} />
						<InputComponent
							id="password"
							title="Password"
							type={show ? 'text' : 'password'}
							suffix={<Button type="ghost" icon={show ? 'eye-invisible' : 'eye'} onClick={() => setShow(!show)} />}
							onChange={setPassword}
							value={password}
						/>
						<InputComponent
							id="passwordConfirm"
							title="Password Confirmation"
							type={show ? 'text' : 'password'}
							suffix={<Button type="ghost" icon={show ? 'eye-invisible' : 'eye'} onClick={() => setShow(!show)} />}
							onChange={setPasswordConfirm}
							value={passwordConfirm}
						/>
						<Row type="flex" justify="center">
							<Col span={20} className="btn-center">
								<Button type="primary" onClick={submitForm}>
									Register
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
							<Col span={12}>You already have an account ?</Col>
							<Col span={12}>
								<Button type="link" onClick={() => history.push('/login')}>Login yourself</Button>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default Register;
