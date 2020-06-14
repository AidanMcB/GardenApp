import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
import PlantReducer from './PlantReducer'
import CropReducer from './CropReducer'
import WeatherReducer from './WeatherReducer'
import PostsReducer from './PostsReducer'

function MainReducer (currentState, action) {
   currentState = UserReducer(currentState, action)
   // currentState = PlantReducer(currentState, action)
   currentState = CropReducer(currentState, action)
   // currentState = WeatherReducer(currentState, action)
   currentState = PostsReducer(currentState,action)
   return currentState
}

export default MainReducer




