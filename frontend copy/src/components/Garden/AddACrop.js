import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Image, Button, Message, Search, Input, Label, Popup } from 'semantic-ui-react'
import UserReducer from '../../Redux/reducers/UserReducer'

export default function AddACrop(props) {

    let user = useSelector(state => state.user)
    let searchResults = useSelector(state => state.searchResults)

    let [search, changeSearch] = useState("")
    let [numberPlanted, setNumberPlanted] = useState(0)
    let [errorMessage, setErrorMessage] = useState("")

    let history = useHistory()
    let dispatch = useDispatch()

    // ** GET A LIST OF CROPS THAT MATCH THE SEARCH TERM ** //
    const GetCrop = (searchItem) => {
        fetch(`https://openfarm.cc/api/v1/crops?filter=${searchItem}`)
            .then(resp => resp.json())
            .then(cropResult => {
                let cropsFound = cropResult.data
                dispatch({ type: 'SEARCH_RESULTS', cropsFound })
            })
    }

    // ** LOGIC FOR ADDING A CROP TO THE GARDEN ** //
    const AddCrop = (chosenCrop, amount) => {
        console.log(amount)
        if (amount < 1) {
            console.log("you haven't added any crops!")
            setErrorMessage(
                errorMessage = "You haven't added any crops yet!"
            )
        } else {
            let cropInfo = chosenCrop.attributes
            fetch(`http://localhost:3000/crops`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: cropInfo.name,
                    description: cropInfo.description,
                    sun_requirements: cropInfo.sun_requirements,
                    sowing_method: cropInfo.sowing_method,
                    height: cropInfo.height,
                    image_path: cropInfo.main_image_path,
                    growing_days: cropInfo.growind_degree_days,
                    day_planted: new Date(),
                    number_planted: amount,
                    garden_id: user.garden.id
                })
            })
                .then(resp => resp.json())
                .then(newCrop => {
                    dispatch({ type: 'ADD_CROP_TO_MY_GARDEN', newCrop })
                    history.push('/garden')
                })
        }

    }

    return (
        // consider switching to a search bar?
        //consider adding confirmation
        <div class="wholePage" style={{ textAlign: "center" }} >
            <div class="ui action input">
                <input onChange={(e) => changeSearch({ search: e.target.value })}
                    type="text" placeholder="Search..." />
                <button class="ui button"
                    onClick={() => GetCrop(search.search)}
                >Search</button>
            </div>
            <br /><br />
            {errorMessage != "" ? <Message color="red">{errorMessage}</Message> : null}
            <div style={{ textAlign: "center" }}>
                {searchResults != [] ? searchResults.map(crop => (
                    <div >
                        <Label
                            size='big'
                            color="olive"
                            href="#">{crop.attributes.name}</Label>
                        <Button
                            onClick={() => AddCrop(crop, numberPlanted)}>Confirm</Button>
                        <br /> <br />
                        <img
                            class="ui medium centered image"
                            src={crop.attributes.main_image_path}
                            alt={crop.attributes.name}
                        /> <br />
                        <Button icon='minus'
                            onClick={() => setNumberPlanted(
                                numberPlanted > 0 ? numberPlanted -= 1 : numberPlanted = 0)}
                        />
                        <Button icon='add'
                            onClick={() => setNumberPlanted(numberPlanted += 1)}
                        />
                        <label>{numberPlanted}</label>
                        <br /><br />
                    </div>
                ))
                    : null
                }

            </div>
        </div>
    )
}
