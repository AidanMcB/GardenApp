import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

export default function MessageBoard() {
    let history = useHistory()

    return(
        <Button
        className="msg-board-btn"
        color="green"
        // floated="left"
        style={{ marginLeft: '01em',
        border:"1px solid green" }}
        onClick={() => history.push('/message_board')}>
            Message Board  <Icon fitted name="list"></Icon>
        </Button>
    )
}