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
import { CategContext } from '../context/CategContext'
import {DropdownComp } from '../components/DropdownComp'
import {Alert} from '../components/Alert'
import { center } from '@cloudinary/url-gen/qualifiers/textAlignment'
import { max } from '@cloudinary/url-gen/actions/roundCorners'


const midleStyle={
  position:'absolute',
  top:'50%',
  left:'50%',
  transform:'translate(-50%,-50%)',
  display:'flex',
  flexdirection:"row",
  height:600,
  border:"2px solid white",
  margin:20,
  padding:30,
  paddingLeft:40,
}

export  const AddEditPost = () => {
 
  
  const {categories}=useContext(CategContext)
  const {user} = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [uploaded, setUpLoaded] = useState(false)
  const [photo, setPhoto] = useState(null)
  const [story, setStory] = useState(null)
  const [selCateg,setSelCateg] = useState(null)
  const {register,handleSubmit, formState: { errors }, reset} = useForm()

  const onSubmit=async (data)=>{
    setLoading(true)
    //console.log(data.displayName);
    try {
      console.log(data);
      let newPostData={
        ...data,
        story,
        author:user.displayName,
        userId:user.uid,
        category:selCateg,
        likes:[]

      }
      
      const file=data?.file ? data?.file[0] : null


      const {url,id} = file ? await uploadFile(file) : {}
      
      delete newPostData.file
      newPostData={...newPostData, photo:{url,id}}
      console.log('postData:', newPostData);
      AddPost(newPostData)
      setUpLoaded(true)
      reset()
      setPhoto(null)
      setStory(null)
    } catch (error) {
        console.log(error);
        
    }finally{
      setLoading(false)
    }
    
  }
//console.log(story);



  if (!user) return <Home/>
  return (
    <div className='page' >
      <div>
      <div className="keyboard post">
        <span className="key">Ú</span>
        <span className="key">j</span>
        <span className="key">P</span>
        <span className="key">o</span>
        <span className="key">s</span>
        <span className="key">z</span>
        <span className="key">t</span>
      </div>
      </div>
    <div className='profilepage addBox'  style={midleStyle}>
    <Story  setStory={setStory} uploaded={uploaded}/>
      <form style={{margin:20}} onSubmit={handleSubmit(onSubmit)}>
          
        <div>
          <h5>A bejegyzés címe: </h5>
          <br />
          <input {...register('title',{required:true})} type='text' />
          <p className='text-danger'>{errors?.title && 'A cím megadása kötelező'}</p>
          <DropdownComp categories={categories} selCateg={selCateg} setSelCateg={setSelCateg}/>
          
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
        <button disabled={!selCateg || !story}>Mentés</button>
        <div>
          {photo&& <img  style={{maxHeight:"250px", maxWidth:"250px", margin:20}} src={photo}/>}
        </div>
        
    </form>
      {loading && <PropagateLoader />}
      {uploaded && <Alert txt='Sikeres feltöltés!'/>}
      
    </div>
    
  </div>
  )
}


