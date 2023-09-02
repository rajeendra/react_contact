// Album.js

import { useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavTabs from '../layout/NavTabs';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import CardList from "./CardList";
import AlbumList from './AlbumList';
import AlbumSlider from "./AlbumSlider";
import Footer from '../layout/Footer';

const Album = (props) => {

    const {album, setAlbum } = props
    const [app, setApp] = useState({toScreen:'albums'});

    const handleToggle = (album) => {
        if(app.toScreen == "albums"){
            setApp( obj => { return {...obj, toScreen:'cards'} } )    
        }
        if(app.toScreen == "cards"){
            setApp( obj => { return {...obj, toScreen:'albums'} } )    
        }
        console.log("handleToggle")  
    }

    const handleAlbum = (album) => {
        album && setApp({toScreen:'album'})
        !album && setApp({toScreen:'albums'})
        
        console.log(album.img)  
    }

    const screenTitle = () => {
        var scr = app.toScreen;
        var title = "Albums";
        
        title = (scr == "cards" ? "Cards" : "Albums")
        scr = (scr == "cards" ? "albums" : scr)
        
        switch(scr) {

            case "albums": 
                return  <>
                        <Box
                            sx={{
                                mt: .5,
                                pt: 0,
                                borderRadius: 1,
                                display: 'inline-flex',
                                justifyContent: 'flex-start',
                                //bgcolor: 'primary.light',
                                bgcolor: 'primary.main',
                                //float: 'left'
                            }}
                        >
                                <Box sx={ { bgcolor: 'primary.main', pl:2, pr:1, pt:0.5, mr:1, color: 'white'} }>
                                    <Typography onClick={(x)=> handleToggle(x)} sx={ { px:1, my: 0.5, py:0, borderRadius: 1, bgcolor: 'primary.main'}} variant="h6" color="white">
                                        {title}
                                    </Typography>                                
                                </Box>
          
                        </Box>
                        </>   
                
            case "album": 
                return  <>
                        <Box
                            sx={{
                                mt: .5,
                                pt: 0,
                                borderRadius: 1,
                                display: 'inline-flex',
                                // display: 'flex',
                                justifyContent: 'flex-start',
                                //bgcolor: 'primary.light',
                                bgcolor: 'primary.main',
                                //float: 'left'
                            }}
                        >

                                <IconButton
                                    sx={{ pl:2, color: 'rgba(255, 255, 255, 0.54)' }}
                                    // aria-label={`info about ${item.title}`}
                                    onClick={()=>handleAlbum()}
                                >
                                    <ArrowBackIosNewIcon />
                                </IconButton>                                    
                                <Box sx={ { bgcolor: 'primary.main', pl:2, pr:1, pt:0.5, mr:1, color: 'white'} }>
                                    <Typography sx={ { px:1, my: 0.5, py:0, borderRadius: 1, bgcolor: 'primary.main'}} variant="h6" color="white">
                                        Album
                                    </Typography>                                
                                </Box>
                        </Box>
                        </>   
            
            default: return <></>
        }
    }   

    const screenNavigate = () => {
        switch(app.toScreen) {
            case "cards": return <CardList/>;

            case "albums": return <AlbumList handleAlbum={handleAlbum} />;

            case "album": return <AlbumSlider handleAlbum={handleAlbum} />;
            
            default: return <></>
        }
    }   

    const theme = createTheme();

      return (
        <>
        <ThemeProvider theme={theme}>
        <Box class="App">
            <CssBaseline />
                {/* All page content comes here */}
                <AppBar position="fixed" color="default">
                    <NavTabs val={3} />
                    {screenTitle()}
                </AppBar>
                <Box class="content">   
                    <Box class="section-up">
                        { screenNavigate() }  
                    </Box>                

                    <Box class="section-down">
                        <Footer />
                    </Box>
                </Box>
        </Box>
        </ThemeProvider>
        </>
      );
}

export default Album
  
