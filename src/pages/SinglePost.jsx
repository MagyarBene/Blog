import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePost, readPost, toggleLikes } from '../utility/cruduUtility'
import { useState } from 'react'
import { useEffect } from 'react'
import parse from 'html-react-parser';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useConfirm } from 'material-ui-confirm'
import { delPhoto } from '../utility/uploadFile'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Edit } from '@mui/icons-material'
import { Alert } from '../components/Alert'
import { Height } from '@mui/icons-material'
import { Margin } from '@mui/icons-material'


export const SinglePost = () => {
  const { user } = useContext(UserContext)
  const [post, setPost] = useState(null)
  const [txt, setTxt] = useState(null)
  const navigate = useNavigate()
  const confirm = useConfirm()
  const params = useParams()
  console.log(params);

  const midleStyle = {
    position: 'absolute',
    marginTop:'10px',
    marginBottom:'10px',
    top: '56%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    border: '2px solid black',
    padding: '20px',
    gap:10,
  }


  useEffect(() => {
    readPost(params.id, setPost)
  }, [])

  const handleDelete = async () => {
    try {
      await confirm({
        decription: "Ez egy visszavonhatatlan művelet",
        confirmationText: 'Igen',
        cancellationText: "Mégsem",
        title: "Biztosan ki szeretnéd törölni ezt a bejegyzést?"

      })
      deletePost(post.id)//firestorebol töröl
      delPhoto
        (post.photo.id)//cloudinarybol töröl
      navigate('/posts')
    } catch (error) {
      console.log("mégse: ", error);

    }
  }

  const handleLikes = () => {
    if (!user) setTxt("Csak bejelentkezett felhasználók likeolhatnak!")
    else toggleLikes(user.uid, post.id)
  }


  return (
    <div className='page single'>
      <div style={midleStyle} className='singlePost'>
        {post && <>
          <img src={post.photo['url']} alt={post.title} style={{ maxHeight: '200px', maxWidth: '300px', padding:10,}} />
          <div className='poststory'>
            <p className='fp'>{parse(post.story)}</p>
          </div>
        </>}
        <div className=' gombok'>

          {user && post && (user.uid == post.userId) &&
            <div>
              <button><DeleteIcon onClick={handleDelete} /></button>
              <button onClick={()=>navigate('/update/'+post.id)} ><Edit /></button>
            </div>

          }
          <div>
            <button><ThumbUpIcon onClick={handleLikes} /></button>
            {post && <span>Likeok: {post?.likes.length}</span>}
          </div>
          <button onClick={() => navigate('/posts')}>Vissza...  </button>
          {txt && <Alert txt={txt} err={false} />}
        </div>
      </div>


    </div>
  )
}


