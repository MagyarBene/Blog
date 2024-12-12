import React from "react";
import { auth } from "../utility/firebaseApp";
import {createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

export const UserContext=createContext()

export const UserProvider=({children})=>{
    const [user, setUser]=useState(null)
    const [msg, setMsg]=useState({})

    
    useEffect(()=>{
        onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        })
        return ()=>unsubscribe()
    },[])

    const signInUser=async (email, password)=>{
        setMsg(null)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            setMsg({signin:'Sikeres belépés!'})

        } catch (error) {
            console.log(error);
            setMsg({err:'Hiba a belépésnél'})

            
        }
    }


    const logoutUser=async ()=>{
        await signOut(auth, signInUser, logoutUser)
        setMsg(null)
    }


    const signUpUser=async (email, password, displayName)=>{
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(auth.currentUser, {displayName})
            setMsg({})
            setMsg({signup:"Sikeres regisztráció"})
            console.log('siker');
            
        } catch (error) {
            setMsg({err:'Sikertelen regisztráció'})
        }
    }

    const resetPassword=async (email)=>{
        try {
            await sendPasswordResetEmail(auth, email)
            setMsg({resetPW:"A jelszóvisszaállító email elküldve "})
        } catch (error) {
            setMsg({err:error.message})
        }
    }

    const updateUser=async (displayName,photoURL)=>{
        try {
            if(displayName && photoURL) await updateProfile(auth.currentUser, {displayName,photoURL})
            else if(displayName) await updateProfile(auth.currentUser, {displayName})
            else if(photoURL)await updateProfile(auth.currentUser, {photoURL})
            setMsg({})
            setMsg({update:"Sikeres módosítás"})
            console.log('siker');
            
        } catch (error) {
            setMsg({err:'Sikertelen regisztráció'})
        }
    }

    const deleteAccount=async ()=>{
        try {
            await deleteUser(auth.currentUser)
            console.log('fiók törölve');
            
        } catch (error) {
            console.log(error);
            
        }
    }



    return(
        <UserContext.Provider value={{user, signInUser, logoutUser, msg, setMsg,signUpUser, resetPassword, updateUser, deleteAccount}}>
            {children}
        </UserContext.Provider>
    )
}