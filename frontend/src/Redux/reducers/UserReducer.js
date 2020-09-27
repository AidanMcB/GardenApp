import PostsReducer from "./PostsReducer"

const UserReducer = (state, action) => {
 
    let user = action.user
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.user,
                errorMessage: undefined
            }
            break
        case 'FAIL_LOGIN':
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        case 'FAIL_SERVER':
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        case 'INVALID_ZIP_CODE':
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
            break
        case 'SIGN_UP':
            
            return {
                ...state,
                user: action.user,
                errorMessage: undefined
            }
            break
        case 'FAIL_SIGN_UP':
            return {
                ...state,
                errorMessage: action.errorMessage
            }
            break
    }
    return state
}

export default UserReducer