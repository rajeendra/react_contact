
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import NavTabs from '../layout/NavTabs'; 
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';

const Dashboard = () => {

    const theme = createTheme();

    return (
        <>
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <AppBar position="fixed" color="default">
                <NavTabs val={0} />
            </AppBar>
            <Box sx={{ mt: 8, mb: 0 }}>

            
            {/* <Alert severity="error">This is an error alert — check it out!</Alert> */}
            {/* <Alert severity="warning">This is a warning alert — check it out!</Alert> */}
            {/* <Alert severity="info">This is an info alert — check it out!</Alert> */}
            <Alert severity="success">Check home page out!</Alert>            
            </Box>
        </Container>
        </ThemeProvider>        
        </>
      );
}

export default Dashboard
