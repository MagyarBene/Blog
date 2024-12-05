import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import {NotFound} from './NotFound'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const midleStyle={
  width:'350px',
  height:'400px',
  position:'absolute',
  top:'50%',
  left:'50%',
  transform:'translate(-50%,-50%)',
  border:'2px solid black',
  padding:'20px',
}
export const Profile = () => {
  const {user, updateUser}=useContext(UserContext)
  const [photo, setPhoto]=useState(null)

  const {register,handleSubmit, formState: { errors }} = useForm({defaultValues:{
    displayName:user?.displayName || ''
  }});
  
  const onSubmit=async (data)=>{
    console.log(data.displayName);
    try {
      updateUser(data.displayName)
    } catch (error) {
        console.log(error);
        
    }
    
  }




  if (!user) return <NotFound/>
  return (
    <div className='page'>
      <div className='profilepage'  style={midleStyle}>
        <h3>Felhasználói fiók beállításai</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="">Felhasználónév</label>
            <br />
            <input {...register('displayName')} type='text' />
          </div>
          <div>
            <label htmlFor="">Avatar:</label>
             <input {...register('file',{
              validate:(value)=>{
                  if(!value[0]) return true
                  const acceptedFormats=['jpg', 'png', 'svg']
                  console.log(value[0]);
                  const fileExtension=value[0].name.split('.').pop().toLowerCase()
                  if(!acceptedFormats.includes(fileExtension)) return "Invalid file format"
                  if(value[0].size>1*1000*1024) return "Invalid file size"
                  return true
                  
              }
             })}  type='file'
             onChange={(e)=>setPhoto(URL.createObjectURL(e.target.files[0]))}
             />
          </div>
          <button>Mentés</button>
      </form>
          {photo && <img src={photo}/>}
      </div>
    </div>
  )
}

