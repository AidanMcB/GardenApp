const PostsReducer = (state, action) => {

    switch (action.type) {
        case 'DELETE_POST':
            return {
                ...state,
                posts: [...state.posts.filter(post => post.id !== action.post.id)]
            }
        case 'SET_POSTS':
            return {
                ...state,
                posts: [...action.allPosts]
            }
    }
    return state
}

export default PostsReducer