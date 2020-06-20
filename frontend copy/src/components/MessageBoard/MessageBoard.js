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
    Popup,
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
                console.log(allPosts)
                dispatch({ type: 'SET_POSTS', allPosts })
            })
    }, [])



    if (posts == undefined) {
        return <h1>loading...</h1>
    }
    // console.log(posts)
    // console.log(user)
    return (
        <div style={{ textAlign: "center" }}>
            <Container style={{
                marginTop: "40px",
                border: "2px solid black",
                borderRadius:"25px",
                padding: "20px",
                fontWeight:"bold",
                backgroundColor:"#1b1c1d",
                opacity:"75%"
            }}>
                <Header
                    style={{
                        textAlign: "center",
                        color: "rgb(255,250,250)",
                        // fontFamily: "fantasy",
                        fontSize: "46px",
                        textShadow: "1px 1px 0 black"
                    }}
                >Message Board</Header>
                <Header
                    style={{
                        color: "rgb(255,250,250)",
                        // fontFamily:"fantasy",
                        marginTop:"-10px",
                        // textShadow: "1px 1px 0 black"
                    }}> Share your garden with the world</Header>

            </Container>

            <br /> <br /> <br />
            {posts.map(post => (
                <Container style={{
                    backgroundColor: "rgb(255,250,250, 0.75)",
                    border: "2px solid white",
                    borderRadius: "25px",
                    boxShadow: "5px 5px",
                    padding: "20px",
                    marginBottom: "20px"
                }}>
                    <Label style={{ color:"white",border:"1px solid black",backgroundColor:"Green"}} size="big">{post.title}</Label>
                    <Popup content="View garden" trigger={<Label ribbon style={{border:"1px solid black", marginLeft:"35px"}}
                        onClick={() => { user.id == post.user.id ? history.push('my_garden') : history.push(`/garden/${post.user.garden.id}`) }}
                    >By {post.user.username}</Label>} />
                    {user == null || user.id == undefined || user.id != post.user_id ?
                        null
                        :
                        <div>
                            <Button
                                style={{ marginTop: "-40px",
                                border:"1px solid black" }}
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
                    <br /> <br />
                    <div style={{ display: "flex" }}>
                        <Segment
                            style={{
                                border:"1px solid black",
                                fontSize: "16px",
                                backgroundColor: "rgb(255,255,255, 0.7)"
                            }}>{post.body}</Segment>
                        <Image
                            style={{ padding: "10px",
                            border:"1px solid black" }}
                            size='large'
                            
                            src={post.url} />
                    </div>
                    <br></br> <br></br>
                </Container>
            ))
            }
            <Button
                style={{
                    border:"1px solid black"
                }}
                color="blue"
                onClick={() => history.push('/newPost')}>
                Write Your Own Post
        </Button>
        </div >

    )
}