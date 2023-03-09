
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
        {/* <ThemeProvider theme={theme}> */}
        {/* <Container component="main" maxWidth="xs"  sx={{ minHeight: '100vh'}}> */}
        <div class="App">
            {/* <CssBaseline /> */}
            {/* <Box minHeight='100vh' > */}
                {/* All page content comes here */}
                <AppBar position="fixed" color="default">
                    <NavTabs val={0} />
                </AppBar>
                <div class="content">   
                    <div class="section-up">
                        <Alert severity="info">Check home page out!</Alert>              
                        <Alert variant="outlined" color="error">
                            We've built the foundational components for your design system, 
                            enabling you to launch that cool product you've been thinking about even faster. 
                            We got your back!
                        </Alert>                    
                    </div>                

                    <div class="section-down">
                        {/* <div class="section-down-space"></div> */}
                        {/* <Footer class="Footer" /> */}
                        <Footer />
                        {/* <Footer /> */}
                    </div>



                </div>
        </div>
        {/* </ThemeProvider> */}
        </>
      );
}

export default Dashboard
