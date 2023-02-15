import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavTabs from "../layout/NavTabs";
import ContactList from "./ContactList";
import ContactEdit from "./ContactEdit";
import ContactNumber from "./ContactNumber";
import useAuth from "../../iam/hooks/useAuth";

const Contact = () => {
    const { id } = useParams();
    const { auth, setAuth } = useAuth(); 

    const [screen, setScreen] = useState('list');

    const handleScreen = (scr) => {
        setScreen(scr);
    }

    //const handleScreenNavigation = (view, contact) => {
    const handleContactScreen = (view, contact) => {
        // set selectedContact in the app context in order to stop loosing it..
        // .. when component re-rendering if stored just in a variable

        setAuth(prevFormData => {
            return {
                ...prevFormData,
                selectedContact : contact
            }
        })

        setScreen(view);
    } 
    
    const theme = createTheme();

    const screenNavigate = () => {
        switch(screen) {
            //case "list":   return <ContactList onClickFun={handleScreenNavigation} handleScreen={handleScreen} />;
            case "list":   return <ContactList handleScreen={handleContactScreen} />;
            case "edit":   return <ContactEdit contact={auth?.selectedContact} handleScreen={handleScreen} />;
            case "number":   return <ContactNumber contact={auth?.selectedContact} handleScreen={handleContactScreen} />;

            default:      return <ContactList handleScreen={handleContactScreen} />;
        }
    }   
    
    return (
        <>
        <NavTabs val={1} />
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            { screenNavigate() }
        </Container>
        </ThemeProvider>        
        </>
    );
}

export default Contact
