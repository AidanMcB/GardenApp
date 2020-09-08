import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
    Header,
    Segment,
    List,
    Menu,
    Message,
    Container,
    Button
} from 'semantic-ui-react';

export default function ErrorPage() {

    const errorType = useSelector(state => state.errorType)

    return (
        <Container>
            <Segment placeholder>
                <Header size="huge">Oops! Something Went Wrong</Header>
                <Message color="red" >You failed to {errorType} because you either are cannot connect with the server or there is a problem with the server.</Message>
                Consider the following:
                <Segment.Inline>
                    <List as='ul'>
                        <List.Item as='li'>Check your network connection</List.Item>
                        <List.Item as='li'>Ensure your router is powered on and working</List.Item>
                        <List.Item as='li'>Refresh your browser window and try again </List.Item>
                        <List.Item as='li'>Make sure your device is still connected to the internet</List.Item>
                    </List>
                </Segment.Inline>
            </Segment>
        </Container>
    )
}