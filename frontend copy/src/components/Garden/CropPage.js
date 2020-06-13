import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import { Header, Label, Grid, Image, Button, Segment, Card, Icon, Item, Input, CardDescription } from 'semantic-ui-react'

export default function CropPage(props) {

    //calander framework

    //consider adding when you planted it, how longs its been growing, other info 
    //on the right side of the page
    let user = useSelector(state => state.user)
    let crops = useSelector(state => state.crops)

    let history = useHistory()
    let dispatch = useDispatch()
    let params = useParams()
    let [crop, setCrop] = useState()

    useEffect(() => {
        fetch(`http://localhost:3000/crops/${params.id}`)
            .then(res => res.json())
            .then(crop => {
                setCrop({
                    ...crop
                })
            })
        //rerender when crops is changed(not needed because of history.push)
    }, [])

    const handleDelete = (crop) => {
        fetch(`http://localhost:3000/crops/${crop.id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(deleteResp => {
                if (deleteResp.success) {
                    dispatch({ type: 'DELETE_A_CROP', crop })
                    history.push('/garden')
                }
            })

    }

    const extra = (
        <a>
            <Icon name='user' />
          16 Friends
        </a>
    )

    //build these logos out on figma.com 
    //full sun => sun outline
    //partials sun =>
    //full shade
    const sun = (
        <a>
            <Icon name="sun outline" />
        </a>
    )

    // let today = new Date();
    // let dd = today.getDate();
    // let mm = today.getMonth() + 1; //As January is 0.
    // let yyyy = today.getFullYear();

    // if (dd < 10) dd = '0' + dd;
    // if (mm < 10) mm = '0' + mm;
    // let curday = (yyyy + '-' + mm + '-' + dd);

    const daysGrowing = (plantedDay) => {
        let today = new Date()
        let planted = new Date(plantedDay)
        let diffTime = Math.abs(today - planted)
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        console.log(diffTime + " milliseconds")
        console.log(diffDays + " days")
        return diffDays
    }

    if (crop == undefined) {
        return <h1>loading...</h1>
    }
    return (
        console.log(crop),
        <div class="crop show page" >
            <Grid columns={2} divided >
                <Grid.Column >
                    <div class="ui card" style={{ marginLeft: "20px" }}>
                        <div class="image"><img src={crop.image_path} /></div>
                        <div class="content">
                            <div class="header">{crop.name}</div>
                            <div class="meta">
                                <br />
                                <label>Date Planted:</label><br />
                                {crop.day_planted.substr(0, 10)}
                            </div>
                            <div class="description">
                                <label>Description:</label><br />
                                {crop.description}
                            </div> <br />
                            <div>
                                <label>Sowing Method:</label><br />
                                {crop.sowing_method}
                            </div> <br />
                            <div>
                                <label>Height: </label>
                                {crop.height != null ? crop.height + " inches" : "(not available)"}
                            </div> <br />
                            <div>
                                <label>Days to full grown: </label>
                                {crop.growing_days == null ? "(not available)" : crop.growing_days}
                            </div> <br />
                        </div>
                        <div class="extra content">
                            <a>
                                <i aria-hidden="true" class="sun outline icon">  </i>
                                {crop.sun_requirements}
                            </a>
                        </div>
                    </div>

                    <Button
                        color="red"
                        onClick={() => handleDelete(crop)}
                        style={{ marginLeft: "35px" }}>
                        Remove Crop From My Garden </Button>
                </Grid.Column>
                <Grid.Column >
                    <div> 
                    <Header>{crop.name} Information</Header>
                    <Label>Days I've been growing:</Label>
                    {daysGrowing(crop.day_planted)}
                    <br /> <br />
                    <Label>Amount Planted:</Label>
                    {crop.number_planted}
                    <br /> <br />
                    {/* <Label>Current Height:</Label>
                    <Input placeholder='Height in inches'></Input> */}
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    )
}