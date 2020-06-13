const WeatherReducer = (state, action) => {

    switch (action.type) {
        case 'SET_WEATHER':
            console.log(action)
            return {
                ...state

            }
    }
    return state
}

export default WeatherReducer