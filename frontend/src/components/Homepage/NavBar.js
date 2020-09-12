import React, { useState, useReducer, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import LogOutButton from './NavBarButtons/LogOutButton'
import ProfileButton from './NavBarButtons/ProfileButton'
import HomepageButton from './NavBarButtons/HomepageButton'
import WeatherPageButton from './NavBarButtons/WetherPageButton'
import LoginButton from './NavBarButtons/LoginButton'
import SignUpButton from './NavBarButtons/SignUpButton'
import MessageBoardButton from './NavBarButtons/MessageBoardButton'
import { useSelector } from 'react-redux'
import { Menu, Message, Button, Icon } from 'semantic-ui-react'
// Styles 
import '../../styles/Navbar.css'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import {useDispatch} from 'react-redux'

export default function NavBar() {

    const dispatch = useDispatch()

    function HandleLogOut() {
        fetch(`http://localhost:3000/logout`, {
            credentials: 'include',
            method: 'POST'
        })
            .then(resp => {
                if(resp.ok){
                    return resp.json()
                } else {
                    throw new Error('Not conencted to the server')
                }
            })
            .then(response => {
                dispatch({ type: 'LOGOUT' })
                history.push('/')
            })
            .catch( error => {
                console.log(error)
                dispatch({ type: 'FAIL_SERVER', errorMessage: "Failed to Connect to the Server"})
            })
            localStorage.clear()
    }

    let user = useSelector(state => state.user)
    const errorMessage = useSelector(state => state.errorMessage)
    let history = useHistory()
    const [btnSize, setBtnSize] = useState("")
    const [btnPadding, setBtnPad] = useState("auto")

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isSmallMobile = useMediaQuery({ query: '(max-width: 480px)' })
    const isSmallerMobile = useMediaQuery({ query: '(max-width: 370px)' })

    const isTabletOrMobileDevice = useMediaQuery({
        query: '(max-device-width: 1224px)'
    })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

    //manage button size based on screen size constants defined above 
    useEffect( () => {
        if(isSmallerMobile){
            setBtnSize("mini")
            setBtnPad("0.5em")
        }
        else if(isSmallMobile){
            setBtnSize("mini")
        }
    }, [])

    return (
        console.log(btnSize, btnPadding),
        <div id="navbar" className="ui inverted segment"
            style={{
                // backgroundColor: '#9f6d5c',
                backgroundColor: "#1b1c1d",
                opacity: "90%",
                borderBottom: "1px solid black",
            }}> 
            <MediaQuery minDeviceWidth={700} device={isDesktopOrLaptop}>
                <HomepageButton Name="item" />
                <MessageBoardButton className="item" />
                {user !== null ? <WeatherPageButton className="item" /> : null}
                {user !== null ? <ProfileButton className="item" /> : <LoginButton className="item" />}
                {user !== null ? <LogOutButton className="item" /> : <SignUpButton className="item" />}
            </MediaQuery>
            <MediaQuery maxDeviceWidth={699} device={isTabletOrMobile}>
                <Button
                    size={btnSize}
                    className="home-btn"
                    color="green"
                    style={{
                        padding: `${btnPadding}`,
                        marginLeft: '01em',
                        border: "1px solid green"
                    }}
                    onClick={() => history.push('/')}>
                    <Icon fitted name="home"></Icon>
                </Button>
                {user !== null ? <Button
                    size={btnSize}
                    className="msg-board-btn"
                    color="green"
                    // floated="left"
                    style={{
                        marginLeft: '01em',
                        border: "1px solid green"
                    }}
                    onClick={() => history.push('/message_board')}>
                    <Icon size={btnSize.screen} fitted name="list"></Icon>
                </Button> : null}
                {user !== null ? <Button
                    size={btnSize}
                    className="weather-btn"
                    style={{
                        marginLeft: '01em',
                        border: "1px solid green"
                    }}
                    color="green"
                    onClick={() => history.push('/weather')}>
                    <Icon  fitted name="cloud"></Icon>
                </Button> : null}
                {user !== null ? <Button
                size={btnSize}
                    className="logout-btn"
                    color="green"
                    floated="right"
                    style={{
                        marginRight: '01em',
                        border: "1px solid green",
                    }}
                    onClick={HandleLogOut}>
                    Log Out
        </Button> : <Button
                        size={btnSize}
                        className="signup-btn"
                        color="green"
                        floated="right"
                        style={{
                            marginRight: '01em',
                            border: "1px solid green"
                        }}
                        onClick={() => history.push('/signUp')}>
                        Sign Up
        </Button>}
                {user !== null ? <Button
                    size={btnSize}
                    className="profile-btn"
                    color="green"
                    floated="right"
                    style={{
                        marginRight: '01em',
                        border: "1px solid green"
                    }}
                    onClick={() => history.push(`/my_garden`)}
                >
                    <Icon fitted name="user" />
                </Button>
                    : <Button
                        size={btnSize}
                        className="login-btn"
                        color="green"
                        floated="right"
                        style={{
                            marginRight: '01em',
                            border: "1px solid green"
                        }}
                        onClick={() => history.push('/login')}>
                        Login
        </Button>}

            </MediaQuery>

        </div>
    )
}