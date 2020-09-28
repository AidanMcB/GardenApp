import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'
import { useDispatch, useSelector} from 'react-redux'
import UserReducer from '../../../Redux/reducers/UserReducer'


export default function ProfileButton (props) {

    let user = useSelector(state => state.user)
    let garden = useSelector(state => state.user.garden)
    let history = useHistory()
    return (
        <Button
        className="profile-btn"
        color="green"
        // floated="right"
        style={{ marginRight: '01em',
        border:"1px solid green" }}
        onClick={() => history.push(`/my_garden`)}
        >
            {user.username} <Icon fitted name="user" />
        </Button>

    )
}