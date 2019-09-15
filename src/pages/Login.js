'use strict';

import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { loginUser, registerUser } from '../lib/redux/actions/auth';

const Login = ({ dispatch }) => {
	const [email, setEmail] = useState('');

	const onEmailChanged = useCallback(
		e => {
			setEmail(e.target.value);
		},
		[setEmail]
	);
	const [password, setPassword] = useState('');

	const onPasswordChanged = useCallback(
		e => {
			setPassword(e.target.value);
		},
		[setPassword]
	);

	const loginCb = useCallback(() => dispatch(loginUser(email, password)), [dispatch, email, password]);
	const registerCb = useCallback(() => dispatch(registerUser(email, password)), [dispatch, email, password]);

	return (
		<Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
			<Grid item xs={4}>
				<Card>
					<CardHeader title="Login" />
					<CardContent>
						<TextField required label="email" value={email} onChange={onEmailChanged} />
						<br />
						<TextField
							required
							label="password"
							type="password"
							value={password}
							onChange={onPasswordChanged}
						/>
						<Button onClick={registerCb}>Register</Button>
						<Button onClick={loginCb}>Login</Button>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default connect()(Login);
