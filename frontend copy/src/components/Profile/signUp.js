import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
	Button,
	Form,
	Grid,
	Header,
	Message,
	Segment,
	Label,
} from 'semantic-ui-react';
import { useSelector, useDispatch, connect } from 'react-redux'

export default function SignUp(props) {

	let errorMessage = useSelector(state => state.errorMessage)
	let history = useHistory()
	let dispatch = useDispatch()

	// *SIGN UP* //
	const handleSignUp = (newUserInfo, e) => {
		e.preventDefault()
		fetch('http://localhost:3000/signUp', {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({ newUserInfo })
		})
			.then(resp => resp.json())
			.then(x => {
				console.log("user signing up", x)

				if (x.success) {
					localStorage.city = x.user.city
					dispatch({ type: 'SIGN_UP', user: x.user })
					dispatch({ type: 'ACCESS_GARDEN', crops: x.crops })
					history.push("/")
				}
				else {
					dispatch({ type: 'FAIL_SIGN_UP', errorMessage: 'This username already exists' })
				}
			})
	}


	let [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
		city: ''
	})
	// console.log("signup function", user)

	let setValue = (key, value) => {
		setUser({ ...user, [key]: value })
	}

	return (
		<Grid centered columns={2}>
			<Grid.Column>
				<Header as="h1" textAlign="center">
					Sign Up
                </Header>
				{errorMessage != undefined ? <Message color='red'>{errorMessage}</Message> : null}
				<Segment>
					<Form size="large"
						onSubmit={(e) => (handleSignUp(user, e))}>
						<Label>Username</Label>
						<Form.Input
							fluid
							icon="user"
							iconPosition="left"
							placeholder="Username"
							name="username"
							onChange={(e) => setValue("username", e.target.value)}
						/>
						<Label>Email</Label>
						<Form.Input
							fluid
							//   icon="email"
							//   iconPosition="left"
							placeholder="Email"
							name="email"
							type="email"
							onChange={(e) => setValue("email", e.target.value)}
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
						<Label>City</Label>
						<Form.Input
							fluid
							icon="user"
							iconPosition="left"
							placeholder="City"
							name="city"
							onChange={(e) => setValue("city", e.target.value)}
						/>

						<Button color="blue" fluid size="large">
							Sign Up
                    </Button>
					</Form>
				</Segment>
				<Message>
					Already have an account? <a href="/login">Login</a>
				</Message>
			</Grid.Column>
		</Grid>
	);

}
