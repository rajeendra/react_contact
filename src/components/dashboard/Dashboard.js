
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import NavTabs from '../layout/NavTabs'; 
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';

import Footer from '../layout/Footer';
import useContactsSearch from '../hooks/useContactsSearch';

const Dashboard = (props) => {
    // only the function addNumbers() bringing in here, Other functions not bringing
    const { addNumbers }  = useContactsSearch();
    
    const [ msg, setMsg ] = React.useState("Check home page down under out!");
    const [ count, setCount] = React.useState(0);
    const [ onceClicked, setOnceClicked ] = React.useState(false);
    const { home, setHome } = props
    const theme = createTheme();

    const handleClick = () => {
        // Note, state value count update immediately reflect at UI 
        setCount(val=>val+1)
        setOnceClicked(true);
    }
    
    // This is the way to carry out any operation after any state change
    // In this occasion, after counter changed
    React.useEffect(
        ()=>{
            const x = home.appCount;
            // use a condition like this to have a conditional control over a effect
            // in this occation onceClicked will pause the operation at the loding time..
            // ..and it will start after the user click the button for the first time..
            // ..each login 
            onceClicked && setHome({appCount: x+1 })
            
            // exaple of a hook usage which returns a multiple values
            // Note, here state msg gonna update after home state update, .. 
            // .. also two time render gonna taking place
            onceClicked && setMsg( addNumbers(2,3) );
        }
    ,[count])   

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
                        <Alert severity="info">Check home page out! - {home.appCount} - {count} </Alert>              
                        <Alert variant="outlined" color="error">
                            We've built the foundational components for your design system, 
                            enabling you to launch that cool product you've been thinking about even faster. 
                            We got your back!
                        </Alert>  
                        <Button
                          sx={{ mt: 1}}  
                          variant="contained"  
                          onClick={ () => {handleClick('click');} }                    
                        >
                            Click
                        </Button>
                                           
                    </Box>                

                    <Box class="section-down">
                        {/* <Alert severity="info">Check home page down under out!</Alert> */}
                        <Alert severity="info">{msg}</Alert>
                        <Footer />
                    </Box>
                </Box>
        </Box>
        </ThemeProvider>
        </>
      );
}

export default Dashboard
