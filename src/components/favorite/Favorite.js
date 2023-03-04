// Favorite

import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavTabs from '../layout/NavTabs';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';

import Footer from '../layout/Footer';

const Favorite = () => {

    const theme = createTheme();

    return (
        <>
        <ThemeProvider theme={theme}>
        {/* <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh'}}> */}
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <Box minHeight='100vh' >
                {/* All page content comes here */}
                <AppBar position="fixed" color="default">
                    <NavTabs val={2} />
                </AppBar>
                <Box sx={{ pt:7, px: 0, my: 0 }} ></Box>
                <Box sx={{ mx: 1, my: 1, justifyContent: 'center' }}>
                    <Alert severity="info">Check favorite page out!</Alert>              
                </Box>

            </Box>            
         </Container>
         <Footer />
        </ThemeProvider>        
        </>
      );
}

export default Favorite
