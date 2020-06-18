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
import { Menu } from 'semantic-ui-react'

export default function NavBar() {

    let user = useSelector(state => state.user)
    let history = useHistory()

    return (
        <div class="ui inverted segment"
            style={{
                backgroundColor: '#9f6d5c',
                borderBottom: "1px solid black",
            }}>

            <HomepageButton class="item" />
            <MessageBoardButton class="item" />
            {user != null ? <WeatherPageButton class="item" /> : null}
            {user != null ? <ProfileButton class="item" /> : <LoginButton class="item" />}
            {user != null ? <LogOutButton class="item" /> : <SignUpButton class="item" />}

        </div>
    )
}