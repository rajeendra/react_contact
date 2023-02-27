
import * as React from 'react';
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
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import ExtSnackbar, {ERROR,INFO,SUCCESS} from "../custom/ExtSnackbar";
import ExtCircularProgress from '../custom/ExtCircularProgress';

const UsertList = (props) => {

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    
    const {admin, setAdmin} = props;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [user, setUser] = React.useState(false);
    const [editor, setEditor] = React.useState(false);
    const [adm, setAdm] = React.useState(false);

    const [updateToggle, setUpdateToggle] = useState(false);
    const [enableUpate, setEnableUpate] = useState(false);
    const [savedToggle, setSavedToggle] = useState(false);
    const [enableSavedToggle, setEnableSavedToggle] = useState(false);
  
    const handleChange = (event) => {
      setEnableUpate(true)  
      const { name, checked } = event.target;
      name == "user" && setUser(checked);
      name == "editor" && setEditor(checked);
      name == "adm" && setAdm(checked);
      console.log(setAdm);
    };
  
    const handleDelete = (id, ix) => {
    };  
    const doDelete = () => {
    };      

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                if( !(admin?.users)){

                    console.log('Fetching data from server..')
                    const response = await axiosPrivate.get('/users', {
                        signal: controller.signal
                    });

                    console.log(response.data);
                    
                    isMounted  && setAdmin( { users: response.data } )
                }else{
                    console.log('Fetching data from context..')
                }
                
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [savedToggle])


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const saveUser = async () => {
            try {
                const response = await axiosPrivate.put('/users', {
                    signal: controller.signal,
                    user: admin.selectedUser
                });
                isMounted && console.log(response.data);

                handleShowSnackBar(SUCCESS);
                
            } catch (err) {
                console.error(err);

                if(err.response.status==401){
                    navigate('/login', { state: { from: location }, replace: true });
                }

                handleShowSnackBar(ERROR);
            }
        }

        enableUpate && saveUser();

        return () => {
            isMounted = false;
            controller.abort();
            //console.log('aborted');
        }
    }, [updateToggle])


    const preHandleScreen = (action, json, i) => {
        
        //console.log(json.roles)
        
        setAdmin({selectedUser: json})
        
        const userRoles = {}
        setUser(json?.roles?.User?true:false);
        setEditor(json?.roles?.Editor?true:false);
        setAdm(json?.roles?.Admin?true:false);

        handleOpen();
    }

    const handleSave = (val) => {   
        const userRoles = {}
        const userObj = admin.selectedUser;

        user? userRoles.User = 2001 : delete userRoles['User']
        editor? userRoles.Editor = 1984 : delete userRoles['Editor']
        adm? userRoles.Admin = 5150 : delete userRoles['Admin']
        userObj.roles=userRoles

        //console.log(userObj)
        
        setAdmin({selectedUser: userObj})
        
        setUpdateToggle(prev=>!prev);
        handleClose();
    };  

    const childRef = useRef();

    const handleShowSnackBar = (type, text) => {
        childRef.current.showSnackBar(type, text);
    };

    const theme = createTheme();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Box sx={{ pt:12, px: 0, my: 0 }} ></Box>
            
            <ExtSnackbar ref={childRef} />

            <Box sx={{ mx: 0, my: 0 }} >
                {   
                    admin?.users?.length>0
                    ? 
                    (
                        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {admin.users?.map((user, i) => 
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ManageAccountsIcon/>
                                        </Avatar>
                                    </ListItemAvatar>

                                    <ListItemText id={i}  key={i} primary={user?.username} secondary={user?.username} />
                                    
                                    <IconButton aria-label="edit" onClick={()=>preHandleScreen('edit',user, i)} >
                                        <EditIcon />
                                    </IconButton>  

                                    <IconButton aria-label="delete" onClick={ ()=>handleDelete(user._id, i) }>
                                        <DeleteIcon />
                                    </IconButton>                                                                  
                                </ListItem>
                            )}
                        </List>                        
                    ) 
                    : admin?.users?.length==0?
                    <Alert severity="error">No users to display</Alert>
                    :
                    <Box sx={ { mt:3, width: '100%', justifyContent: 'center', display: 'flex' }}>
                        <Alert severity="info" sx={ { backgroundColor: 'transparent' }}> Loading..
                        </Alert>
                        <ExtCircularProgress /> 
                    </Box> 
                }
            </Box> 

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h5">
                        User: {admin?.selectedUser?.username?admin?.selectedUser?.username:''}
                    </Typography>

                    <FormGroup>
                        <FormControlLabel
                            control={
                            <Checkbox name="user" checked={user} onChange={handleChange} />
                            }
                            label="User"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox name="editor" checked={editor} onChange={handleChange} />
                            }
                            label="Editor"
                        />
                        <FormControlLabel
                            disabled
                            //control={<Checkbox name="adm" defaultChecked />}
                            control={<Checkbox name="adm" checked={adm} />}
                            label="Admin"
                        />
                    </FormGroup>

                    <Box
                            sx={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            width: '100%'

                            }}
                    >
                            <Button
                            type="submit"
                            variant="contained"
                            onClick={ () => {handleSave('save');} }                    
                            >
                            Save
                            </Button>
                    </Box>

                </Box>
            </Modal>
          
        </>
    );

}

export default UsertList
