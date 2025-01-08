import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore"
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

export const readPosts=(setPosts, selectedCateg)=>{
    const collectionRef=collection(db,'posts')
    const q=selectedCateg.length==0 ?  query(collectionRef, orderBy('timestamp','desc')) 
    :
    query(collectionRef, where('category', 'in', selectedCateg))
    const unsubscirbe =  onSnapshot(q,(snapshot)=>{
        setPosts(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
    })
    return unsubscirbe;
}


export const readPost=async (id,setPost)=>{
    const docRef=doc(db,'posts',id)
    const docSnap=await getDoc(docRef)
    setPost({...docSnap.data(),id:docSnap.id})
}

export const deletePost= async (id)=>{
    const docRef=doc(db,'posts',id)
    await deleteDoc(docRef)
}