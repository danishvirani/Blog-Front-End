import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {

  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newPost, setNewPost] = useState('')
  const [newFeeling, setNewFeeling] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newComments, setNewComments] = useState('')
  const [posts, setPosts] = useState([])
  const [showEdit, setShowEdit] = useState(false)

  const handleNewAuthorChange = (event) => {
    setNewAuthor(event.target.value)
    console.log(newAuthor)
  }

  const handleNewTitleChange = (event) => {
    setNewTitle(event.target.value)
    console.log(newTitle)
  }

  const handleNewPostChange = (event) => {
    setNewPost(event.target.value)
    console.log(newPost)
  }

  const handleNewFeelingChange = (event) => {
    setNewFeeling(event.target.value)
    console.log(newFeeling)
  }

  const handleNewCommentChange = (event) => {
    setNewComments(event.target.value)
    console.log(newComments)
  }

  const handleNewImageChange = (event) => {
    setNewImage(event.target.value)
    console.log(newImage)
  }

  const handleNewPostFormSubmit = (event) => {
    event.preventDefault()
    axios.post(
      'http://localhost:3000/posts',
      {
        author:newAuthor,
        post:newPost,
        title:newTitle,
        image:newImage,
        feeling:newFeeling
      }
    ).then(() => {
      axios
        .get('http://localhost:3000/posts')
        .then((response) => {
          setPosts(response.data)
        })
    })
  }
  useEffect(() => {
    axios
      .get('http://localhost:3000/posts')
      .then((response) => {
        setPosts(response.data)
      })
  },[])

  const handleDelete = (postData) => {
    axios
      .delete(`http://localhost:3000/posts/${postData._id}`)
      .then(() => {
        axios
          .get('http://localhost:3000/posts')
          .then((response) => {
            setPosts(response.data)
          })
      })
  }

  const handleEditPostFormSubmit = (event, postData) => {
    event.preventDefault()
    axios
      .put(
        `http://localhost:3000/posts/${postData._id}`,
        {
          author:newAuthor,
          post:newPost,
          title:newTitle,
          image:newImage,
          feeling:newFeeling
        }
      )
      .then(() => {
        axios
          .get('http://localhost:3000/posts')
          .then((response) => {
            setPosts(response.data)
          })
      })
    }

    const handleShowEdit = (event, postData) => {
      setShowEdit(show => !show)
    }


  return (

    <main>
      <h1>React Blog</h1>
      <section>
        <form onSubmit={handleNewPostFormSubmit}>
          <label for="title">Title: </label>
          <input type="text" onChange={handleNewTitleChange}/><br/>
          <label for="image">Image: </label>
          <input type="text" onChange={handleNewImageChange}/><br/>
          <label for="author">Author: </label>
          <input type="text" onChange={handleNewAuthorChange}/><br/>
          <label for="feeling">Feeling: </label>
          <select onChange={handleNewFeelingChange} defaultValue={newFeeling}>
            <option selected value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Excited">Excited</option>
            <option value="Blessed">Blessed</option>
            <option value="Anxious">Anxious</option>
          </select><br/>
          <label for="post">Post: </label>
          <input type="text" onChange={handleNewPostChange}/><br/>
          <input type="submit" value="Create Post"/>
        </form>
      </section>
      <section>
        <h2>Posts</h2>
        <ul>
        {
          posts.map((post) => {
            return <li>
              <h3>{post.title}</h3><br/>
              <img src={post.image}/><br/>
              <p>Author: {post.author}</p>
              <p>Feeling: {post.feeling}</p>
              <button onClick={ (event) => {handleDelete(post) } }>Delete</button>
              <button onClick={ (event) => { handleShowEdit(event, post) } }>Edit Post</button>
              {
                (showEdit)?
                <form onSubmit={ (event) => { handleEditPostFormSubmit(event, post) } }>
                  <label for="title">Title: </label>
                  <input type="text" onChange={handleNewTitleChange} defaultValue={post.title}/><br/>
                  <label for="image">Image: </label>
                  <input type="text" onChange={handleNewImageChange} defaultValue={post.image}/><br/>
                  <label for="author">Author: </label>
                  <input type="text" onChange={handleNewAuthorChange} defaultValue={post.author}/><br/>
                  <label for="feeling">Feeling: </label>
                  <select onChange={handleNewFeelingChange} defaultValue={post.feeling}>
                    <option value="Happy">Happy</option>
                    <option value="Sad">Sad</option>
                    <option value="Excited">Excited</option>
                    <option value="Blessed">Blessed</option>
                    <option value="Anxious">Anxious</option>
                  </select><br/>
                  <label for="post">Post: </label>
                  <input type="text" onChange={handleNewPostChange} defaultValue={post.post}/><br/>
                  <input type="submit" value="Edit Post"/>
                </form>
                :
                <></>
              }
            </li>
          })
        }
        </ul>
      </section>
    </main>

  )

}

export default App;
