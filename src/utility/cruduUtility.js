import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore"
import { db } from "./firebaseApp"



export const readCategories=(setCategories)=>{
    const collectionRef=collection(db,'categories')
    const q=query(collectionRef, orderBy('name','asc'))
    const unsubscirbe =  onSnapshot(q,(snapshot)=>{
        setCategories(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
    })
    return unsubscirbe;
}

export const AddPost=async (formdata)=>{
    const collectionRef=collection(db,'posts')
    const newItem={...formdata,timestamp:serverTimestamp()}
    await addDoc(collectionRef,newItem)
}