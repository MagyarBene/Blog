import { useEffect } from 'react';
import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';

export const Story=({setStory, uploaded,story})=> {
  const [html, setHtml] = useState('');
  
  useEffect(()=>{
    setHtml(story)
  },[story])

  return (
    <Editor className='editor' style={{maxWidth:500 , maxHeight:800, textAlign:'justify', overflowWrap:'break-word'}} value={html} onChange={(e)=>setHtml(e.target.value)} 
        onBlur={()=>setStory(html)}
    />
    
  );
}