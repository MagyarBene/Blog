import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { readPost } from '../utility/cruduUtility'
import { useState } from 'react'
import { useEffect } from 'react'

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
        <button >Vissza lépek</button>
    </div>
  )
}


