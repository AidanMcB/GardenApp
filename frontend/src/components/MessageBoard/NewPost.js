import React from 'react'
import { useHistory } from 'react-router-dom'
import {
    Form,
    Input,
    Button,
    Label,
    TextArea,
} from 'semantic-ui-react'

export default function NewPost() {

    let history = useHistory()

    const uploadImageHandler = (e) => {
        e.preventDefault()
        let body = new FormData(e.target)
        fetch('http://localhost:3000/posts', {
            method: 'POST',
            body: body,
            credentials: 'include'
        })
            .then(res => res.json())
            .then(resp => {
                history.push('/message_board')
            })
    }

    const fileSelectedHandler = (e) => {
        console.log(e.target.files[0])

    }


    return (
        <Form
            onSubmit={uploadImageHandler}
            style={{
                marginRight: "10%",
                marginLeft: "10%"
            }}>
            <Label className="big blue" >Title:</Label>
            <br /> <br />
            <Form.Input
                style={{
                    width: "80%",
                    fontSize: "14px",
                    border: " 1px solid"
                }}
                placeholder="Title of your post"
                name='title'
            ></Form.Input>
            <br />
            <Label
                style={{ border: "1px solid" }}
                className="big blue">Tell the world about your garden:</Label>
            <br /> <br />
            <Form.Input
                type="textarea"
                control={TextArea}
                style={{
                    height: "300px",
                    fontSize: "16px",
                    border: " 1px solid"
                }}
                placeholder="What's new with your garden?"
                name="bodyInfo"
            ></Form.Input>
            <br /> <br />
            <Label
                style={{ border: "1px solid" }}
                className="big blue">Add a Photo of your garden</Label>
            <br /> <br />
            <Form.Input
                onChange={(e) => fileSelectedHandler(e)}
                type='file'
                accept='image/png, image/jpeg'
                name='newImage'
                style={{ border: " 1px solid" }}
            ></Form.Input>
            <br />
            <Button
                style={{ border: "1px solid" }}
                className="big green">Post
            </Button>
        </Form>
    )

}

