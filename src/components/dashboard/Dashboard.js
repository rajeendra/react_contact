
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import NavTabs from '../layout/NavTabs'; 
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import RatingStars from '../custom/RatingStars';

import Footer from '../layout/Footer';
import useContactsSearch from '../hooks/useContactsSearch';

const Dashboard = (props) => {
    const { home, setHome } = props

    // only the hook's function addNumbers() bringing in here, Other functions not bringing
    const { addNumbers }  = useContactsSearch();
    
    const [ msg, setMsg ] = React.useState("The home page bottom text");
    const [ count, setCount] = React.useState(0);
    const [ number, setNumber] = React.useState(0);
    const [ numberOne, setNumberOne] = React.useState(1);
    const [ numberTwo, setNumberTwo] = React.useState(2);
    const [ onceClicked, setOnceClicked ] = React.useState(false);

    const handleRate = (rate) => {
        setHome({rate:rate})
    }

    const handleClickOne = () => {
        // Note, state value count update immediately reflect at UI 
        setCount(val=>val+1)
        setOnceClicked(true);
    }
    
    const handleClickTwo = () => {
        // This state number just set in here but not used in anyware
        // but ui update still happerning. it could detect by as time gets refresh
        setNumber(val=>val+1)
    }
    
    // This is the way to carry out any operation after any state change
    // In this occasion, after counter changed
    React.useEffect(
        ()=>{
            // use a condition like this to have a conditional control over a effect
            // In this occation onceClicked will pause the operation at the loding time..
            // ..and it will start after the user click the button for the first time..
            // ..each login 
            const x = home.appCount + 1;
            onceClicked && setHome({appCount: x })
            
            // exaple of a hook usage which returns a multiple values
            // Note, here state msg gonna update after home state update, .. 
            // .. also two time render gonna taking place
            onceClicked && setMsg( addNumbers(2,3) );
            
            // this demostrate how to update multiple state values at one time inside an useEffect
            onceClicked && setNumberOne( x => x + 1 );
            onceClicked && setNumberTwo( x => x + 1 );
        }
    ,[count])   

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
                        <Alert severity="info">Home page top text | Time: {new Date().getTime()}</Alert>              
                        
                        <Grid container spacing={1} sx={{ mt: 1}}>
                            <Grid item xs={4} md={4}>
                            <Alert color="success" variant="outlined" >{home.appCount}</Alert>  
                            </Grid>
                            <Grid item xs={4} md={4}>
                            <Alert color="success" variant="outlined" >{count}</Alert>  
                            </Grid>
                            <Grid item xs={4} md={4} >
                            <Alert color="success" icon={false} variant="outlined" > 
                                {numberOne} {'<-'} {numberTwo} 
                            </Alert>  
                            </Grid>
                        </Grid>                        

                        <Alert sx={{ mt: 1}} variant="outlined" color="error">
                            We've built the foundational components for your design system, 
                            enabling you to launch that cool product you've been thinking about even faster. 
                            We got your back!
                        </Alert>  
                        
                        <Grid container spacing={1} sx={{ mt: 1}}>
                            <Grid item xs={6} md={6}>
                                <Button
                                variant="contained"  
                                onClick={ () => {handleClickOne('click');} }                    
                                fullWidth >
                                    Click One
                                </Button>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <Button
                                variant="contained"  
                                onClick={ () => {handleClickTwo('click');} }                    
                                fullWidth >
                                    Click Two
                                </Button>
                            </Grid>
                        </Grid>                        
                        
                        
                        
                        <Box
                            sx={{
                                mt: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                // justifyContent: 'end',
                            }}
                        >
                            {/* <Alert>One</Alert> */}
                            {/* <Alert>Two</Alert> */}
                            <RatingStars rate={home.rate} handleRate={handleRate} ></RatingStars>
                        </Box>
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
