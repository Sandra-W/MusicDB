import { Grid, Typography} from "@mui/material";
import AlbumCard from "./AlbumCard";
import Container from '@mui/material/Container';
import Searchbar from "./Searchbar";
import { useState } from "react";

const AlbumList = ( {albums}) => {
    const [filterData, setFilterData] = useState('');
    const searchedAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(filterData.toLowerCase()) ||
    album.artist.toLowerCase().includes(filterData.toLowerCase())||
    album.year === (filterData));
    
    return (
        <Container maxWidth="false" >
            <Typography variant="h4" gutterBottom>All albums</Typography>
            <Searchbar filterData={filterData} onSetFilterData={setFilterData} />
            <Grid container spacing={2} >
                {searchedAlbums.map((album) => (
                    <Grid item key={album.id} xs={12} md={6} lg={4} >
                        <AlbumCard album={album} />
                    </Grid> 
                ))}
            </Grid>
        </Container>
     );
}

export default AlbumList;
