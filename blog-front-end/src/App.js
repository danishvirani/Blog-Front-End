import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => }

  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newPost, setNewPost] = useState('')
  const [newFeeling, setNewFeeling] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newComments, setNewComments] = useState('')
  const [posts, setPosts] = useState([])

  const handleNewAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleNewTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleNewPostChange = (event) => {
    setNewPost(event.target.value)
  }

  const handleNewFeelingChange = (event) => {
    setNewFeeling(event.target.value)
  }

  const handleNewCommentChange = (event) => {
    setNewComments(event.target.value)
  }

  const handleNewImageChange = (event) => {
    setNewImage(event.target.value)
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
        feeling:newFeeling,
        comments:newComments
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
          <select onChange={handleNewFeelingChange}>
            <option selected value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Excited">Excited</option>
            <option value="Blessed">Blessed</option>
            <option value="Anxious">Anxious</option>
          </select><br/>
          <label for="post">Post: </label>
          <input type="text" onChange={handleNewPostChange}/><br/>
        </form>
      </section>
    </main>

  )

}

export default App;
