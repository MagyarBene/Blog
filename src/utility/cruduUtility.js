import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore"
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
    //const docSnap=await getDoc(docRef)
    const unsubscirbe=onSnapshot(docRef, (snapshot)=>{
        setPost({...snapshot.data(),id:snapshot.id})
        return unsubscirbe
    })
   
}

export const deletePost= async (id)=>{
    const docRef=doc(db,'posts',id)
    await deleteDoc(docRef)
}

export const toggleLikes=async (uid,id)=>{
    const docRef=doc(db,'posts',id)
    const docSnap=await getDoc(docRef)
    const likesArr=docSnap.data().likes || []
    if(likesArr.includes(uid)){
        //console.log('unlike');
        await updateDoc(docRef,{likes:likesArr.filter(p_id=>p_id!=uid)})
        
    }else{
        //console.log('like');
        await updateDoc(docRef,{likes:[...likesArr,uid]})
    }
}

export const updatePost=async (id,{title,category,story})=>{
    const docRef=doc(db,'posts',id)
    await updateDoc(docRef,{title,category,story})
}