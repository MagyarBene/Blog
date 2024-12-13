import React from 'react'
import { Header } from '../components/Header'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { readPosts } from '../utility/cruduUtility'
import { CardContainer } from '../components/CardContainer'
import { Categories } from '../components/Categories'
import { useSearchParams } from 'react-router-dom'


export const Posts = () => {
  const [searchParams]=useSearchParams()
  const [posts, setPosts]=useState(null)
  const [selectedCateg, setSelectegCateg]=useState(searchParams.get('ctg') ? [searchParams.get('ctg')] : [])
  //console.log(searchParams.get('ctg'));
  //console.log(selectedCateg);
  
  


  useEffect(()=>{
    readPosts(setPosts, selectedCateg)
  },[selectedCateg])
  
  return (
    <div className='page'>
      <div className='categcont'>
        <Categories selectedCateg={selectedCateg} setSelectedCateg={setSelectegCateg}/> 
    </div>
    <div >
        <CardContainer posts={posts} setPosts={setPosts} />
    
    </div>
    </div>
    
    
  )
}


