import UserReducer from './UserReducer'
import CropReducer from './CropReducer'
import PostsReducer from './PostsReducer'

function MainReducer(currentState, action) {
   currentState = UserReducer(currentState, action)
   // currentState = PlantReducer(currentState, action)
   currentState = CropReducer(currentState, action)
   // currentState = WeatherReducer(currentState, action)
   currentState = PostsReducer(currentState, action)
   // currentState = BackgroundReducer(currentState, action)
   return currentState
}

export default MainReducer




