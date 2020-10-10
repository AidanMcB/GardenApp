const CropReducer = (state, action) => {

    switch (action.type) {
        case 'ACCESS_GARDEN':
            return {
                ...state,
                crops: action.crops
            }
        case 'GARDEN_BACKGROUND':
            return {
                ...state,
                background: {
                    ...state.background,
                    color: action.background,
                    // height: "window.innerHeight"
                }
            }
        case 'HOME_BACKGROUND':
            return {
                ...state,
                background: {
                    ...state.background, 
                    position: ""
                }
            }
        case 'SET_A_GARDEN':
            return {
                ...state,
                garden: action.garden
            }
        case 'DISPLAYED_CROPS':
            return {
                ...state,
                displayedCrops: action.crops
            }
        case 'ADD_CROP_TO_MY_GARDEN':
            return {
                ...state,
                crops: [...state.crops, action.newCrop]
            }
        case 'UPDATE_CROPS':
            let index = state.crops.findIndex( crop => crop.id === action.crop.id)
            return {
                ...state,
                crops: [
                    ...state.crops.slice(0, index), action.crop, ...state.crops.slice(index +1)
                ] 
            }
        case 'SEARCH_RESULTS':
            return {
                ...state,
                searchResults: action.cropsFound
            }
        case 'DELETE_A_CROP':
            return {
                ...state,
                crops: [...state.crops.filter(crop => crop.id !== action.crop.id)]
            }
    }
    return state
}
export default CropReducer