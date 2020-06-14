import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

export default function HomepageButton() {

    let history = useHistory()

    return(
        <Button
        color="green"
        style={{ marginLeft: '01em' }}
        onClick={() => history.push('/')}>
            Home <Icon fitted name="home"></Icon>
        </Button>
    )
}