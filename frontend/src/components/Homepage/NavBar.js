import React, { useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import LogOutButton from './NavBarButtons/LogOutButton'
import ProfileButton from './NavBarButtons/ProfileButton'
import HomepageButton from './NavBarButtons/HomepageButton'
import WeatherPageButton from './NavBarButtons/WetherPageButton'
import LoginButton from './NavBarButtons/LoginButton'
import SignUpButton from './NavBarButtons/SignUpButton'
import MessageBoardButton from './NavBarButtons/MessageBoardButton'
import { useSelector } from 'react-redux'
import { Menu, Message } from 'semantic-ui-react'

export default function NavBar() {

    let user = useSelector(state => state.user)
    const errorMessage = useSelector(state => state.errorMessage)
    let history = useHistory()

    return (
        <div className="ui inverted segment"
            style={{
                // backgroundColor: '#9f6d5c',
                backgroundColor: "#1b1c1d",
                opacity: "90%",
                borderBottom: "1px solid black",
            }}>
            <HomepageButton Name="item" />
            <MessageBoardButton className="item" />
            {user != null ? <WeatherPageButton className="item" /> : null}
            {user != null ? <ProfileButton className="item" /> : <LoginButton className="item" />}
            {user != null ? <LogOutButton className="item" /> : <SignUpButton className="item" />}

        </div>
    )
}