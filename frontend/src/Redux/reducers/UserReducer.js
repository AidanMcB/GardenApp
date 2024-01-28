const UserReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				user: action.user,
				errorMessage: undefined,
			};
		case "FAIL_LOGIN":
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case "FAIL_SERVER":
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case "INVALID_ZIP_CODE":
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case "LOGOUT":
			return {
				...state,
				user: null,
			};
		case "SIGN_UP":
			return {
				...state,
				user: action.user,
				errorMessage: undefined,
			};
		case "FAIL_SIGN_UP":
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		default:
			return state;
	}
};

export default UserReducer;
