// import React from 'react'

// export default function NewPost() {

//     const uploadImageHandler=(e)=>{
//         e.preventDefault()
//         let body = new FormData(e.target)
//         fetch('http://localhost:3000/posts', {
//         method: 'POST',
//         body: body,
//         credentials: 'include'
//         })
//     }

//     const fileSelectedHandler =(e) =>{
//         console.log(e.target.files[0])

//     }

//     return(
//         <form
//         onSubmit={uploadImageHandler}

//          className='ui input focus'>
//             <input
//             label="title"
//             placeholder="Image Title"
//             name='title'
//             ></input>
//             <input
//             type="textarea"
//             placeholder="What's new with your garden?"
//             name="bodyInfo"
//             ></input>
//             <input
//             onChange={(e)=>fileSelectedHandler(e)}
//             type='file'
//             accept='image/png, image/jpeg'
//             name='newImage'
//             ></input>
//             <button >Post</button>
//         </form>
//     )

// }
