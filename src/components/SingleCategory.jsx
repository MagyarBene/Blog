import { RadioButtonChecked } from '@mui/icons-material'
import { RadioButtonUnchecked } from '@mui/icons-material'
import { Chip } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const SingleCategory = ({name, setSelectedCateg}) => {
    const [selected, setSelected] = useState(false)
    const [searchParams]=useSearchParams()
    console.log(searchParams.get('ctg'));
    
    useEffect(()=>{
       if (searchParams.get('ctg')==name) {
        setSelected(true)
        } 
    },[searchParams.get('ctg')])

    


   useEffect(()=>{
    if (selected) {
        setSelectedCateg((prev)=>[...prev,name])
    }else{
        setSelectedCateg((prev)=>prev.filter((obj)=>obj!=name))
    }
   },[selected])
    
  return (
    <div className='categcont'>
      <Chip  sx={{ border:'2px solid white' , color:"white"}} label={name} icon={!selected? <RadioButtonUnchecked color='primary' />:<RadioButtonChecked color='primary'  /> } clickable onClick={()=>setSelected(!selected)}/>
    </div>
  )
}


