import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'

export default function LogOutButton(props) {

    let dispatch = useDispatch()
    let user = useSelector(state => state.user)
    let history = useHistory()

    function HandleLogOut() {
        fetch(`http://localhost:3000/logout`, {
            credentials: 'include',
            method: 'POST'
        })
            .then(resp => resp.json())
            .then(response => {
                dispatch({ type: 'LOGOUT' })
                history.push('/')
            })
            localStorage.clear()
    }
    return (
        <Button
            color="green"
            floated="right"
            style={{ marginRight: '01em',
            border:"1px solid green", }}
            onClick={HandleLogOut}>
            Log Out
        </Button>
    )
}