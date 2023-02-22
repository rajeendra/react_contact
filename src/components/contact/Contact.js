import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';

import NavTabs from "../layout/NavTabs";
import ContactList from "./ContactList";
import ContactAdd from "./ContactAdd";
import ContactEdit from "./ContactEdit";
import ContactNumber from "./ContactNumber";

import useAuth from "../../iam/hooks/useAuth";
import { AppBar } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Contact = () => {
    const { id } = useParams();
    const { auth, setAuth } = useAuth(); 

    const [toScreen, setToScreen] = useState('list');
    const [fromScreen, setFromScreen] = useState('');

    const handleScreen = (toScr) => {
        //setToScreen(toScr);
        setFromScreen(toScreen);
        setToScreen(toScr);
    }

    const handleContactScreen = (view, contact) => {
        // set selectedContact in the app context in order to stop loosing it..
        // .. when component re-rendering if stored just in a variable

        // set selected contact in Context befoure display the screen
        contact && setAuth(prevFormData => {
            return {
                ...prevFormData,
                selectedContact : contact
            }
        })

        handleScreen(view);
    } 

    const handleNumbertScreen = (view, number) => {
        
        // set selected number in Context befoure display the screen
        // set null as for the new contact
        setAuth(prevFormData => {
            return {
                ...prevFormData,
                selectedNumber : number
            }
        })

        handleScreen(view);
    }     
    
    const theme = createTheme();

    const screenTitle = () => {
        switch(toScreen) {

            case "list": 
                return  <>
                        <Box
                            sx={{
                                display: 'inline-flex',
                                justifyContent: 'flex-start',
                                //float: 'left'
                            }}
                        >
                                <Box sx={ { px:1, py:1, mx:1, my:1, width: '100%', borderRadius: 1, color: 'white', bgcolor: 'primary.main'} }>
                                    <Typography variant="h6" color="white">
                                        Contacts
                                    </Typography>                                
                                </Box>
                                <Box
                                    sx={{
                                        //display: 'inline-flex',
                                        display: 'flex',
                                        //justifyContent: 'flex-end',
                                        float: 'right',
                                    }}
                                >
                                        <Fab onClick={()=>handleScreen('add')} color="primary" aria-label="add" sx={{ mx:1, my:0}}>
                                            <AddIcon />
                                        </Fab>
                                </Box>                
                        </Box>
                        </>   
                
            case "edit": 
                return  <>
                        <Box
                            sx={{
                                display: 'inline-flex',
                                justifyContent: 'flex-start',
                                //float: 'left'
                            }}
                        >
                                <Box sx={ { px:1, py:1, mx:1, my:1, width: '100%', borderRadius: 1, color: 'white', bgcolor: 'primary.main'} }>
                                    <Typography variant="h6" color="white">
                                        Contact info
                                    </Typography>                                
                                </Box>
                                <Box
                                    sx={{
                                        //display: 'inline-flex',
                                        display: 'flex',
                                        //justifyContent: 'flex-end',
                                        float: 'right',
                                    }}
                                >
                                        {/* <Fab color="primary" aria-label="add" sx={{ mx:1, my:0}}>
                                            <AddIcon />
                                        </Fab> */}
                                </Box>                
                        </Box>
                        </>   
            
            case "add": 
                return  <>
                        <Box
                            sx={{
                                display: 'inline-flex',
                                justifyContent: 'flex-start',
                                //float: 'left'
                            }}
                        >
                                <Box sx={ { px:1, py:1, mx:1, my:1, width: '100%', borderRadius: 1, color: 'white', bgcolor: 'primary.main'} }>
                                    <Typography variant="h6" color="white">
                                        Contact info
                                    </Typography>                                
                                </Box>
                                <Box
                                    sx={{
                                        //display: 'inline-flex',
                                        display: 'flex',
                                        //justifyContent: 'flex-end',
                                        float: 'right',
                                    }}
                                >
                                        {/* <Fab color="primary" aria-label="add" sx={{ mx:1, my:0}}>
                                            <AddIcon />
                                        </Fab> */}
                                </Box>                
                        </Box>
                        </>   

            case "number": 
            return  <>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            justifyContent: 'flex-start',
                            //float: 'left'
                        }}
                    >
                            <Box sx={ { px:1, py:1, mx:1, my:1, width: '100%', borderRadius: 1, color: 'white', bgcolor: 'primary.main'} }>
                                <Typography variant="h6" color="white">
                                    Number info
                                </Typography>                                
                            </Box>
                            <Box
                                sx={{
                                    //display: 'inline-flex',
                                    display: 'flex',
                                    //justifyContent: 'flex-end',
                                    float: 'right',
                                }}
                            >
                                    {/* <Fab color="primary" aria-label="add" sx={{ mx:1, my:0}}>
                                        <AddIcon />
                                    </Fab> */}
                            </Box>                
                    </Box>
                    </>   

            default:        return <ContactList handleScreen={handleContactScreen} />;
        }
    }   
 
    const screenNavigate = () => {
        switch(toScreen) {
            // Nav back [Cancel/Save] - N/A | Nav forward - Edit/Add contact
            case "list":    return <ContactList fromScr={fromScreen} handleScreen={handleContactScreen} />;

            // Nav back [Cancel/Save] - Contact list | Nav forward - Edit/Add number
            case "edit":    return <ContactEdit fromScr={fromScreen} contact={auth?.selectedContact} handleScreen={handleNumbertScreen} />;
            
            // Nav back [Cancel/Save] - Contact list | Nav forward - Add number
            case "add":    return <ContactAdd fromScr={fromScreen} handleScreen={handleNumbertScreen} />;

            // Nav back [Cancel/Save] - Edit contact | Nav forward - N/A
            // return from Contact edit - number pass is auth?.selectedNumber
            // return from Contact add  - number pass is null
            case "number":  return <ContactNumber fromScr={fromScreen} number={auth?.selectedNumber} handleScreen={handleContactScreen} />;

            default: return <ContactList fromScr={fromScreen} handleScreen={handleContactScreen} />;
        }
    }   
    
    return (
        <>
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <AppBar position="fixed" color="default">
                <NavTabs val={1} />
                {screenTitle()}
            </AppBar>
            { screenNavigate() }
        </Container>
        </ThemeProvider>        
        </>
    );
}

export default Contact
