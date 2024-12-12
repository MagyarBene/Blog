import React from 'react'
import { Header } from '../components/Header'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap'

export const Posts = () => {
  const {categories}=useContext(CategContext)
  return (
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
  )
}


