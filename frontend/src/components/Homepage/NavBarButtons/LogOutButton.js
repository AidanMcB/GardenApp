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
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error('Not conencted to the server')
                }
            })
            .then(response => {
                dispatch({ type: 'LOGOUT' })
                history.push('/')
            })
            .catch(error => {
                console.log(error)
                dispatch({ type: 'FAIL_SERVER', errorMessage: "Failed to Connect to the Server" })
            })
        localStorage.clear()
    }
    return (
        <Button
            className="logout-btn"
            color="green"
            style={{
                border: "1px solid green",
            }}
            onClick={HandleLogOut}>
            Log Out
        </Button>
    )
}