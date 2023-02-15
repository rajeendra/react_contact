import { useState, useEffect } from "react";
import useAxiosPrivate from "../../iam/hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';

import useAuth from "../../iam/hooks/useAuth";

const ContactList = (props) => {

    const [contacts, setContacts] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth, setAuth } = useAuth(); 

    const { handleScreen } = props;

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getContacts = async () => {
            try {
                
                if(auth?.fetchedContacts?.length>0){
                    // get contacts from app context if available
                    isMounted && setContacts(auth?.fetchedContacts);
                }else{
                    const response = await axiosPrivate.get('/contacts', {
                        signal: controller.signal
                    });
                    console.log(response.data);
                    isMounted && setContacts(response.data);
                    
                    setAuth(prevFormData => {
                        return {
                            ...prevFormData,
                            fetchedContacts : response.data
                        }
                    })                    
                }
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getContacts();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const handleIconClicks = name => () => {
        console.log(name);
    }
    
    const handleTest = (action, json) => {
        console.log('handleTest');
        handleScreen(action,json);
    }

    const theme = createTheme();
    
    return (
        <>
            <Box sx={ { pl: 1, borderRadius: 1, color: 'white', bgcolor: 'primary.main'} }>
                <h3>Contacts</h3>
            </Box>    
            
            <Box sx={{ mx: 0, my: 1 }}>
                {contacts?.length
                    ? (
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {contacts.map((contact, i) => 
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PersonIcon />
                                        </Avatar>
                                    </ListItemAvatar>

                                    <ListItemText key={i} primary={contact?.fname + ' ' + contact?.lname} secondary={contact?.lname} />
                                    

                                    {/* Directly executing imported handleScreen() function */}
                                    {/* <IconButton aria-label="edit" onClick={()=>handleScreen('edit',contact)} >
                                        <EditIcon />
                                    </IconButton> */}
                                    {/* Inside a local functon executing imported handleScreen() function */}
                                    <IconButton aria-label="edit" onClick={()=>handleTest('edit',contact)} >
                                        <EditIcon />
                                    </IconButton>  


                                    <IconButton aria-label="delete" onClick={handleIconClicks('delete')}>
                                        <DeleteIcon />
                                    </IconButton>                                                                  
                                </ListItem>
                            )}
                        </List>                        
                    ) : <Alert severity="error">No users to display</Alert> 
                }
            </Box> 

            {/* 
            <article>
                <h2>Contacts</h2>
                {contacts?.length
                    ? (
                        <ul>
                            {contacts.map((contact, i) => <li key={i}>{contact?.fname} {contact?.lname}</li>)}
                        </ul>
                    ) : <p>No users to display</p>
                }
            </article>            
            */}

        </>
    );

}

export default ContactList
