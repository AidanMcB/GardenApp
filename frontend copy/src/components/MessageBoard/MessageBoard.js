import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    Image,
    Button,
    Header,
    Label,
    Segment,
    Container,
    Icon,
    Confirm,
} from 'semantic-ui-react'

export default function MessageBoard() {


    let [open, setOpen] = useState(false)

    const openWindow = () => {
        setOpen(true)
    }

    const closeWindow = () => {
        setOpen(false)
    }

    let history = useHistory()
    let user = useSelector(state => state.user)
    let posts = useSelector(state => state.posts)
    let dispatch = useDispatch()

    const handleDelete = (post) => {
        closeWindow()
        fetch(`http://localhost:3000/posts/${post.id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(delResp => {
                // console.log(delResp)
                if (delResp.success) {
                    dispatch({ type: 'DELETE_POST', post })
                }
            })
    }
    useEffect(() => {
        fetch(`http://localhost:3000/posts`)
            .then(res => res.json())
            .then(allPosts => {
                // console.log(allPosts)
                dispatch({ type: 'SET_POSTS', allPosts })
            })
    }, [])



    if (posts == undefined) {
        return <h1>loading...</h1>
    }
    // console.log(posts)
    // console.log(user)
    return (
        <div>
            <Header>Message board</Header>
            <Button
                color="blue"
                onClick={() => history.push('/newPost')}>
                Write Your Own Post
        </Button>

            <br /> <br />
            {posts.map(post => (
                <Container>
                    <Label
                        size="big green">{post.title}</Label>
                    {user == null || user.id == undefined || user.id != post.user_id ?
                        null
                        :
                        <div>
                            <Button
                                style={{ marginTop: "-40px" }}
                                onClick={openWindow}
                                // onClick={(() => handleDelete(post))}
                                size="medium red"
                                floated="right">
                                <Icon fitted name="x"></Icon>
                            </Button>
                            <Confirm
                                open={open}
                                onCancel={closeWindow}
                                onConfirm={() => handleDelete(post)}
                            />
                        </div>
                    }
                    <Segment>{post.body}</Segment>
                    <Image
                        style={{ padding: "10px" }}
                        size='medium'
                        bordered
                        src={post.url} />
                    <br></br> <br></br>
                </Container>
            ))
            }
        </div >

    )
}