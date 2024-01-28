const WeatherReducer = (state, action) => {
	switch (action.type) {
		case "SET_WEATHER":
			return {
				...state,
			};
	}
	return state;
};

export default WeatherReducer;
