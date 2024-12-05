import React from 'react'
import { useContext } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { UserContext } from '../context/UserContext'
import { Toastify } from '../components/Toastify'


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

export const PwReset = () => {
  const {msg, resetPassword}=useContext(UserContext)

  const handleSubmit=(e)=>{
    e.preventDefault()
    const data=new FormData(e.currentTarget)
    resetPassword(data.get('email'))
    
  }

  return (
    <div className='page'>
      <div style={midleStyle} className='belep'>
        <h3>Jelszó módosítás</h3>
      
        <Form  onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Email</Label>
                <Input name="email" placeholder="Email" type="email"/>
            </FormGroup>
            
            <Button className='button-66'>Új jelszó igénylése</Button>
        </Form>
        {msg && <Toastify {...msg}/>}
    </div>
    </div>
  )
}


