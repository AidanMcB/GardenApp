import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
// NavBar
import LogOutButton from './NavBarButtons/LogOutButton'
import ProfileButton from './NavBarButtons/ProfileButton'
import HomepageButton from './NavBarButtons/HomepageButton'
import WeatherPageButton from './NavBarButtons/WetherPageButton'
import LoginButton from './NavBarButtons/LoginButton'
import SignUpButton from './NavBarButtons/SignUpButton'
import MessageBoardButton from './NavBarButtons/MessageBoardButton'
import { useSelector } from 'react-redux'
// SideBar 
import SideBarElement from './SideBar/SideBarElement'
import {
    Menu,
} from 'semantic-ui-react'
import { createMedia } from "@artsy/fresnel";
// Styles 
import '../../styles/Navbar.css'
import { useDispatch } from 'react-redux'

export default function NavBar() {


    const { MediaContextProvider, Media } = createMedia({
        breakpoints: {
            sm: 0,
            md: 768,
            ml: 890,
            lg: 1024,
            xl: 1192,
        },
    })

    const dispatch = useDispatch()

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

    let user = useSelector(state => state.user)
    const errorMessage = useSelector(state => state.errorMessage)
    let history = useHistory()

    return (
        <>
            <MediaContextProvider>
                <Media greaterThanOrEqual="ml">
                    <Menu
                        style={{
                            padding: ".5em",
                            backgroundColor: "#1b1c1d",
                            opacity: "90%",
                            borderBottom: "1px solid black",
                        }}>
                        <Menu.Item  >
                            <HomepageButton className="item" />
                        </Menu.Item>
                        <Menu.Item>
                            <MessageBoardButton className="item" />
                        </Menu.Item>
                        <Menu.Item>
                            {user != null ? <WeatherPageButton className="item" /> : null}
                        </Menu.Item>
                        <Menu.Item position="right">
                            {user != null ? <ProfileButton className="item" /> : <LoginButton className="item" />}
                        </Menu.Item>
                        <Menu.Item >
                            {user != null ? <LogOutButton className="item" /> : <SignUpButton className="item" />}
                        </Menu.Item>
                    </Menu>
                </Media>
                <Media lessThan="ml" >
                    <SideBarElement />
                </Media>
            </MediaContextProvider>
        </>
    )
}