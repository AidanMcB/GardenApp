const CropReducer = (state, action) => {

    switch (action.type) {
        case 'ACCESS_GARDEN':
            return {
                ...state,
                crops: action.crops
            }
            break
        case 'DISPLAYED_CROPS':
            return {
                ...state,
                displayedCrops: action.crops
            }
            break
        case 'ADD_CROP_TO_MY_GARDEN':
            return {
                ...state,
                crops: [...state.crops, action.newCrop]
            }
            break
        case 'SEARCH_RESULTS':
            return {
                ...state,
                searchResults: action.cropsFound
            }
        case 'DELETE_A_CROP':
            
            return {
                ...state,
                crops: [...state.crops.filter( crop => crop.id != action.crop.id)]
            }
    }
    return state
}
export default CropReducer