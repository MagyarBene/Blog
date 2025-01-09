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
import {Alert} from '../components/Alert'


export const SinglePost = () => {
  const {user}=useContext(UserContext)
    const [post,setPost]=useState(null)
    const [txt,setTxt]=useState(null)
    const navigate=useNavigate()
    const confirm=useConfirm()
    const params=useParams()
    console.log(params);
    
    const midleStyle={
      width:'600px',
      height:'700px',
      position:'absolute',
      top:'50%',
      left:'50%',
      transform:'translate(-50%,-50%)',
      border:'2px solid black',
      padding:'20px',
    }
    
  
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

  const handleLikes=()=>{
    if(!user) setTxt("Csak bejelentkezett felhasználók likeolhatnak!")
      else toggleLikes(user.uid,post.id)
  }
    

  return (
    <div className='page'>
      <div style={midleStyle}>
         {post && <>
      <img src={post.photo['url']} alt={post.title} style={{maxHeight:'200px', maxWidth:'300px'}} />
      <p>{parse(post.story)}</p>
      </>}
        <button onClick={()=>navigate('/posts')}>Vissza...  </button>
        {user && post && (user.uid==post.userId) &&
        <>
          <button><DeleteIcon onClick={handleDelete}/></button> 
          <button><Edit/></button>
        </>
          
        }
        <div>
          <button><ThumbUpIcon onClick={handleLikes}/></button>
          {post && <span>Likeok: {post?.likes.length}</span>}
        </div>
        
        {txt && <Alert txt={txt} err={false}/>}
      </div>
     
    </div>
  )
}


