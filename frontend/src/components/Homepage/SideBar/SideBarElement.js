import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
    Header,
    Menu,
    Message,
    Button,
    Icon,
    Image,
    Sidebar,
    Segment
} from 'semantic-ui-react'

export default function SideBarElement() {

    let user = useSelector(state => state.user)
    const errorMessage = useSelector(state => state.errorMessage)
    let history = useHistory()
    let background = useSelector(state => state.background)
    let dispatch = useDispatch()

    const [visible, setVisible] = useState(false)
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


    const sideBarHeight = window.outerHeight;

    return (
        <div>
            <Menu style={{
                padding: ".5em",
                backgroundColor: "#1b1c1d",
                opacity: "90%",
                borderBottom: "1px solid black",
            }}>
                <Sidebar.Pusher >
                    <Button disabled={visible} onClick={() => setVisible(!visible)}>
                        <Icon name="list"></Icon>
                    </Button>
                </Sidebar.Pusher>
                <Sidebar
                    as={Menu}
                    style={{
                        zIndex: "1002",
                        opacity:"100%"
                    }}
                    animation='overlay'
                    direction='left'
                    icon='labeled'
                    inverted
                    onHide={() => setVisible(false)}
                    vertical
                    visible={visible}
                    width='thin'
                    height={sideBarHeight}
                >
                    <Menu.Item as='a' href='/'>
                        <Icon name='home' />
                                  Home
                                </Menu.Item>
                    <Menu.Item as='a' href='message_board'>
                        <Icon name='list' />
                                    Message Board
                                </Menu.Item>
                    {user != null ? <Menu.Item position='right' as='a' href='/my_garden'>
                        <Icon name='user' /> {user.username} </Menu.Item> :
                        <Menu.Item position='right' as='a' href='/login'>
                            Login</Menu.Item>
                    }
                    {user != null ? <Menu.Item position='right' onClick={HandleLogOut}>
                        Log Out </Menu.Item> :
                        <Menu.Item position='right' as='a' href='/signUp'>
                            Sign Up </Menu.Item>}

                </Sidebar>

            </Menu>
        </div>
    )
}