import React, { useEffect } from 'react';
import CropPage from './components/Garden/CropPage'
import 'semantic-ui-css/semantic.min.css';
import LoginForm from './components/Profile/loginForm';
import WeatherPage from './components/Homepage/WeatherPage';
import HomePage from './components/Homepage/HomePage'
import ProfilePage from './components/Profile/ProfilePage'
import MessageBoard from './components/MessageBoard/MessageBoard'
import MyGardenPage from './components/Garden/MyGardenPage'
import NavBar from './components/Homepage/NavBar'
import GardenPage from './components/Garden/GardenPage'
import NewPost from './components/MessageBoard/NewPost'
import { BrowserRouter, Route, useHistory, Switch } from 'react-router-dom'
import SignUp from './components/Profile/signUp'
import AddACrop from './components/Garden/AddACrop'
import { useSelector, useDispatch } from 'react-redux'

function App() {

	let user = useSelector(state => state.user)
	let background = useSelector(state => state.background)

	let dispatch = useDispatch()
	let history = useHistory()

	// *CREATE A GARDEN* //
	const createAGarden = (user) => {
		fetch(`http://localhost:3000/gardens`, {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}, body: JSON.stringify({
				name: `${user.username}'s Garden`,
				user_id: user.id
			})

		})
	}
	//want this to run whenever the app is 
	//loaded  OR the state changes
	//to check to see if a user is logged in
	useEffect(() => {
		fetch(`http://localhost:3000/get_user`, {
			credentials: 'include'
		})
			.then(resp => {
				if (resp.ok) {
					return resp.json()
				} else {
					throw new Error('No user logged in')
				}
			})
			.then(userLogin => {
				// if there is a user, send action to go in as user(.user?)
				if (userLogin.error == undefined) {
					localStorage.zip = userLogin.zip
					dispatch({ type: 'LOGIN', user: userLogin })
					dispatch({ type: 'ACCESS_GARDEN', crops: userLogin.garden.crops })
				}
			})
			.catch( error => {
				console.log(error)
			})
		//add a .then or fetch inside

	}, [])
	// backgroundSize:"cover"
	//current background in state
	//crop page floating outside or inside
	return (
		<div style={{
			backgroundColor: "rgb(34,139,34,0.50)",
			// backgroundColor: "rgb(255,250,250)",
			backgroundSize: '100% auto',
			height: "100vh",
			overflow: "scroll"

		}}>
			<BrowserRouter >
				<NavBar />
				<Route exact path="/message_board" component={MessageBoard} />
				<Route exact path="/newPost" component={NewPost} />
				<Route exact path='/' component={HomePage} />
				<Route exact path="/weather" component={WeatherPage} />
				<Route exact path="/crops/:id" component={CropPage} />
				<Route exact path="/login" component={() => <LoginForm />} />
				<Route exact path="/signUp" component={() => <SignUp />} />
				<Route exact path="/profile/:id" component={() => <ProfilePage createAGarden={createAGarden} />} />

				<Route exact path="/garden/:id" component={GardenPage} />
				<Route exact path="/my_garden" component={MyGardenPage} />
				<Route exact path="/add_crop" component={AddACrop} />

			</BrowserRouter>
		</div>
	);
}

export default App;
