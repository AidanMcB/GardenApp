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

    let history = useHistory()
    let background = useSelector(state => state.background)
    let dispatch = useDispatch()

    const [visible, setVisible] = useState(false)


    const sideBarHeight = window.outerHeight;

    return (
        <div>
                <Menu style={{
                    padding: ".5em",
                    marginBottom: ".75em",
                    backgroundColor: "#1b1c1d",
                    opacity: "90%",
                    borderBottom: "1px solid black",
                }}>

                    <Sidebar.Pusher>
                        <Button disabled={visible} onClick={() => setVisible(!visible)}>
                            Show sidebars
                                </Button>
                    </Sidebar.Pusher>
                    <Sidebar
                        as={Menu}
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
                        <Menu.Item as='a'>
                            <Icon name='home' />
                                  Home
                                </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='gamepad' />
                                    Games
                                </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='camera' />
                                 Channels
                                </Menu.Item>
                    </Sidebar>

                </Menu>
        </div>
    )
}