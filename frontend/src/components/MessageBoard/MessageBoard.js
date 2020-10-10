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

    if (posts === undefined) {
        return <h1>loading...</h1>
    }
    return (
        <div style={{ textAlign: "center", height: "200vh" }}>
            <Container style={{
                width:"80%",
                marginTop: "40px",
                border: "2px solid black",
                borderRadius: "25px",
                padding: "20px",
                fontWeight: "bold",
                backgroundColor: "#1b1c1d",
                opacity: "75%",
                zIndex: "-3",
            }}>
                <Header
                    style={{
                        textAlign: "center",
                        color: "rgb(255,250,250)",
                        fontSize: "3em",
                        textShadow: "1px 1px 0 black",
                    }}
                >Message Board</Header>
                <Header
                    style={{
                        color: "rgb(255,250,250)",
                        marginTop: "-10px",
                    }}> Share your garden with the world</Header>

            </Container>

            <br /> <br /> <br />
            {posts.map((post, index) => (
                <Container key={index}
                    style={{
                        backgroundColor: "rgb(255,250,250, 0.75)",
                        border: "2px solid white",
                        borderRadius: "25px",
                        boxShadow: "5px 5px",
                        padding: "20px",
                        marginBottom: "20px"
                    }}>
                    <div className="label-div" style={{display:"inline"}}>
                    <Label style={{ maxWidth:"75%",color: "white", border: "1px solid black", backgroundColor: "Green" }} size="big">{post.title}</Label>
                
                    {user === null || user.id === undefined || user.id !== post.user_id ?
                        null
                        :
                        <div style={{ display:"inline", float:"right", marginTop:"0em" }}>
                            <Button
                                style={{
                                    border: "1px solid black",
                                    padding:".75em",
                                }}
                                onClick={openWindow}
                                size="small"
                                color="red">
                                <Icon fitted name="x"></Icon>
                            </Button>
                            <Confirm
                                open={open}
                                onCancel={closeWindow}
                                onConfirm={() => handleDelete(post)}
                            />
                        </div>
                    }
                    </div>
                    <br /> <br />
                    <div style={{ display: "flex",
                    flexWrap:"wrap",
                       justifyContent: "center",
                            alignItems: "center"}}>
                        <Segment
                            style={{
                                flex:"50%",
                                border: "1px solid black",
                                fontSize: "16px",
                                backgroundColor: "rgb(255,255,255, 0.7)"
                            }}>{post.body}</Segment>
                        <Container className="img-div" style={{
                            flex:"50%",
                            margin:"0",
                            height:"100%",
                            width: "100",
                          
                        }}>
                            <Image
                                style={{
                                    padding: ".25em",
                                    border: "1px solid black",
                                }}
                                fluid
                                src={post.url} />
                        </Container>
                    </div>
                    <Popup content="View garden" trigger={
                    <Label ribbon style={{ border: "1px solid black", float:"right", margin:".25em 0 0 0" }}
                        onClick={() => { user.id === post.user.id ? history.push('my_garden') : history.push(`/garden/${post.user.garden.id}`) }}
                    >By {post.user.username}</Label>} />
                    <br></br> <br></br>
                    
                </Container>
            ))
            }
            <Button
                style={{
                    border: "1px solid black",
                    marginBottom:"2em"
                }}
                color="blue"
                onClick={() => history.push('/newPost')}>
                Write Your Own Post
        </Button>
        
        </div>

    )
}