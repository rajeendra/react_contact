import * as React from 'react';
import { useRef } from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Switch from '@mui/material/Switch';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import useAxiosPrivate from '../../iam/hooks/useAxiosPrivate';
import CancelButton from '../custom/CancelButton';
import ExtSnackbar, {ERROR,INFO,SUCCESS} from "../custom/ExtSnackbar";
import useAuth from "../../iam/hooks/useAuth";

const ContactAdd = (props) => {
    
  //console.log(props.contact);

    const navigate = useNavigate();
    const location = useLocation();
    const {auth, setAuth} = useAuth(); 
    const axiosPrivate = useAxiosPrivate();
    const [updateToggle, setUpdateToggle] = useState(false);
    const [enableUpate, setEnableUpate] = useState(false);
    const id = '' + new Date().getTime();
    const contactJSON = {
        addres: {
          no: null,
          street: null,
          city: null
        },
        id: id,
        fname: "",
        lname: "",
        cpse: "",
        active: "Y",
        numbers: [
        //   {
        //     "id": "0",
        //     "number": "11982182123",
        //     "type": "0omx"
        //   },
        //   {
        //     "id": "1",
        //     "number": "+9411112222",
        //     "type": "0omx"
        //   }
        ]
  };
  const [formValues, setFormValues] = useState(props.fromScr=='list'?contactJSON:auth?.selectedContact);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [numberEdit, setNumberEdit] = useState({});
  const [checked, setChecked] = useState(true);

  const theme = createTheme();
  const { handleScreen } = props;

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }; 
  const handleDelete = (nmb) => {
      setNumberEdit(nmb)
      setOpen(true);
  };  
  
  const doDelete = () => {
      //console.log(number);
      setOpen(false);
      handleDeleteConfirm();
  };  
  
  const handleDeleteConfirm = () => {   
      const selectedContact = auth?.selectedContact;
      
      // method 1
      const nbs = selectedContact?.numbers.filter(function( element ) {
          return element.id != numberEdit.id;
      }).filter(function( element ) {
          return element !== undefined;
      });        
      
      // method 2
      // const nbs = selectedContact?.numbers.map( c => {
      //         if (c.id != numberEdit.id){
      //             return c;
      //         } 
      //     }
      // ).filter(function( element ) {
      //     return element !== undefined;
      // });

      selectedContact.numbers = nbs;
      console.log(nbs);
      
      // setAuth(val => {
      //   return {
      //       ...val,
      //       selectedContact : selectedContact
      //   }
      // })

      setFormValues(e => { 
          return {...e, numbers: nbs }
      } )


  };   

  const handleChange = (event) => {
      const { name, value } = event.target;
      console.log(value);
      setFormValues({ ...formValues, [name]: value });
      //setFormErrors([]);
  };    

  const handleCancel = (val) => {
      handleScreen('list');
  }; 

  const handleToggle = (e) => {
      setChecked(e=>!e)
      setFormValues({ ...formValues, active: checked });
  };     

  useEffect(() => {

    setAuth(json => {
      return {
          ...json,
          selectedContact : formValues
      }
    })

    return () => {
      //console.log(auth?.selectedContact)
    }
  }, [])


  useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();

      const saveContact = async () => {
          try {
              //console.log(formValues);
              const response = await axiosPrivate.post('/contacts', {
                  signal: controller.signal,
                  contact: formValues
              });
              isMounted && console.log(response.data);

              // setAuth(json => {
              //   return {
              //       ...json,
              //       selectedContact : response.data
              //   }
              // })   
              
              // setAuth(json => {
              //   return {
              //       ...json,
              //       fetchedContacts : [...json.fetchedContacts,  response.data]
              //   }
              // })                

            //handleShowSnackBar(SUCCESS, "success");
              handleShowSnackBar(SUCCESS);
              
              const x = ''+ auth?.fetchedContacts?.length;
              setAuth(json => { return { ...json, contactIndexID: x} })

              handleScreen('list')
              
          } catch (err) {
              console.error(err);

              if(err.response.status==401){
                  navigate('/login', { state: { from: location }, replace: true });
              }
              
            //handleShowSnackBar(ERROR, "error"); 
              handleShowSnackBar(ERROR);
              
            //handleShowSnackBar(INFO, "info");
              
          }
      }

      isSubmit && enableUpate && saveContact();

      return () => {
          isMounted = false;
          controller.abort();
          //console.log('aborted');
      }
  }, [updateToggle])

  useEffect(() => {
    console.log(formErrors);
    // Check whether errors available, if no errors found allow to submit
    if (Object.keys(formErrors).length === 0) {
      setIsSubmit(true);  
      setUpdateToggle(prev=>!prev);        
    }
  }, [formErrors]);
  
  const handleSave = (val) => {   
      setEnableUpate(true);
      setIsSubmit(false);  
      setFormErrors(validate(formValues));
  };  

  const validate = (form) => {
    //setErrMsg();
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    
    if (!form.fname) {
      errors.fname = "First name is required!";
    }

    // if (!form.lname) {
    //   errors.lname = "Last name is required!";
    // }
    
    // if (!form.cpse) {
    //   errors.cpse = "Extra information is required!";
    // }        
    
    return errors;
  };
  
  const preHandleScreen = (screen, num) => {
    // Navigate to number screen
    // to retain the user typed text on come back
    setAuth(json => {
      return {
          ...json,
          selectedContact : formValues
      }
    })
    handleScreen(screen, num)
  }
  
  const childRef = useRef();

  const handleShowSnackBar = (type, text) => {
      childRef.current.showSnackBar(type, text);
  };

  return (
      <>
          {/* <Box sx={ { pl: 1, borderRadius: 1, color: 'white', bgcolor: 'primary.main'} }>
              <h3>Contact info</h3>
          </Box>     */}

          <Box sx={{ pt:12, px: 0, my: 0 }} ></Box>

          <ExtSnackbar ref={childRef} />

          <Box sx={{ mx: 0, my: 1 }}>
              <TextField
                  error={!formErrors.fname ? false : true}
                  helperText={formErrors.fname}                
                  margin="normal"
                  required
                  fullWidth
                  id="fname"
                  //label="First Name"
                  label="Name"
                  name="fname"
                  autoComplete="on"
                  //autoFocus
                  value={formValues.fname}
                  onChange={handleChange}
              />

              {/* <TextField
                  error={!formErrors.lname ? false : true}
                  helperText={formErrors.lname}                
                  margin="normal"
                  required
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lname"
                  autoComplete="on"
                  //autoFocus
                  value={formValues.lname}
                  onChange={handleChange}
              /> */}

              <TextField
                  error={!formErrors.cpse ? false : true}
                  helperText={formErrors.cpse}                
                  margin="normal"
                  required
                  fullWidth
                  id="cpse"
                  label="Extra Info"
                  name="cpse"
                  autoComplete="on"
                  //autoFocus
                  value={formValues.cpse}
                  onChange={handleChange}
              />

          </Box>   


          <Box
              sx={{
                  display: 'inline-flex',
                  justifyContent: 'flex-start',
                  //float: 'left'
              }}
          >
              <Button
                  type="submit"
                  //fullWidth
                  variant="contained"
                  sx={{ ml:1, mt: 3, mb: 2 }}
                  onClick={ () => {handleSave('save');} }                    
              >
              Add
              </Button>

              <CancelButton onCBClick={handleCancel} />  

              <Switch sx={{ mt:3}}
                  checked={checked}
                  onChange={handleToggle}
                  inputProps={{ 'aria-label': 'controlled' }}
              />

          </Box>
          <Box
              sx={{
                  display: 'inline-flex',
                  float: 'right',
              }}
          >
              <Fab onClick={()=>preHandleScreen('number')} color="primary" aria-label="add" sx={{ mt:2, mr:2}}>
                  <AddIcon />
              </Fab>
          </Box>

          <Box sx={{ mx: 0, my: 1 }}>
                  {formValues?.numbers?.length
                      ? (
                          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                              {formValues?.numbers.map((number, i) => 
                                  <ListItem>
                                      <ListItemAvatar>
                                      <Avatar>
                                          <PhoneIphoneIcon />
                                      </Avatar>
                                      </ListItemAvatar>
                                      <ListItemText key={i} primary={number.number} secondary={number.number} />
                                      <IconButton aria-label="edit" onClick={()=>preHandleScreen('number', number)} >
                                          <EditIcon />
                                      </IconButton>  
                                      <IconButton aria-label="delete" onClick={ ()=>handleDelete(number) }  >
                                          <DeleteIcon />
                                      </IconButton>                                                                  
                                  </ListItem>
                              )}
                          </List>                        
                      ) : <Alert severity="error">No numbers found</Alert> 
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
                Want to delete this number?
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

export default ContactAdd

