import { Box, InputAdornment, TextField } from "@mui/material";
import Search from '@mui/icons-material/Search';

const Searchbar = ({filterData, onSetFilterData}) => {
    
    return (
        <Box mb={3} > 
            <TextField
            fullWidth
            variant='standard' 
            placeholder='Search...'
            value={filterData}
            onChange={(e) => onSetFilterData(e.target.value)}
            InputProps={{
                startAdornment: (
                <InputAdornment position="start"  >
                    <Search color="secondary" />
                </InputAdornment>
                )
            }}
            />
        </Box>
    );
}
 
export default Searchbar;
