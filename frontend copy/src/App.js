import React, { useEffect } from 'react';
import CropPage from './components/Garden/CropPage'
import 'semantic-ui-css/semantic.min.css';
import LoginForm from './components/Profile/loginForm';
import WeatherPage from './components/Homepage/WeatherPage';
import HomePage from './components/Homepage/HomePage'
import ProfilePage from './components/Profile/ProfilePage'
import MessageBoard from './components/MessageBoard/MessageBoard'
import NavBar from './components/Homepage/NavBar'
import GardenPage from './components/Garden/GardenPage'
import NewPost from './components/MessageBoard/NewPost'
import { BrowserRouter, Route, useHistory, Switch } from 'react-router-dom'
import SignUp from './components/Profile/signUp'
import AddACrop from './components/Garden/AddACrop'
import { useSelector, useDispatch } from 'react-redux'

function App() {

	let user = useSelector(state => state.user)

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
			.then(resp => resp.json())
			.then(userLogin => {
				// if there is a user, send action to go in as user(.user?)
				if (userLogin.error == undefined) {
					localStorage.city = userLogin.city
					dispatch({ type: 'LOGIN', user: userLogin })
					dispatch({ type: 'ACCESS_GARDEN', crops: userLogin.garden.crops })
				}
			})
		//add a .then or fetch inside

	}, [])

	
	return (
		<BrowserRouter >
			<NavBar />
			<Route exact path="/message_board" component={MessageBoard} />
			<Route exact path="/newPost" component={NewPost} />
			<Route exact path='/' component={HomePage} />
			<Route exact path="/weather" component={WeatherPage} />
			<Route exact path="/crops/:id" component={CropPage} />
			<Route exact path="/login" component={() => <LoginForm />} />
			<Route exact path="/signUp" component={() => <SignUp />} />
			<Route exact path="/profile" component={() => <ProfilePage createAGarden={createAGarden} />} />
			{user != null ?
				<Route exact path="/garden" component={GardenPage} />
				: null}
			<Route exact path="/add_crop" component={AddACrop} />

		</BrowserRouter>
	);
}

export default App;
