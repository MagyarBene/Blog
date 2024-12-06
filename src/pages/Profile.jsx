import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import {NotFound} from './NotFound'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { uploadFile } from '../utility/uploadFile'
import { PropagateLoader } from 'react-spinners'
import {Toastify} from '../components/Toastify'
import { useEffect } from 'react'
import { extractUrlAndId } from '../utility/utils'

const midleStyle={
  width:'350px',
  height:'550px',
  position:'absolute',
  top:'50%',
  left:'50%',
  transform:'translate(-50%,-50%)',
  border:'2px solid black',
  padding:'20px',
}
export const Profile = () => {
  const {user, updateUser, msg}=useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState(null)

  useEffect(()=>{
      user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)

  },[user])

  const {register,handleSubmit, formState: { errors }} = useForm({defaultValues:{
    displayName:user?.displayName || ''
  }});
  
  const onSubmit=async (data)=>{
    setLoading(true)
    console.log(data.displayName);
    try {
      const file=data?.file ? data?.file[0] : null
      const {url,id} = file ? await uploadFile(file) : null

      updateUser(data.displayName,url+'/'+id)
    } catch (error) {
        console.log(error);
        
    }finally{
      setLoading(false)
    }
    
  }




  if (!user) return <NotFound/>
  return (
    <div className='page'>
      <div className='profilepage'  style={midleStyle}>
        <h3>Felhasználói fiók beállításai</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h5>Felhasználónév: </h5>
            <br />
            <input {...register('displayName')} type='text' />
          </div>
          <div >
            <p></p>
            <h5>Avatar:</h5>
            <p></p>
            <div >
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
             onChange={(e)=>setAvatar(URL.createObjectURL(e.target.files[0]))}
             />
            </div>
             
             <p className='text-danger'>{errors?.file?.message}</p>
          </div>
          <button>Mentés</button>
      </form>
      <p></p>
      {loading && <PropagateLoader />}
      {msg && <Toastify {...msg}/>}
          {avatar && <img style={{height:"100px", width:"100px",borderRadius:"100px", margin:"20px"}} src={avatar}/>}
      </div>
    </div>
  )
}

