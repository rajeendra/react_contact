
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
        <Box class="App">
            <CssBaseline />
                {/* All page content comes here */}
                <AppBar position="fixed" color="default">
                    <NavTabs val={0} />
                </AppBar>
                <Box class="content">   
                    <Box class="section-up">
                        <Alert severity="info">Check home page out!</Alert>              
                        <Alert variant="outlined" color="error">
                            We've built the foundational components for your design system, 
                            enabling you to launch that cool product you've been thinking about even faster. 
                            We got your back!
                        </Alert>                    
                    </Box>                

                    <Box class="section-down">
                        <Alert severity="info">Check home page down under out!</Alert>
                        <Footer />
                    </Box>
                </Box>
        </Box>
        </ThemeProvider>
        </>
      );
}

export default Dashboard
