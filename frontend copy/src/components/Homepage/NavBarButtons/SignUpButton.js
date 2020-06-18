import React from 'react'
import { Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

export default function SignUpButton() {
    let history = useHistory()

    return(
        <Button
        color="green"
        floated="right"
        style={{ marginRight: '01em',
        border:"1px solid green" }}
        onClick={() => history.push('/signUp')}>
            Sign Up
        </Button>
    )
}