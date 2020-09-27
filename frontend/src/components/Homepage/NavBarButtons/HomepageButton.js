import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'


export default function HomepageButton() {

    let history = useHistory()
    let background = useSelector(state => state.background)
    let dispatch = useDispatch()
   
    return(
        <Button
        className="home-btn"
        color="green"
        style={{ marginLeft: '01em',
        border:"1px solid green" }}
        onClick={() => history.push('/')}>
            Home <Icon fitted name="home"></Icon>
        </Button>
    )
}