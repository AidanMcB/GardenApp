import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Grid, Image, Button, Segment, Container } from 'semantic-ui-react'
import AddACrop from './AddACrop'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import UserReducer from '../../Redux/reducers/UserReducer'

export default function GardenPage(props) {
    
    let history = useHistory()
    
    let [crop, setCrop] = useState()
    let user = useSelector( state => state.user)
    let crops = useSelector(state => state.displayedCrops)
    let background = useSelector( state => state.background)
    
    
    useEffect(() => {
        dispatch({type: 'GARDEN_BACKGROUND', background: "#98FB98"})
        fetch(`http://localhost:3000/get_user`, {
            credentials: 'include'
		})
        .then(resp => resp.json())
        .then(userLogin => {
            console.log(userLogin)
            if (userLogin.error == undefined) {
                localStorage.zip = userLogin.zip
                dispatch({ type: 'LOGIN', user: userLogin })
                dispatch({type: 'DISPLAYED_CROPS', crops: userLogin.garden.crops})
                dispatch({type: 'SET_A_GARDEN', garden: userLogin.garden})

                }
            })
        }, [] )
	
    console.log("current user", user)

    let dispatch = useDispatch()
   
    let changeBackground = () => {
        dispatch({type: 'GARDEN_BACKGROUND', background: "blue"})
    }
    // let garden = user.city.garden.id

    const handleClick = (id) => {
        fetch(`http://localhost:3000/crops/${id}`)
            .then(res => res.json())
            .then(crop => {
                setCrop({
                    crop
                })
                history.push(`/crops/${crop.id}`)
            })
    }

    if (user == undefined || user == null) {
        return <h1>loading...</h1>
    }
    // console.log(crops, garden)
    return (
        
        //this page may only render if user is logged in
        <div >
            <Header as="h1" style={{ textAlign: "center" }}>{user.username}'s Garden
        <br/>
        <Button onClick={() => history.push('/add_crop')}>Add a Crop</Button>
            </Header>
            <Grid style={{ marginLeft: "10px", marginRight: "10px" }} columns={3} divided>
                {crops.map(crop =>
                    <Grid.Column>
                        <Container
                         style={{padding:"10px", 
                         border:"2px solid green", 
                         borderRadius:"25px",
                         fill:"url(blue-green)",
                        //  background:lineardGradient("blue,red")}
                         }}
                         onClick={() => handleClick(crop.id)}>
                            <Header >{crop.name}</Header>
                            <p>({crop.number_planted})</p>
                            <label>Planted:</label>
                            <br />
                            <text>{crop.day_planted.substr(0, 10)}</text>
                            <Image src={crop.image_path} circular />
                        </Container>
                    </Grid.Column>
                )}
            </Grid>
        </div>
    )
}