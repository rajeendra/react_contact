import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

import NavTabs from "../layout/NavTabs";
import ContactList from "./ContactList";
import ContactAdd from "./ContactAdd";
import ContactEdit from "./ContactEdit";
import ContactNumber from "./ContactNumber";

import useAuth from "../../iam/hooks/useAuth";
import useContactsSearch from "../hooks/useContactsSearch";
import { AppBar } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

const Contact = () => {
    
    //console.log('Contact');

    const { id } = useParams();
    const { auth, setAuth } = useAuth(); 

    const [contacts, setContacts] = useState();
    const [searchFilter] = useContactsSearch();

    const [toScreen, setToScreen] = useState('list');
    const [fromScreen, setFromScreen] = useState('');
    const [searchTxt, setSearchTxt] = useState(auth?.searchTxt ? auth?.searchTxt : '');

    const handleScreen = (toScr) => {
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
    
    const handleSearch = (e) => {
        const element = document.getElementById('searchTxt')
        const sTxt = ( e =='click' ? element.value.trim() : auth?.searchTxt?.length>0 ? auth?.searchTxt : '')
        
        element.value=sTxt;
        setSearchTxt(sTxt)
        
        setAuth(obj => {
            return {
                ...obj,
                searchTxt : sTxt,
            }
        })        

        const filteredResult = searchFilter(sTxt);
        setContacts(filteredResult);        
    }

    const handleClear = () => {
        const element = document.getElementById('searchTxt');
        element.value = '';
        setSearchTxt('')
        setAuth(obj => {
            return {
                ...obj,
                searchTxt : null
            }
        })         
        setContacts(auth?.fetchedContacts);     
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(value);
    };  

    const theme = createTheme();

    const screenTitle = () => {
        switch(toScreen) {

            case "list": 
                return  <>
                        <Box
                            sx={{
                                mt: .5,
                                pt: 0,
                                borderRadius: 1,
                                display: 'inline-flex',
                                justifyContent: 'flex-start',
                                //bgcolor: 'primary.light',
                                bgcolor: 'primary.main',
                                //float: 'left'
                            }}
                        >
                                <Box sx={ { bgcolor: 'primary.main', pl:2, pr:1, pt:0.5, mr:1, color: 'white'} }>
                                    <Typography sx={ { px:1, my: 0.5, py:0, borderRadius: 1, bgcolor: 'primary.main'}} variant="h6" color="white">
                                        Contacts
                                    </Typography>                                
                                </Box>

                                <Box sx={ { bgcolor: 'primary.main', display: 'flex', float: 'right', px:1, py:0, mx:0, my:0, width: '100%'} }>
                                    
                                    <TextField sx={ { my: 0.5, py:0, bgcolor: 'white' }} size="small"
                                        //error={!formErrors.fname ? false : true}
                                        //helperText={formErrors.fname}                
                                        margin="normal"
                                        //required
                                        //fullWidth
                                        id="searchTxt"
                                        //label="First Name"
                                        //label="Searh text"
                                        name="searchTxt"
                                        //autoComplete="on"
                                        //autoFocus
                                        //value={searchTxt}
                                        //onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment 
                                            position="start"
                                            onClick={()=>{ handleSearch('click') }}
                                            >
                                                <SearchIcon />
                                            </InputAdornment>
                                            ),
                                            endAdornment: (
                                            <InputAdornment
                                                position="end"
                                                //style={{ display: showEditIcon }}
                                                onClick={handleClear}
                                            >
                                                <ClearIcon />
                                            </InputAdornment>
                                            )
                                        }}                                    
                                    />

                                </Box>

                                <Box
                                    sx={{
                                        bgcolor: 'primary.main',
                                        py: 0,
                                        my: 0,
                                        px:.5,
                                        //display: 'inline-flex',
                                        display: 'flex',
                                        //justifyContent: 'flex-end',
                                        float: 'right',
                                    }}
                                >
                                        <Fab size="small" onClick={()=>handleScreen('add')} color="primary" aria-label="add" sx={{ mx:1, my: 0.5, py:0}}>
                                            <AddIcon />
                                        </Fab>
                                </Box>                
                        </Box>
                        </>   
                
            case "edit": 
                return  <>
                        <Box
                            sx={{
                                mt: .5,
                                pt: 0,
                                borderRadius: 1,
                                display: 'inline-flex',
                                justifyContent: 'flex-start',
                                //bgcolor: 'primary.light',
                                bgcolor: 'primary.main',
                                //float: 'left'
                            }}
                        >

                                <Box sx={ { bgcolor: 'primary.main', pl:2, pr:1, pt:0.5, mr:1, color: 'white'} }>
                                    <Typography sx={ { px:1, my: 0.5, py:0, borderRadius: 1, bgcolor: 'primary.main'}} variant="h6" color="white">
                                        Contact info
                                    </Typography>                                
                                </Box>
                        </Box>
                        </>   
            
            case "add": 
                return  <>
                        <Box
                            sx={{
                                mt: .5,
                                pt: 0,
                                borderRadius: 1,
                                display: 'inline-flex',
                                justifyContent: 'flex-start',
                                //bgcolor: 'primary.light',
                                bgcolor: 'primary.main',
                                //float: 'left'
                            }}
                        >

                                <Box sx={ { bgcolor: 'primary.main', pl:2, pr:1, pt:0.5, mr:1, color: 'white'} }>
                                    <Typography sx={ { px:1, my: 0.5, py:0, borderRadius: 1, bgcolor: 'primary.main'}} variant="h6" color="white">
                                        Contact info
                                    </Typography>                                
                                </Box>
                        </Box>
                        </>   

            case "number": 
            return  <>
                        <Box
                            sx={{
                                mt: .5,
                                pt: 0,
                                borderRadius: 1,
                                display: 'inline-flex',
                                justifyContent: 'flex-start',
                                //bgcolor: 'primary.light',
                                bgcolor: 'primary.main',
                                //float: 'left'
                            }}
                        >

                                <Box sx={ { bgcolor: 'primary.main', pl:2, pr:1, pt:0.5, mr:1, color: 'white'} }>
                                    <Typography sx={ { px:1, my: 0.5, py:0, borderRadius: 1, bgcolor: 'primary.main'}} variant="h6" color="white">
                                        Number info
                                    </Typography>                                
                                </Box>
                        </Box>
                    </>   

            default:        return <ContactList handleScreen={handleContactScreen} />;
        }
    }   
 
    const screenNavigate = () => {
        switch(toScreen) {
            // Nav back [Cancel/Save] - N/A | Nav forward - Edit/Add contact
            case "list":    return <ContactList searchTxt={searchTxt} contacts={contacts} setContacts={setContacts} handleSearch={handleSearch} fromScr={fromScreen} handleScreen={handleContactScreen} />;

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
