import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <nav className="navbar">
            <Link to="/"><h1>MusicDB</h1></Link>
            <div className="links">
                {/* Link replaces <a>, so that React can intercept the server communication
                and instead directly inject new content into page. */}
                {/* Instead of href='', to='' is used. */}
                <Link to="/">Home</Link>
                <Button
                variant='contained'
                color='primary'
                href="/create/">
                New Album
                </Button>
            </div>
        </nav>
     );
}

export default Navbar;