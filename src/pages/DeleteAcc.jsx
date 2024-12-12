import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useConfirm } from 'material-ui-confirm'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const midleStyle={
    position:'absolute',
    top:'50%',
    left:'50%',
    transform:'translate(-50%,-50%)',
    display:'flex',
    flexdirection:"row",
}
export const DeleteAcc = () => {
    const {user, logoutUser, deleteAccount}= useContext(UserContext)
    const confirm=useConfirm()
    const navigate=useNavigate()

    useEffect(()=>{
        !user && navigate("/")
    },[user])

    const handleDelete=async ()=>{
        try {
            await confirm({
                decription:"Ez egy visszavonhatatlan művelet",
                confirmationText:'Igen',
                cancellationText:"Mégsem",
                title:"Biztosan ki szeretnéd törölni a felhasználói fiókodat?"

        })

        await deleteAccount()
        logoutUser()
        } catch (error) {
            console.log("mégse: ", error);
            
        }    
    }

  return (
    <div className='page' >
        <div style={midleStyle}  >
            <div className='delacc'>
              <button className='btn btn-danger' onClick={handleDelete}>Felhasználói fiók törlése</button>         
            </div>
     
        </div>
        
    </div>
  )
}


