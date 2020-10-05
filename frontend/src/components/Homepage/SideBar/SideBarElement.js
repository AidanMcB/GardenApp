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
                borderBottom: "1px solid black",
            }}><Menu.Item position="right" style={{margin:"-1em"}}>
                <Sidebar.Pusher >
                    <Button color="green" disabled={visible} onClick={() => setVisible(!visible)}>
                        <Icon fitted name="options"></Icon>
                    </Button>
                </Sidebar.Pusher>
                </Menu.Item>
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
                    {user != null ? <Menu.Item position='right' as='a' href='/weather' >
                        <Icon name='cloud'></Icon>Weather
                    </Menu.Item> : null }
                    {user != null ? <Menu.Item position='right' as='a' href='/my_garden'>
                        <Icon name='user' /> {user.username} </Menu.Item> :
                        <Menu.Item position='right' as='a' href='/login'>
                        <Icon name="sign in"></Icon>
                            Login</Menu.Item>
                    }
                    {user != null ? <Menu.Item position='right' onClick={HandleLogOut}>
                        <Icon name="log out" ></Icon>
                        Log Out </Menu.Item> :
                        <Menu.Item position='right' as='a' href='/signUp'>
                        <Icon name="signup"></Icon>
                            Sign Up </Menu.Item>}
                </Sidebar>

            </Menu>
        </div>
    )
}