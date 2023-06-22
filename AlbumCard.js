import { CardActionArea, Checkbox, Rating, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";

const AlbumCard = ({album}) => {
    const [checked, setChecked] = useState(album.favorite)
    const [albumState, setAlbumState] = useState(album)


            //TODO ADD FAVORITE FUNCTIONALITY BELOW (NOT COMPLETED)


    const handleFavorite = (e) => {
        setAlbumState({...album, favorite: checked}) 

        fetch('http://localhost:8000/albums/' + albumState.id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(albumState)
        }).then(response => console.log(response.status)); 
        
        setChecked(e.target.checked)
    } 
    
    return (
        <CardActionArea href={`/albums/${album.id}` }>
            <Card elevation={4} >
                <CardHeader
                sx={{"& .MuiCardHeader-content": {overflow: "hidden" }}}
                title={<Typography noWrap variant="h5">{album.title}</Typography>}
                subheader={album.artist}
                action={
                    <Checkbox 
                    checked={checked}
                    onChange={handleFavorite} 
                    icon={<FavoriteBorderIcon/>} 
                    checkedIcon={<FavoriteIcon/>} />
                }/>
                <CardContent sx={{paddingTop: 0}}>
                <Typography
                sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    }}
                variant="body2">
                {album.about}
                </Typography>
                        <Rating
                        sx={{float:'left', paddingBottom:'12px', paddingTop:'12px'}}
                        readOnly
                        value={album.rating}
                        size="small"/>
                </CardContent>
            </Card>
        </CardActionArea>
    );
}

export default AlbumCard;