import * as React from 'react';
import { useState, useEffect } from "react";
import { useRef } from 'react';
import { useParams } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavTabs from '../layout/NavTabs';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

import Footer from '../layout/Footer';
import UsertList from './UsertList';
import UserEdit from './UserEdit';

import ExtSnackbar, {ERROR,INFO,SUCCESS} from "../custom/ExtSnackbar";

import useAuth from "../../iam/hooks/useAuth";


const Admin = (props) => {
    const {admin, setAdmin} = props;
    const [app, setApp] = useState({toScreen:'list'});

    const screenTitle = () => {
        switch(app.toScreen) {

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
                                        Users
                                    </Typography>                                
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
                                        User info
                                    </Typography>                                
                                </Box>
                        </Box>
                        </>   
            
            default: return <></>
        }
    }   
 
    const screenNavigate = () => {
        switch(app.toScreen) {
            case "list":    return <UsertList admin={admin} setAdmin={setAdmin} />;

            case "edit":    return <UserEdit />;
            
            default: return <></>
        }
    } 

    const theme = createTheme();
    
    return (
        <>
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <Box minHeight='100vh' >
                {/* All page content comes here */}
                <AppBar position="fixed" color="default">
                    <NavTabs val={3} />
                    {screenTitle()}
                </AppBar>
                { screenNavigate() }
            </Box>
            <Footer />
        </Container>
        </ThemeProvider>        
        </>   
      );
}

export default Admin
