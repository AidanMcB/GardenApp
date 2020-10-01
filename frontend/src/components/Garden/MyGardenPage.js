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
    let user = useSelector(state => state.user)
    let crops = useSelector(state => state.displayedCrops)
    let background = useSelector(state => state.background)

    // "rgb(34,139,34,0.65)"
    useEffect(() => {
        dispatch({ type: 'GARDEN_BACKGROUND', background: "rgb(34,139,34,0.65)" })
        fetch(`http://localhost:3000/get_user`, {
            credentials: 'include'
        })
            .then(resp => resp.json())
            .then(userLogin => {
                if (userLogin.error == undefined) {
                    localStorage.zip = userLogin.zip
                    dispatch({ type: 'LOGIN', user: userLogin })
                    dispatch({ type: 'DISPLAYED_CROPS', crops: userLogin.garden.crops })
                    dispatch({ type: 'SET_A_GARDEN', garden: userLogin.garden })

                }
            })
    }, [])

    let dispatch = useDispatch()

    let changeBackground = () => {
        dispatch({ type: 'GARDEN_BACKGROUND', background: background })
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
    return (
        //this page may only render if user is logged in
        <div>
            <div className="header-container" style={{ textAlign: "center" }}>
                <Container style={{
                    marginBottom: "1.5em",
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
                        }}>{user.username}'s Garden
            </Header>
                </Container>
                <Button
                    style={{
                        color: "white",
                        backgroundColor: "darkgreen",
                        padding: "10px",
                        marginBottom: "20px"
                    }}
                    onClick={() => history.push('/add_crop')}>
                    Add a Crop</Button>
            </div>
            <br />
            <Grid style={{
                marginLeft: "10px",
                marginRight: "10px"
            }} columns={6} divided>
                {crops.map((crop, index) =>
                    <Grid.Column key={index}>
                        <Container
                            size="small"
                            style={{
                                padding: "10px",
                                border: "2px solid green",
                                borderRadius: "25px",
                                backgroundColor: "rgb(255,250,250, .55)",
                            }}
                            onClick={() => handleClick(crop.id)}>
                            <Header >{crop.name}</Header>
                            <p>({crop.number_planted})</p>
                            <label>Planted:</label>
                            <br />
                            <p>{crop.day_planted.substr(0, 10)}</p>
                            <Image fluid rounded src={crop.image_path} />
                        </Container>
                    </Grid.Column>
                )}
            </Grid>
        </div>
    )
}