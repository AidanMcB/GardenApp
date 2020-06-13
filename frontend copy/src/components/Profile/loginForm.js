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
			.then(resp => resp.json())
			.then(response => {
				console.log(response.user.city)
				if (response.success) {
					dispatch({ type: 'LOGIN', user: response.user })
					dispatch({ type: 'ACCESS_GARDEN', crops: response.crops})
					localStorage.city = response.user.city
					history.push('/profile')
				}
				else {
					dispatch({ type: 'FAIL_LOGIN', errorMessage: 'Incorrect Username or Password' })
				}
			})
	}

	let [user, setUser] = useState({
		username: '',
		email: '',
		password: ''
	})

	let setValue = (key, value) => {
		setUser({ ...user, [key]: value })
	}

	return (
		<Grid centered columns={2}>
			<Grid.Column>
				<Header as="h1" textAlign="center">
					Login
      </Header>
				{errorMessage != undefined ? <Message color='red'>{errorMessage}</Message> : null}
				<Segment>
					<Form size="large"
						onSubmit={(e) => handleLogin(user, e)}>
						<Label>Username</Label>
						<Form.Input
							fluid
							icon="user"
							iconPosition="left"
							placeholder="Username"
							name="username"
							onChange={(e) => setValue("username", e.target.value)}
						/>
						<Label>Password</Label>
						<Form.Input
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