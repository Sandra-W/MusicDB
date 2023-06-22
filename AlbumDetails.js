import { useParams } from "react-router-dom";
import useFetch from './useFetch';
import { useHistory } from "react-router-dom";
import { Box, Button, Container, Rating, Typography } from "@mui/material";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

const AlbumDetails = ( {onSetAlbumState, labels,}) => {
    const { id } = useParams();
    const {data: album, isPending, error} = useFetch('http://localhost:8000/albums/' + id);
    const history = useHistory();

    const handleDelete = (() => {
        fetch('http://localhost:8000/albums/' + id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        }) 
    });

    const handleEdit = (album => {
        onSetAlbumState({...album, value: album.value});
        history.push('/create')
        fetch('http://localhost:8000/albums/'+ id, {
          method: 'DELETE'
        });
    });

    return (
        <div>
            <Box ml={3}>
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
            </Box>
            <Container >
                {album && (
                    <Box >
                        <Typography variant="h2">{album.title}</Typography>
                        <Box display='flex' justifyContent='space-between'>
                            <Box>
                                <Typography variant="h6">{album.artist}</Typography>
                                <Typography variant="h6" gutterBottom>{album.year}</Typography>
                            </Box> 
                            <Box >
                                <Typography variant="h6">{labels[album.rating]}</Typography>
                                <Rating readOnly value={album.rating} size="medium"/>
                            </Box>
                        </Box>
                        <Typography gutterBottom>{album.about}</Typography>
                        <Button
                        startIcon={<DeleteOutlineRoundedIcon/>} 
                        variant="contained"
                        size="small"
                        onClick={handleDelete}>Delete</Button>
                        <Button
                        startIcon={<EditRoundedIcon/>}
                        variant="contained"
                        size="small"
                        sx={{marginLeft: '10px'}}
                        onClick={() => handleEdit(album)}>Edit</Button>
                    </Box>
                )} 
            </Container> 
        </div>
     );
}
 
export default AlbumDetails;