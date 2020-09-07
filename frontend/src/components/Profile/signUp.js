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

	function isValidUSZip(sZip) {
		return /^\d{5}(-\d{4})?$/.test(sZip);
	 }

	// *SIGN UP* //
	const handleSignUp = (newUserInfo, e) => {
		e.preventDefault()
		console.log(newUserInfo.zip)
		if(isValidUSZip(newUserInfo.zip) == false){
			dispatch({type: 'INVALID_ZIP_CODE', errorMessage: 'Invalid Zip Code. Must be a valid U.S. zip code with 5 numeric digits'})
		}else{
		fetch('http://localhost:3000/signUp', {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({ newUserInfo })
		})
			.then(resp => {
				if(resp.ok){
					return resp.json()
				} else {
					throw new Error('Could not hit the server');
				}
			})
			.then(x => {
				if (x.success) {
					//check here as well!!!
					localStorage.zip = x.user.zip
					dispatch({ type: 'SIGN_UP', user: x.user })
					dispatch({ type: 'ACCESS_GARDEN', crops: x.crops })
					history.push("/")
				}
				else {
					dispatch({ type: 'FAIL_SIGN_UP', errorMessage: 'This username already exists' })
				}
			})
			.catch( error => {
				console.log(error)
				dispatch({ type: 'FAIL_SERVER', errorMessage: 'Failed to Connect To The Server'})
			})
		}
	}
	

	let [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
		city: '',
		zip: ''
	})
	// console.log("signup function", user)

	let setValue = (key, value) => {
		setUser({ ...user, [key]: value })
	}

	return (
		<Grid centered columns={2}>
			<Grid.Column style={{
				padding:"100px"
			}}>
				<Header as="h1" textAlign="center"
				style={{
					color:"black"
				}}>
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
							pattern="[0-9]*"
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
							// icon="user"
							// iconPosition="left"
							placeholder="City"
							name="city"
							onChange={(e) => setValue("city", e.target.value)}
						/>
						<Label>Zip Code</Label>
						<Form.Input
							fluid
							// icon="user"
							// iconPosition="left"
							placeholder="Zip Code"
							name="zip"
							onChange={(e) => setValue("zip", e.target.value)}
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
