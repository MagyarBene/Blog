import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePost, readPost } from '../utility/cruduUtility'
import { useState } from 'react'
import { useEffect } from 'react'
import parse from 'html-react-parser';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useConfirm } from 'material-ui-confirm'
import { delPhoto } from '../utility/uploadFile'

export const SinglePost = () => {
  const {user}=useContext(UserContext)
    const [post,setPost]=useState(null)
    const navigate=useNavigate()
    const confirm=useConfirm()
    const params=useParams()
    console.log(params);

  
    useEffect(()=>{
        readPost(params.id,setPost)
    },[])
    
    const handleDelete=async ()=>{
      try {
          await confirm({
              decription:"Ez egy visszavonhatatlan művelet",
              confirmationText:'Igen',
              cancellationText:"Mégsem",
              title:"Biztosan ki szeretnéd törölni ezt a bejegyzést?"

      })
      deletePost(post.id)//firestorebol töröl
      delPhoto
      (post.photo.id)//cloudinarybol töröl
      navigate('/posts')
      } catch (error) {
          console.log("mégse: ", error);
          
      }    
  }
    

  return (
    <div className='page'>
      {post && <>
      <img src={post.photo['url']} alt={post.title} style={{maxHeight:'300px', maxWidth:'400px'}} />
      <p>{parse(post.story)}</p>
      </>}
        <button onClick={()=>navigate('/posts')}>Vissza lépek</button>
        {user && post && (user.uid==post.userId) &&
          <button><DeleteIcon onClick={handleDelete}/></button>
        }
        
    </div>
  )
}


