import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Home } from './Home'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Story } from '../components/Story'
import { uploadFile } from '../utility/uploadFile'
import { PropagateLoader } from 'react-spinners'
import { AddPost, readPost, updatePost } from '../utility/cruduUtility'
import { CategContext } from '../context/CategContext'
import { DropdownComp } from '../components/DropdownComp'
import { Alert } from '../components/Alert'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'


const midleStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  display: 'flex',
  flexdirection: "column",
  maxWidth: 900,
  maxHeight: 600,
  border: "2px solid white",
  margin: 20,
}

export const AddEditPost = () => {


  const { categories } = useContext(CategContext)
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [uploaded, setUpLoaded] = useState(false)
  const [photo, setPhoto] = useState(null)
  const [story, setStory] = useState(null)
  const [selCateg, setSelCateg] = useState(null)
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()

  const [post, setPost] = useState(null)
  const params = useParams()

  useEffect(() => {
    if (params?.id) readPost(params.id, setPost)
  }, [params?.id])



  console.log(post);
  useEffect(() => {
    if (post) {
      setValue("title", post.title)
      setSelCateg(post.category)
      setStory(post.story)
      setPhoto(post.photo.url)
    }
  }, [post])

  if (!user) return <Home />


  const onSubmit = async (data) => {
    setLoading(true)
    if (params.id) {
      try{
        //update
        updatePost(params.id,{...data,category:selCateg,story})
      }catch(error){
        console.log('update',error);
        
      }finally{
        setLoading(false)
      }
      
    } else {
      //insert

      //console.log(data.displayName);
      try {
        console.log(data);
        let newPostData = {
          ...data,
          story,
          author: user.displayName,
          userId: user.uid,
          category: selCateg,
          likes: []

        }


        const file = data?.file ? data?.file[0] : null


        const { url, id } = file ? await uploadFile(file) : {}

        delete newPostData.file
        newPostData = { ...newPostData, photo: { url, id } }
        console.log('postData:', newPostData);
        AddPost(newPostData)
        setUpLoaded(true)
        reset()
        setPhoto(null)
        setStory(null)

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false)
      }

    }
  }
  //console.log(story);



  if (!user) return <Home />
  return (
    <div className='page' >
      <div className="keyboard post" style={{marginLeft:40}}>
        <span className="key">P</span>
        <span className="key">o</span>
        <span className="key">s</span>
        <span className="key">z</span>
        <span className="key">t</span>
      </div>
      <div>
      </div>
      <div  className='profilepage addBox' style={midleStyle}>
        <div className='form'>
          <Story setStory={setStory} uploaded={uploaded} story={story} />
          <form className='form' style={{ margin: 10 }} onSubmit={handleSubmit(onSubmit)}>

            <div>
              <br />
              <input  {...register('title', { required:!params.id })} type='text' placeholder='Bejegyzés címe:' />
              <p className='text-danger'>{errors?.title && 'A cím megadása kötelező'}</p>
              <DropdownComp categories={categories} selCateg={selCateg} setSelCateg={setSelCateg} />

            </div>
            <div >
              <div className='na' >
                <input placeholder='Kép feltöltése:' disabled={params.id}  {...register('file',params.id?{}: {
                  validate: (value) => {
                    if (!value[0]) return true
                    const acceptedFormats = ['jpg', 'png', 'svg']
                    //console.log(value[0]);
                    const fileExtension = value[0].name.split('.').pop().toLowerCase()
                    if (!acceptedFormats.includes(fileExtension)) return "Invalid file format"
                    if (value[0].size > 1 * 1000 * 1024) return "Invalid file size"
                    return true

                  }
                })} type='file'
                  onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
                />
              </div>

              <p className='text-danger'>{errors?.file?.message}</p>
            </div>
            <button disabled={!selCateg || !story}>Mentés</button>
            <div>
              {photo && <img style={{ maxHeight: "150px", maxWidth: "150px", margin: 20 }} src={photo} />}
            </div>

          </form>
        </div>
        {loading && <PropagateLoader />}
        {uploaded && <Alert txt='Sikeres feltöltés!' />}

      </div>

    </div>
  )
}


