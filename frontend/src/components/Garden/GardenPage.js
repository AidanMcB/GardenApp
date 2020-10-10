import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Container, Grid, Image } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'


export default function GardenPage(props) {

    let history = useHistory()

    let [crop, setCrop] = useState()

    let crops = useSelector(state => state.displayedCrops)
    let user = useSelector(state => state.user)

    let dispatch = useDispatch()
    let gardenId = props.match.params.id
    console.log(gardenId)
    let garden = useSelector(state => state.garden)
    console.log(garden)
    //build a default farm logo for crops without images

    // fetch specific garden crops
    useEffect(() => {
        fetch(`http://localhost:3000/gardens/${gardenId}`)
            .then(res => res.json())
            .then(garden => {
                console.log(garden)
                dispatch({ type: 'DISPLAYED_CROPS', crops: garden.crops })
                dispatch({ type: 'SET_A_GARDEN', garden: garden })
            })
    }, [])


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

    if (user === undefined) {
        return <h1>loading...</h1>
    }
    console.log(crops, garden)
    return (
        <div>
            <Container style={{
                marginTop: "40px",
                border: "2px solid black",
                borderRadius: "25px",
                padding: "20px",
                fontWeight: "bold",
                backgroundColor: "#1b1c1d",
                opacity: "75%"
            }}>
                <Header size="huge"
                    style={{
                        textAlign: "center",
                        color: "rgb(255,250,250)",
                        fontSize: "46px",
                        textShadow: "1px 1px 0 black"
                    }} >{garden.name}
                </Header>
            </Container>
            <Grid style={{ 
                marginLeft: "10px",
                 marginRight: "10px",
                 marginTop:"20px" }}
                  columns={6} divided>
                {crops.map(crop =>
                    <Grid.Column>
                        <Container
                            style={{
                                padding: "10px",
                                border: "2px solid green",
                                borderRadius: "25px",
                                backgroundColor: "rgb(255,250,250, .55)",
                                // background: "rgb(34,139,34,0.55)"
                            }}
                            onClick={() => handleClick(crop.id)}>
                            <Header>{crop.name}</Header>
                            <p>({crop.number_planted})</p>
                            <label>Planted:</label>
                            <br />
                            <text>{crop.day_planted.substr(0, 10)}</text>
                            <Image
                                style={{
                                    height: "200px",
                                    width: "200px"
                                }}
                                size="circular medium"
                                src={crop.image_path} />
                        </Container>
                    </Grid.Column>
                )}
            </Grid>
        </div>
    )
}