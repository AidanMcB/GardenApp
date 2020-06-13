import { createStore } from 'redux'
import MainReducer from './Redux/reducers/MainReducer'
import { Action } from './Redux/actions/SaveUserToState'
import { useEffect } from 'react'

//no need to use thunk
//use effect, call fetch inside of there
// after 2nd .then call your dispatch
//call a fetch request to check if there is a current user logged in or not

// write a function checks the session 
//to see if a user is logged in
//if so populate the initial state with the user,
// else empty object

//do we need composeWithDevTools?
