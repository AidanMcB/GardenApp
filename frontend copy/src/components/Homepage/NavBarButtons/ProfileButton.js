import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { useDispatch, useSelector} from 'react-redux'
import UserReducer from '../../../Redux/reducers/UserReducer'


export default function ProfileButton (props) {

    let user = useSelector(state => state.user)
    let history = useHistory()
    return (
        <Button
        color="green"
        floated="right"
        style={{ marginRight: '01em' }}
        onClick={() => history.push('/profile')}
        >
            {user.username}
        </Button>

    )
}