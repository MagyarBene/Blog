import React from 'react'
import { SingleCard } from './SingleCard'

export const CardContainer = ({posts, setPosts}) => {
   
  return (
    <div className='posts' >
      {posts&& posts.map((obj)=><SingleCard {...obj} key={obj.id}/>)}
    </div>
  )
}

