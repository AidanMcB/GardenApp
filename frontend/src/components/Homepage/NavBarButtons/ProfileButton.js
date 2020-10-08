import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'
import { useSelector} from 'react-redux'



export default function ProfileButton (props) {

    let user = useSelector(state => state.user)
    let history = useHistory()
    return (
        <Button
        className="profile-btn"
        color="green"
        style={{
        border:"1px solid green" }}
        onClick={() => history.push(`/my_garden`)}
        >
            {user.username} <Icon fitted name="user" />
        </Button>

    )
}