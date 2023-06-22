import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import Create from './Create';
import AlbumDetails from './AlbumDetails';
import NotFound from './NotFound';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#61876E',
      dark:'#3C6255',
      light: '#A6BB8D'
    },
    action: {
      active: "#1ecbe1",
      selected: "#1ecbe1",
      selectedOpacity: '0.4'
    }
  },
  typography: {
    fontFamily: 'Nunito',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#3C6255",
          width: 240
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        colorDefault: "#3C6255"
      }
    }
  }
})

function App() {
  const [albumState, setAlbumState] = useState({
    title: "",
    artist: "",
    year: "",
    about: "",
    rating: 0,
    favorite: false
  })

  const labels = {
    0: 'No rating set',
    1: 'Bad',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create 
              labels={labels}
              albumState={albumState}
              onSetAlbumState={setAlbumState}
              />
            </Route>
            <Route path="/albums/:id">
              <AlbumDetails 
              labels={labels}
              onSetAlbumState={setAlbumState}
              />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
