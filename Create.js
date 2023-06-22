import { useHistory } from "react-router-dom";
import { Box, Button, Container, Rating, TextField, Typography } from "@mui/material";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import { useState} from 'react';

const Create = ({labels, albumState, onSetAlbumState}) => {
    const [hover, setHover] = useState(0);
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const getLabelText = (rating) => { 
        return `${labels[rating]}`;
    }

    const handleYearInput = (e) => {
        const regex = /^[0-9\b]+$/;
        if(e.target.value === "" || regex.test(e.target.value)){
            onSetAlbumState((album) => ({...album, year: e.target.value}))
        }
    }

    const handleChange = (e) => {
        onSetAlbumState(album => ({...album, [e.target.name]: e.target.value}))    
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        fetch('http://localhost:8000/albums/', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({...albumState})
        }).then(() => {
            setIsPending(false);
            onSetAlbumState({});
            history.push('/'); 
        }) 
    }
    
    return ( 
        <Container >
            <Typography variant="h4" align="center" >
                Add a New Album
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField 
                label="Album title"
                margin="normal"
                fullWidth
                required
                name="title"
                value={albumState.title}
                onChange={handleChange}/>
                
                <TextField
                label="Album artist"
                fullWidth
                margin="normal"
                required
                name="artist"
                value={albumState.artist}
                onChange={handleChange} 
                />

                <TextField
                label="Album year"
                fullWidth
                margin="normal"
                required
                helperText="Only numbers [0-9] allowed."
                name="year"
                value={albumState.year}
                onChange={(e) => handleYearInput(e)} 
                />

                <TextField
                label="About album"
                multiline
                minRows={12}
                fullWidth
                margin="normal"
                name="about"
                value={albumState.about}
                onChange={handleChange} 
                />
                
                <Box alignItems='center' display='flex' flexDirection='column' mt={2}>
                    {albumState.rating !== null && (<Box>{labels[hover !==-1 ? hover : albumState.rating]}</Box>)}
                    <Rating  
                     size="large"
                     getLabelText={getLabelText}
                     name="rating"
                     value={albumState.rating}
                     sx={{marginBottom: '16px'}}
                     onChange={(event, newRating) => {
                        onSetAlbumState((album) => ({...album, rating: newRating}))}
                    }
                     onChangeActive={(event, newHover) => {
                        setHover(newHover);}
                    }/> 
                     
                    {!isPending && <Button  
                    startIcon={<LibraryAddOutlinedIcon />} 
                    type="submit" 
                    variant="contained" 
                    color="primary">
                    Add album</Button>}
                    
                    {isPending && <Button
                    startIcon={<HourglassEmptyOutlinedIcon />}
                    variant="contained" 
                    disabled>
                    Saving...</Button>}
                </Box>
            </form>
        </Container>
     );
}
 
export default Create;