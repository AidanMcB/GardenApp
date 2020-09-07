import React from 'react'
import { Header, Image } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function ProfilePage(props) {
    console.log(props)
    let user = useSelector(state => state.user)
    let history = useHistory()

    if(user == undefined){
        return <h1>loading...</h1>
    }
    console.log(user)
    return (
        <Header as='h2'>
            {/* consider generating a logo to use as a avatar */}
            <Image circular src='/images/avatar/large/patrick.png' /> 
            {user.username}
            <button
            onClick={() => history.push(`/garden/${user.garden.id}`)}>
            View My Garden</button>
        </Header>
    )

}


