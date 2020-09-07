import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

export default function WeatherPageButton() {

    let history = useHistory()

    return(
        <Button
        style={{ marginLeft: '01em',
        border:"1px solid green" }}
        color="green"
        onClick={() => history.push('/weather')}>
            Weather    <Icon fitted name="cloud"></Icon>
        </Button>
    )
}