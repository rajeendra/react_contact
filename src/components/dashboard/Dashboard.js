
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import NavTabs from '../layout/NavTabs'; 
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';

import Footer from '../layout/Footer';

const Dashboard = () => {

    const theme = createTheme();

    return (
        <>
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs"  sx={{ minHeight: '100vh'}}>
            <CssBaseline />
            <Box minHeight='100vh' >
                {/* All page content comes here */}
                <AppBar position="fixed" color="default">
                    <NavTabs val={0} />
                </AppBar>
                <Box sx={{ pt:7, px: 0, my: 0 }} ></Box>
                <Box sx={{ mx: 1, my: 1, justifyContent: 'center' }}>
                    <Alert severity="info">Check home page out!</Alert>              
                </Box>

                {/* <Alert variant="standard" color="info"> */}
                {/* <Alert variant="outlined" color="info"> */}
                {/* <Alert variant="filled" color="info"> */}
                <Alert variant="outlined" color="error">
                We've built the foundational components for your design system, 
                enabling you to launch that cool product you've been thinking about even faster. 
                We got your back!
                </Alert>
            </Box>
        </Container>
        <Footer />
        </ThemeProvider>        
        </>
      );
}

export default Dashboard
