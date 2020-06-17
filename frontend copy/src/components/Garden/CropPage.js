import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import { Modal, Header, Checkbox, Form, Label, Grid, Image, Button, Segment, Card, Icon, Item, Input, CardDescription } from 'semantic-ui-react'

export default function CropPage(props) {

    //calander framework

    //consider adding when you planted it, how longs its been growing, other info 
    //on the right side of the page
    let user = useSelector(state => state.user)
    // let crops = useSelector(state => state.crops)

    let history = useHistory()
    let dispatch = useDispatch()
    let params = useParams()

    let [crop, setCrop] = useState()

    let [form, openForm] = useState(false)

    const openWindow = () => {
        openForm(true)
    }

    const closeWindow = () => {
        openForm(false)
    }


    let [editedCrop, editCrop] = useState({})
    // console.log("signup function", user)

    let setValue = (key, value) => {
        editCrop({ ...editedCrop, [key]: value })
    }

    let crops = useSelector(state => state.crops)
    // let crop = crops.find(crop => crop.id == params.id)
    
    useEffect(() => {
        fetch(`http://localhost:3000/crops/${params.id}`)
            .then(res => res.json())
            .then(crop => {
                setCrop({
                    ...crop
                })
                setValue("id", crop.id)
            })
        //rerender when crops is changed(not needed because of history.push)
    }, [])

    const updateCrop = (cropInfo) => {
        closeWindow()
        fetch(`http://localhost:3000/crops/${cropInfo.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }, body: JSON.stringify({ cropInfo })
        })
            .then(res => res.json())
            .then(newCrop => {
                console.log(newCrop)
                dispatch({type: 'UPDATE_CROPS', crop: newCrop})
                setCrop({
                    ...crop, ...newCrop
                })
            })
    }

    const handleDelete = (crop) => {
        fetch(`http://localhost:3000/crops/${crop.id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(deleteResp => {
                if (deleteResp.success) {
                    dispatch({ type: 'DELETE_A_CROP', crop })
                    history.push('/my_garden')
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
        // console.log(diffTime + " milliseconds")
        // console.log(diffDays + " days")
        return diffDays
    }

    if (crop == undefined || user == null || crop.garden == undefined) {
        return <h1>loading...</h1>
    }
    return (
        // console.log(crop, user),
        <div class="crop show page"             >

            <Grid columns={2} divided >
                <Grid.Column >
                    <div class="ui card" style={{ marginLeft: "20px" }}>
                        <div class="image"><img src={crop.image_path} /></div>
                        <div class="content">
                            <div class="header">{crop.name}</div>
                            <div class="meta">
                                <br />
                                <Label>Date Planted:</Label><br />
                                {crop.day_planted.substr(0, 10)}
                            </div>
                            <div class="description">
                                <Label>Description:</Label><br />
                                {crop.description}
                            </div> <br />
                            <div>
                                <Label>Sowing Method:</Label><br />
                                {crop.sowing_method}
                            </div> <br />
                            <div>
                                <Label>Height: </Label>
                                {crop.height != null ? crop.height + " inches" : "(not available)"}
                            </div> <br />
                            <div>
                                <Label>Days to full grown: </Label>
                                {crop.growing_days == null ? 80 : crop.growing_days}
                            </div> <br />
                        </div>
                        <div class="extra content">
                            <a>
                                <i aria-hidden="true" class="sun outline icon">  </i>
                                {crop.sun_requirements}
                            </a>
                        </div>
                    </div>
                    {user.id == crop.garden.user_id ?
                        <Button
                            color="red"
                            onClick={() => handleDelete(crop)}
                            style={{ marginLeft: "35px" }}>
                            Remove Crop From My Garden </Button>
                        : null}
                </Grid.Column>
                <Grid.Column >
                    <div>
                        <Header as="h1">{crop.name} Information</Header>
                        <Label size="large teal">Days I've been growing:</Label>
                        {daysGrowing(crop.day_planted)}
                        <br /> <br />
                        <Label size="large teal">Amount Planted:</Label>
                        {crop.number_planted}
                        <br /> <br />
                        <Label size="large teal">Days Until Expected Harvest:</Label>
                        {crop.growing_days == null ? (80 - (daysGrowing(crop.day_planted))) : (crop.growing_days - (daysGrowing(crop.day_planted)))}
                        <br /> <br />
                        <Label size="large teal">Current Height:</Label>
                        {crop.current_height == null ? 0 + " inches" : crop.current_height + " inches"}
                        <br /> <br />
                        <Label size="large teal">Quantity Returned</Label>
                        {crop.quantity_returned == null ? 0 : crop.quantity_returned}
                        <br /> <br />
                        <Label size="large teal">Current Status of Crop</Label>
                        {crop.status_of_plant}
                        <br /> <br />
                        {user.id == crop.garden.user_id ?
                            <div>
                                {/* <Label>Update Crop Info</Label> */}
                                  
                                <Button style={{marginBottom:"30px"}}
                                    onClick={openWindow}>
                                    Update Crop Info
                    </Button>
                            </div>
                            : null}
                        <Modal open={form}>
                            <Form style={{ textAlign: "center" }}>
                                <Form.Field style={{ textAlign: "center" }}>
                                    <Label>Current Height:</Label>
                                    <br /> <br />
                                    <Input
                                        onChange={(e) => setValue("current_height", e.target.value)}
                                        placeholder={crop.current_height} />
                                </Form.Field>
                                <Form.Field style={{ textAlign: "center" }}>
                                    <Label>Quantity Returned</Label>
                                    <br /><br />
                                    <Input
                                        onChange={(e) => setValue("quantity_returned", e.target.value)}
                                        placeholder={crops.qunatity_returned} />
                                </Form.Field>
                                <Form.Field>
                                    <Label>Current Status of Crop</Label>
                                    <br /><br />
                                    <Input
                                        onChange={(e) => setValue("status_of_plant", e.target.value)}
                                        placeholder={crops.status_of_plant} />
                                </Form.Field>
                                <Button
                                    onClick={() => updateCrop(editedCrop)}
                                    type='submit'>Submit</Button>
                            </Form>
                        </Modal>

                    </div>
                </Grid.Column>
            </Grid>
        </div>
    )
}