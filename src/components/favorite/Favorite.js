// Favorite

import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavTabs from '../layout/NavTabs';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';

const Favorite = () => {

    const theme = createTheme();
    
    return (
        <>
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <AppBar position="fixed" color="default">
                <NavTabs val={2} />
            </AppBar>

            <Box sx={{ mt: 2, mb: 4 }}>
                <Alert severity="success">Check favorite page out!</Alert>            
            </Box>
         </Container>
        </ThemeProvider>        
        </>
      );
}

export default Favorite
