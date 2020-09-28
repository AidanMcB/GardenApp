import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'


export default function SideBarBtn() {

    let history = useHistory()
    let background = useSelector(state => state.background)
    let dispatch = useDispatch()

    const [visible, setVisible] = useState(false)

    return (
        <Button
            className="side-bar-dropdown"
            color="green"
            size="small"
            style={{
                border: "1px solid green",
            }}
            onClick={() => setVisible(!visible)}>
            <Icon fitted name="list"></Icon>
        </Button>
    )
}