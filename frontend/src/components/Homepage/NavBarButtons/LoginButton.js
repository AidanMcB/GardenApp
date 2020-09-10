import React from 'react'
import { Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

export default function LoginButton() {
    let history = useHistory()

    return(
        <Button
        className="login-btn"
        color="green"
        floated="right"
        style={{ marginRight: '01em',
        border:"1px solid green" }}
        onClick={() => history.push('/login')}>
            Login
        </Button>
    )
}