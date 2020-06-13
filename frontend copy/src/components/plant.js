// import React, { Component } from 'react'
// import { useSelector, useDispatch } from 'react-redux'

// function Plant(props) {
//     const plants = useSelector(state => state.plants)
//     const dispatch = useDispatch()

//     return (
//         console.log(plants),
//         <div>
//             Plant Component
//             {plants.map ( plant => (
//             <button onClick={() => dispatch({ type: 'CHANGE_COLOR', plant: plant, color: "blue"}) }>
//                 {plant.name}<br/>
//                 {plant.color}
//             </button>
//             ))}
//         </div>
//     )
// }

// export default Plant