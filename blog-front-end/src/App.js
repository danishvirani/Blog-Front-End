import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => }

  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newPost, setNewPost] = useState('')
  const [newFeeling, setNewFeeling] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newComments, setNewComments] = useState('')

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
        .get('http://localhost:3000/animals')
        .then((response) => {
          setAnimals(response.data)
        })
    })
  }


  return ()

}

export default App;
