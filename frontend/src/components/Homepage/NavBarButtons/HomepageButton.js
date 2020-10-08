import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

export default function HomepageButton() {
    let history = useHistory()
    return (
        <Button
            className="home-btn"
            color="green"
            style={{
                border: "1px solid green"
            }}
            onClick={() => history.push('/')}>
            Home <Icon fitted name="home"></Icon>
        </Button>
    )
}