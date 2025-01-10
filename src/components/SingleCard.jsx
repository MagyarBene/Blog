
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { extractUrlAndId, sanitizeHtml } from '../utility/utils';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useState } from 'react';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Navigate, useNavigate } from 'react-router-dom';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: ({ expand }) => !expand,
        style: {
          transform: 'rotate(0deg)',
        },
      },
      {
        props: ({ expand }) => !!expand,
        style: {
          
        },
      },
    ],
  }));

  


export const SingleCard = ({author, category, title, story, timestamp, userId, photo,id}) => {
    const {user}=useContext(UserContext);
    const [expanded, setExpanded] = React.useState(false);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();

    const categIcon = {
        'Járművek': <AgricultureIcon/>,
        'Rajz': <ArchitectureIcon/>,
        'Utazás':<AirplaneTicketIcon/>,
        'Szórakozás':<SportsBarIcon/>
    }

    const getCategoryIcon = () =>{
        if (category=='Járművek') return categIcon.Járművek
        if (category=='Utazás') return categIcon.Utazás
        if (category=='Szórakozás') return categIcon.Szórakozás
        if (category=='Rajz') return categIcon.Rajz
      }
    /*const handleExpandClick = () => {

    };*/
    const handleLike = () =>{
        setLiked(!liked)
    }

    return (
 
        <Card  sx={{background:"lightblue",  maxWidth: 310, maxHeight:600, height:500, width:310, margin:'10px', borderBottom:"1px solid black",}}>
          <CardHeader sx={{border:"1px solid black"}}
            avatar={
                getCategoryIcon() || <DoDisturbIcon/>
                
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={title}
            subheader={author}
          />
          <CardMedia
            component="img"
            height="300"
            width="200"
            image={photo.url}
            alt={title}
           style={{maxWidth:300, margin:'auto', border:"2px solid black"}}/>
          <CardContent style={{borderTop:"2px solid black", }} >
            <Typography  variant="body2"  sx={{ color: 'text.secondary', fontSize:'12px' }}>
                {sanitizeHtml(story).substring(0, 70)+"..."}
            </Typography>
          </CardContent>
          <CardActions  disableSpacing>
            <IconButton aria-label="add to favorites" onClick={handleLike}>
              {liked? <FavoriteIcon sx={{color:red[500]}}/> : <FavoriteIcon/>}
            </IconButton>
            <IconButton aria-label="share">
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={()=>{navigate("/singlepost/"+id)}}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ReadMoreIcon />
            </ExpandMore>
          </CardActions>
        </Card>
      );
    
 
}


