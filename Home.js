import AlbumList from './AlbumList';
import useFetch from './useFetch';
import { Box } from '@mui/material';

const Home = () => {
    const { data: albums, isPending, error} = useFetch('http://localhost:8000/albums');
    return ( 
        <Box>
            <Box ml={3}>
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
            </Box>
            {albums && <AlbumList albums={albums}/>}
        </Box>
     );
}

export default Home;