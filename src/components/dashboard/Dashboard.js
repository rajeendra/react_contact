
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import NavTabs from '../layout/NavTabs'; 
import Box from '@mui/material/Box';

const Dashboard = () => {

    const theme = createTheme();

    return (
        <>
        <NavTabs val={0} />
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ mt: 2, mb: 4 }}>

            
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
