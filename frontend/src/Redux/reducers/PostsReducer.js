const PostsReducer = (state, action) => {

    switch(action.type){
    case 'DELETE_POST':
        console.log(action.post)
        return {
            ...state,
            posts: [...state.posts.filter( post => post.id != action.post.id)]
        }
        break
        case 'SET_POSTS':
            console.log(action.allPosts)
            return {
                ...state,
                posts: [...action.allPosts]
            }
    }
   

    return state
}

export default PostsReducer