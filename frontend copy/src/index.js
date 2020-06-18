import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import MainReducer from './Redux/reducers/MainReducer'
import { createStore } from 'redux'


//consider adding garden object with a plants key equal to an array 
//or figure out how to access the useEffect getUser functino
//response to work with the garden object
//relationship between garden and crops passed from rails to react?
let initialState = {
	user: null,
	crops: [],
	displayedCrops: [],
	searchResults: [],
	posts: [],
	garden: {},
	background: '',
}
//pass in initialState below
const store = createStore(MainReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
	<Provider store={store}>
		<App  />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
