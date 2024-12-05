import React from 'react'
import { useContext } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { UserContext } from '../context/UserContext'
import { Toastify } from '../components/Toastify'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { border } from '@cloudinary/url-gen/qualifiers/background'

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


export const Auth = () => {
    const {user, signInUser, msg, setMsg, signUpUser}=useContext(UserContext)
    const navigate=useNavigate()
    const location=useLocation()
    console.log(location.pathname);
    const isSignIn=location.pathname=='/auth/in' //true
    
    

    console.log(msg);
    
    useEffect(()=>{
      setMsg(null)
    },[])

    const handleSubmit=(event)=>{
        event.preventDefault()
        setMsg(null)
    const data=new FormData(event.currentTarget)
   
    if (isSignIn) {
      signInUser(data.get('email'),data.get('password'))
    }else{
      signUpUser(data.get('email'),data.get('password'), data.get('displayName'))
    }
    }
    
    console.log(user);
    
  return (
    <div className='page'>
      <div style={midleStyle} className='belep'>
        <h3>{isSignIn ? 'Belépés':'Regisztráció'}</h3>
      
        <Form  onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Email</Label>
                <Input name="email" placeholder="Email" type="email"/>
            </FormGroup>
            <FormGroup>
                <Label>Jelszó</Label>
                <Input name="password"  placeholder="Jelszó"  type="password"/>
            </FormGroup>
            {!isSignIn &&
            <FormGroup>
              <Label>Felhasználónév</Label>
              <Input name="displayName"  placeholder="Felhasználónév"  type="text"/>
            </FormGroup>
        }
            <Button className='button-66'>{isSignIn ? 'Belépés' : 'Regisztráció'}</Button>
        </Form>
        <div style={{textAlign:"right", position:"absolute", transform:"translate(130%, 90%)"}}>
            {isSignIn && <a className='pwreset' href="#" onClick={()=>navigate('/pwreset')}><b>Elfelejtett jelszó...</b></a>}
        </div>
        
        {msg && <Toastify {...msg}/>}
    </div>
    </div>
  )
}


