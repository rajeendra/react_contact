import { useState, useEffect } from "react";
import { useRef } from 'react';
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

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import useAuth from "../../iam/hooks/useAuth";
import ExtSnackbar, {ERROR,INFO,SUCCESS} from "../custom/ExtSnackbar";
import ExtCircularProgress from "../custom/ExtCircularProgress";

const ContactList = (props) => {

    //const [contacts, setContacts] = useState();
    const {contacts} = props
    const {setContacts} = props

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth, setAuth } = useAuth(); 

    const { handleScreen } = props;
    const { handleFilterContacts } = props;

    const [enableDelete, setEnableDelete] = useState(false);
    const [deleteToggle, setDeleteToggle] = useState(false);
    const [deleteElement, setDeleteElement] = useState({});
    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
    }; 
    const handleDelete = (id, ix) => {
        setDeleteElement({id, ix})
        setOpen(true);
    };  
    const doDelete = () => {
        console.log(deleteElement)
        setOpen(false);
        setEnableDelete(true)
        setDeleteToggle(e => !e)
    };  
   
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getContacts = async () => {
            try {
                
                if( !(props.fromScr=='add')  && auth?.fetchedContacts?.length>0){
                    console.log('Fetching data from application context..')

                    // get contacts from app context if available
                    if(auth?.selectedContact){
                        const ctx = [];
                        auth?.fetchedContacts.map(e=>{
                          if (e._id && e._id === auth?.selectedContact._id ) 
                            ctx.push( auth?.selectedContact ) 
                          else if(e._id)  
                            ctx.push( e )   
                        })
                        setAuth(json => {
                            return {
                                ...json,
                                fetchedContacts : ctx
                            } 
                        })

                        // Follow useEffect will trigger
                        
                        // useEffect(() => {
                        //     handleFilterContacts();
                        // }, [auth?.fetchedContacts]);    

                    }else {
                        handleFilterContacts();
                    }

                   
                }else{
                    console.log('Fetching data from server..')
                    // This server call only works for the first time for each login
                    // rest of the times all contacts being fecth from the app context
                    const response = await axiosPrivate.get('/contacts', {
                        signal: controller.signal
                    });

                    console.log(response.data);
                    
                    //isMounted && setContacts([]);
                    //isMounted && handleFilterContacts();                         
                    isMounted  && setAuth(json => {
                        return {
                            ...json,
                            fetchedContacts : response.data
                        }
                    })

                    // Follow useEffect will trigger
                    
                    // useEffect(() => {
                    //     handleFilterContacts();
                    // }, [auth?.fetchedContacts]);    

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

    useEffect(() => {
        handleFilterContacts();
    }, [auth?.fetchedContacts]);    

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const deleteContact = async () => {
            try {
                const response = await axiosPrivate.post('/contacts/delete', {
                    signal: controller.signal,
                    contact: { _id: deleteElement.id }
                });
                isMounted && console.log(response.data);

                handleShowSnackBar(SUCCESS);

                const y = '' + ( (deleteElement.ix - 2)<0 ) ? 0 : (deleteElement.ix - 2)
                setAuth(json => { 
                    return { 
                        ...json, 
                        contactIndexID: y,
                        //fetchedContacts: null
                    } 
                })

                const ctx = [];
                contacts.map(e=>{
                  if (e._id != response.data._id ) 
                    ctx.push( e )   
                }) 
                setContacts(ctx)               
  
                
            } catch (err) {
                console.error(err);

                if(err.response.status==401){
                    navigate('/login', { state: { from: location }, replace: true });
                }
                
                handleShowSnackBar(ERROR);
            }
        }

        enableDelete && deleteContact();

        return () => {
            isMounted = false;
            controller.abort();
            //console.log('aborted');
        }
    }, [deleteToggle])

    useEffect(() => {
        const x = ''+ ( (auth?.contactIndexID - 2) < 0 ? 0 : (auth?.contactIndexID - 2) );

        if(auth?.contactIndexID){
            const element = document.getElementById(x);
            element && element.scrollIntoView({ behavior: 'smooth' });
        }

        return () => {
        }
    }, [contacts])

    const handleIconClicks = name => () => {
        console.log(name);
    }
    
    const preHandleScreen = (action, json, i) => {
        setAuth(e=> { return {...e, contactIndexID:i} } )
        
        handleScreen(action,json);
    }

    const childRef = useRef();

    const handleShowSnackBar = (type, text) => {
        childRef.current.showSnackBar(type, text);
    };
   
    const theme = createTheme();
    
    return (
        <>
            <Box sx={{ pt:12, px: 0, my: 0 }} ></Box>
            
            <ExtSnackbar ref={childRef} />

            <Box sx={{ mx: 0, my: 0 }} >
                {   
                    contacts?.length
                    ? 
                    (
                        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {contacts.map((contact, i) => 
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PersonIcon/>
                                        </Avatar>
                                    </ListItemAvatar>

                                    <ListItemText id={i}  key={i} primary={contact?.fname + ' ' + contact?.lname} secondary={contact?.cpse} />
                                    
                                    <IconButton aria-label="edit" onClick={()=>preHandleScreen('edit',contact, i)} >
                                        <EditIcon />
                                    </IconButton>  

                                    <IconButton aria-label="delete" onClick={ ()=>handleDelete(contact._id, i) }>
                                        <DeleteIcon />
                                    </IconButton>                                                                  
                                </ListItem>
                            )}
                        </List>                        
                    ) 
                    : contacts?.length==0?
                    <Box sx={ { mt:3 }}>
                        <Alert severity="error">No users to display</Alert>
                    </Box> 
                    :
                    <Box sx={ { mt:3, width: '100%', justifyContent: 'center', display: 'flex' }}>
                        <Alert severity="info" sx={ { backgroundColor: 'transparent' }}> Loading..
                        </Alert>
                        <ExtCircularProgress /> 
                    </Box> 
                }
            </Box> 

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete contact"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Want to delete this contact?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={doDelete} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
        </>
    );

}

export default ContactList
