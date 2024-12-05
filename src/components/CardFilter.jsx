import React from 'react'
import { Button, Card, CardBody, CardImg, CardImgOverlay } from 'reactstrap'

export const CardFilter = ({ img_url, filter }) => {
  return (
    <div>
  <Card inverse style={{width: "250px", height:"350"}}>
    <CardImg 
      alt="Card image cap"
      src={img_url}
      style={{
        height: 350
      }}
      width="100%"
    />
    <CardImgOverlay>
      <Button style={{position:'absolute', top:'50%',left:'50%',transform:'translate(-50%,-50%)', opacity:0.8, backgroundColor:'black'}}>
        {filter}
      </Button>
     
     

    </CardImgOverlay>
  </Card>
</div>
    
  )
}


