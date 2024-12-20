import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { readPost } from '../utility/cruduUtility'
import { useState } from 'react'
import { useEffect } from 'react'
import parse from 'html-react-parser';

export const SinglePost = () => {
    const [post,setPost]=useState(null)
    const navigate=useNavigate()
    const params=useParams()
    console.log(params);

    useEffect(()=>{
        readPost(params.id,setPost)
    },[])
    
    
    

  return (
    <div className='page'>
      {post && <>
      <img src={post.photo['url']} alt={post.title} style={{maxHeight:'300px', maxWidth:'400px'}} />
      <p>{parse(post.story)}</p>
      </>}
        <button onClick={()=>navigate('/posts')}>Vissza lépek</button>
    </div>
  )
}


