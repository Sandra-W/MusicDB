import { AppBar, Avatar, Box, Drawer, IconButton, Link, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import logo from './musicdb_logo.jpg';
import avatar from './avatar.png';
import { useState } from "react";

const drawerWidth = 240;

const Layout = ({ children }) => {
    const history = useHistory()
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: 'Home', icon: <HomeRoundedIcon />, path: '/'},
        { text: 'Add Album', icon: <AddCircleOutlinedIcon />, path: '/create'}
    ]

    const drawerContent = (
        <div>
            <Link href="/"><img src={logo} alt="logo" height="197px" width="240"/></Link>
            <Typography variant="h4" color={'white'} align="center" m={4}>Welcome!</Typography>
            <List>
                {menuItems.map((item) => (
                    <ListItemButton 
                    key={item.text} 
                    selected={location.pathname === item.path ? true : null}
                    onClick={() => history.push(item.path)}>
                        <ListItemIcon >{item.icon}</ListItemIcon>
                        <ListItemText 
                        primaryTypographyProps={{color: 'white'}}  
                        primary={item.text}/>
                    </ListItemButton>
                ))}
            </List>
        </div>
    )

    return (
        <Box display='flex'> 
            <AppBar>
                <Toolbar>
                    <IconButton
                    size="large"
                    onClick={handleDrawerToggle}
                    sx={{ display: {sm: "none"}}}>
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{flexGrow: 1}}/>
                    <Typography variant="h6" color='white' mr={2} >
                        User
                    </Typography>
                    <Avatar src={avatar} sx={{ width: 42, height: 42 }}/>
                </Toolbar>
            </AppBar>
            <Drawer
            variant="permanent"
            open
            sx={{
                width: drawerWidth,
                display: {xs: 'none', sm: 'block'},
              }}>
                {drawerContent}
            </Drawer>
            <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{keepMounted: true}}
            sx={{width: drawerWidth}}
            >
                {drawerContent}
            </Drawer>
            <Box mb={3} marginTop={10}  sx={{width: {xs: '100%', sm: `calc(100% - ${drawerWidth}px)`, }}}>
                {children}
            </Box>
        </Box>
    );
}
 
export default Layout;