// const currentState = {
//     plant: [{name: "geranium",color: "white"}, {name: "bagonia", color: "scarlett"}]
// }

// const PlantReducer = (state, action) => {
//     switch(action.type){
//         case 'CHANGE_COLOR':
//            let planty =  state.plants.indexOf(action.plant)
//             action.plant.color = action.color
//             return {
//                 ...state,
//                 plants: [...state.plants.slice(0, planty),
//                      action.plant,
//                      ...state.plants.slice(planty +1) ]
//             }
//         break
//     }
//     return state
// }

// export default PlantReducer