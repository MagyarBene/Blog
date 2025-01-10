import React from 'react'
import { useContext } from 'react'


import { CategContext } from '../context/CategContext'
import { SingleCategory } from './SingleCategory'


export const Categories = ({selectedCateg, setSelectedCateg}) => {
    const {categories} = useContext(CategContext)
    console.log(selectedCateg);
    
  

  return (
    <div className='categcont' style={{ color:'white',marginTop:"10px"}}>
      {categories && categories.map((obj)=><SingleCategory key={obj.name} name={obj.name} selectedCateg={selectedCateg} setSelectedCateg={setSelectedCateg}/>)}
    </div>
  )
}

