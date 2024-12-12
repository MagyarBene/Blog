import React from 'react'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap'


const midleStyle={
  position:'absolute',
  top:'50%',
  left:'50%',
  transform:'translate(-50%,-50%)',
  display:'flex',
  flexdirection:"row",
}

export const Home = () => {
  const {categories}=useContext(CategContext)
  console.log(categories);
  
  return (
    <div className='MainHome'>
      <div>
      <div className="keyboard">
        <span className="key">B</span>
        <span className="key">L</span>
        <span className="key">O</span>
        <span className="key">G</span>
      </div>
      </div>
      <div className='Homepage'>
      {categories && categories.map(obj=>
        <Card className='card' key={obj.id} style={{maxHeight:600, maxWidth:400,border:"0.5px solid black"}} inverse>
          <CardImg alt="Card image cap" src={obj.photo}
            style={{
              height: 600,
              maxWidth:300,
            }}
            width="100%"
          />
          <CardImgOverlay>
            <CardTitle tag="h5">
              {obj.name}
            </CardTitle>
          </CardImgOverlay>
        </Card>
      )}
    </div>
    </div>
    

  
  )
}


