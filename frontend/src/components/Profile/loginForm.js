import React, { useState } from 'react';
import {
	Button,
	Form,
	Grid,
	Header,
	Message,
	Segment,
	Label,
} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function LoginForm(props) {
	let errorMessage = useSelector(state => state.errorMessage)
	let history = useHistory()
	let dispatch = useDispatch()

	// *LOGIN FUNCTION* //
	const handleLogin = (userInfo, e) => {
		e.preventDefault()
		fetch('http://localhost:3000/login', {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}, body: JSON.stringify({ userInfo })
		})
			.then(resp => {
				if (resp.ok) {
					return resp.json();
				} else {
					throw new Error('Something went wrong with the server');
				}
			})
			.then(response => {
				if (response.success) {
					//check this here!!!!
					dispatch({ type: 'LOGIN', user: response.user })
					dispatch({ type: 'ACCESS_GARDEN', crops: response.crops })
					localStorage.zip = response.user.zip
					history.push('/my_garden')
				}
				else {
					dispatch({ type: 'FAIL_LOGIN', errorMessage: 'Incorrect Username or Password' })
				}
			})
			.catch((error) => {
				console.log(error)
				dispatch({ type: 'FAIL_SERVER', errorMessage: 'Failed to Connect To The Server' })
			});

	}

	let [user, setUser] = useState({
		username: '',
		email: '',
		password: ''
	})

	let setValue = (key, value) => {
		setUser({ ...user, [key]: value })
	}
	let randomId = Math.floor((Math.random() * 10000) + 1);

	//mobile 16 tablet 8 computer 4  || largreScreen={2} widescreen={1}
	return (
		<Grid centered columns={2}>
			<Grid.Column style={{ padding: "5em" }} mobile={16} tablet={14} computer={6}>
				<Header as="h1" textAlign="center"> Login </Header>
				{errorMessage !== undefined ? <Message color='red'>{errorMessage}</Message> : null}
				<Segment>
					<Form size="large"
						autoComplete="off"
						role="presentation"
						style={{ autoComplete: "off", role: "presentation" }}
						onSubmit={(e) => handleLogin(user, e)}>
						<Label>Username</Label>
						<input type="password" style={{ "width": 0, "height": 0, "visibility": "hidden", "position": "absolute", "left": 0, "top": 0 }} />
						<Form.Input
							style={{ autoComplete: "off", role: "presentation" }}
							autoComplete="off"
							role="presentation"
							fluid
							id={`${randomId}`}
							icon="user"
							iconPosition="left"
							placeholder="Username"
							name="username"
							onChange={(e) => setValue("username", e.target.value)}
						/>
						<Label>Password</Label>

						<Form.Input
							style={{ autoComplete: "off" }}
							autoComplete="off"
							fluid
							icon="lock"
							iconPosition="left"
							placeholder="Password"
							name="password"
							type="password"
							onChange={(e) => setValue("password", e.target.value)}
						/>

						<Button color="blue" fluid size="large">
							Login
          				</Button>
					</Form>
				</Segment>
				<Message>
					Not registered yet? <a href="/signUp">Sign Up</a>
				</Message>
			</Grid.Column>
		</Grid>
	);
}