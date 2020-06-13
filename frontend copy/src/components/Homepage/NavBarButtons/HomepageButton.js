import React from 'react'
import { Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

export default function HomepageButton() {

    let history = useHistory()

    return(
        <Button
        style={{ marginLeft: '01em' }}
        color="green"
        onClick={() => history.push('/')}>
            Homepage
        </Button>
    )
}