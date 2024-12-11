import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Home } from './Home'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {Story} from '../components/Story'
import {uploadFile} from '../utility/uploadFile'
import { PropagateLoader } from 'react-spinners'
import { AddPost } from '../utility/cruduUtility'


const midleStyle={
  position:'absolute',
  top:'50%',
  left:'50%',
  transform:'translate(-50%,-50%)',
  display:'flex',
  flexdirection:"row",
}

export  const AddEditPost = () => {
  const {user} = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [uploaded, setUpLoaded] = useState(false)
  const [photo, setPhoto] = useState(null)
  const [story, setStory] = useState(null)
  const {register,handleSubmit, formState: { errors }} = useForm()

  const onSubmit=async (data)=>{
    setLoading(true)
    console.log(data.displayName);
    try {
      console.log(data);
      let newPostData={
        ...data,
        story,
        author:user.displayName,
        userId:user.uid,
        category:"Rajz"
      }
      
      const file=data?.file ? data?.file[0] : null


      const {url,id} = file ? await uploadFile(file) : {}
      
      delete newPostData.file
      newPostData={...newPostData, photo:{url,id}}
      console.log('postData:', newPostData);
      AddPost(newPostData)
      setUpLoaded(true)
    } catch (error) {
        console.log(error);
        
    }finally{
      setLoading(false)
    }
    
  }



  if (!user) return <Home/>
  return (
    <div className='page' >
    <div className='profilepage'  style={midleStyle}>
      <form onSubmit={handleSubmit(onSubmit)}>
          
        <div>
          <h5>A bejegyzés címe: </h5>
          <br />
          <input {...register('title',{required:true})} type='text' />
          <p className='text-danger'>{errors?.title && 'A cím megadása kötelező'}</p>
          <Story setStory={setStory} uploaded={uploaded}/>
        </div>
        <div >
          <p></p>
          <h5>Kép feltöltése:</h5>
          <p></p>
          <div >
            <input {...register('file',{
            validate:(value)=>{
                if(!value[0]) return true
                const acceptedFormats=['jpg', 'png', 'svg']
                //console.log(value[0]);
                const fileExtension=value[0].name.split('.').pop().toLowerCase()
                if(!acceptedFormats.includes(fileExtension)) return "Invalid file format"
                if(value[0].size>1*1000*1024) return "Invalid file size"
                return true
                
            }
           })}  type='file'
           onChange={(e)=>setPhoto(URL.createObjectURL(e.target.files[0]))}
           />
          </div>
           
           <p className='text-danger'>{errors?.file?.message}</p>
        </div>
        <button>Mentés</button>
    </form>
    <p></p>
    {loading && <PropagateLoader />}
    {photo&& <img style={{maxHeight:150, maxWidth:200}} src={photo}/>}
    </div>
  </div>
  )
}


