import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {
    Header,
    Segment,
    Menu,
    Container,
    Button
} from 'semantic-ui-react';

export default function LogoutFail(){

    return(
        <Container>
            <Header>Oops! Something Went Wrong</Header>
            <Segment> You failed to logout because you either are cannot connect with the server or there is a problem with the server</Segment>
        </Container>
    )
}