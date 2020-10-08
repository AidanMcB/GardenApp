import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Grid, Image, Button, Segment, Container } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { createMedia } from "@artsy/fresnel";
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

    const { MediaContextProvider, Media } = createMedia({
        breakpoints: {
            sm: 0,
            md: 768,
            ml: 890,
            lg: 1024,
            xl: 1192,
        },
    })


    if (user == undefined || user == null) {
        return <h1>loading...</h1>
    }
    return (
        //this page may only render if user is logged in
        <div>
            <MediaContextProvider>
                <Media greaterThanOrEqual="ml">
                    <div className="header-container" style={{ textAlign: "center" }}>
                        <Container style={{
                            marginTop: "1.5em",
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
                    }} divided>
                        <Grid.Row columns={6}>
                            {crops.map((crop, index) =>
                                <Grid.Column key={index}>
                                    <Container
                                        size="small"
                                        style={{
                                            padding: "10px",
                                            border: "2px solid green",
                                            borderRadius: "25px",
                                            marginBottom: '5px',
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
                        </Grid.Row>
                    </Grid>
                </Media>
                <Media lessThan='ml'>
                    <div className="header-container" style={{ textAlign: "center" }}>
                        <Container style={{
                            display: "inline-block",
                            marginTop: "1.5em",
                            marginBottom: "1.5em",
                            border: "2px solid black",
                            borderRadius: "25px",
                            padding: "10px",
                            fontWeight: "bold",
                            backgroundColor: "#1b1c1d",
                            opacity: "75%",
                            width: "50%"
                        }}>
                            <Header size="huge"
                                style={{
                                    textAlign: "center",
                                    color: "rgb(255,250,250)",
                                    fontSize: "26px",
                                    textShadow: "1px 1px 0 black"
                                }}>{user.username}'s Garden
                            </Header>
                        </Container>
                    </div>
                    <br />
                    <Grid style={{
                        marginLeft: "5px",
                        marginRight: "5px"
                    }} divided>
                        <Grid.Row columns={4}>
                            {crops.map((crop, index) =>
                                <Grid.Column key={index} style={{
                                    padding: '0',
                                    margin: '0px 0px 10px 0px',
                                }}>
                                    <Container
                                        style={{
                                            fontSize:"12px",
                                            textAlign: "center",
                                            width: "100%",
                                            height: "100%",
                                            margin: '0',
                                            padding: "2px",
                                            borderRadius: "5px",
                                            backgroundColor: "rgb(255,250,250, .55)",
                                        }}
                                        onClick={() => handleClick(crop.id)}>
                                        <Header >{crop.name}</Header>
                                        <Image fluid rounded src={crop.image_path} />
                                    </Container>
                                </Grid.Column>
                            )}
                        </Grid.Row>
                    </Grid>
                </Media>
            </MediaContextProvider>
        </div>
    )
}