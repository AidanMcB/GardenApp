import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Image,
    Button,
    Header,
    Label,
    Segment,
    Container,
} from 'semantic-ui-react'

export default function MessageBoard() {

    let [posts, setPosts] = useState([])
    let history = useHistory()

    useEffect(() => {
        fetch(`http://localhost:3000/posts`)
            .then(res => res.json())
            .then(posts => {
                console.log(posts)
                setPosts({
                    posts
                })
            })
    }, [])



    if (posts.posts == undefined) {
        return <h1>loading...</h1>
    }
    console.log(posts.posts)
    return (
        <div>
            <Header>Message board</Header>
            <Button onClick={() => history.push('/newPost')}>
                Write Your Own Post
        </Button>
            {posts.posts.map(post => (
                <Container>
                    <Label>{post.title}</Label>
                    <Segment>{post.body}</Segment>
                    <Image
                        style={{ padding: "10px" }}
                        size='medium'
                        bordered
                        src={post.url} />
                </Container>
            ))}
        </div>

    )
}