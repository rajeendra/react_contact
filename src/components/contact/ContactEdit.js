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

import useAxiosPrivate from '../../iam/hooks/useAxiosPrivate';
import CancelButton from '../custom/CancelButton';
import ExtSnackbar, {ERROR,INFO,SUCCESS} from "../custom/ExtSnackbar";

/* { id: '631977da9b7d7339f05f8f06' } 

{
  "addres": {
    "no": null,
    "street": null,
    "city": null
  },
  "id": "631977da9b7d7339f05f8f06",
  "fname": "FName AKK",
  "lname": "LName AKK",
  "cpse": "z",
  "active": "Y",
  "numbers": [
    {
      "id": "0",
      "number": "11982182123",
      "type": "0omx"
    },
    {
      "id": "1",
      "number": "+9411112222",
      "type": "0omx"
    },
    {
      "id": "2",
      "number": "+9477777777",
      "type": "0omx"
    }    
  ]
}

const blogSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

*/

const ContactEdit = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const axiosPrivate = useAxiosPrivate();
    const [updateToggle, setUpdateToggle] = useState(false);
    const [enableUpate, setEnableUpate] = useState(false);
    const contact = props.contact;
    const numbers = props.contact.numbers;
    const initialValues = { 
        fname: props.contact.fname, 
        lname: props.contact.lname, 
        numbers: numbers 
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const theme = createTheme();
    const { handleScreen } = props;

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(value);
        setFormValues({ ...formValues, [name]: value });
    };    
 
    const handleCancel = (val) => {
        handleScreen('list');
    }; 

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
 
        const saveContact = async () => {
            try {
                const response = await axiosPrivate.put('/contacts', {
                    signal: controller.signal,
                    contact: contact
                });
                isMounted && console.log(response.data);

              //handleShowSnackBar(SUCCESS, "success");
                handleShowSnackBar(SUCCESS);
                
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

        enableUpate && saveContact();

        return () => {
            isMounted = false;
            controller.abort();
            //console.log('aborted');
        }
    }, [updateToggle])

    const handleSave = (val) => {   
        //alert(val);
        
        contact.fname = formValues.fname;
        contact.lname = formValues.lname;

        //console.log(contact);

        setEnableUpate(true);
        setUpdateToggle(prev=>!prev);
    };  
    
    const childRef = useRef();
 
    const handleShowSnackBar = (type, text) => {
        childRef.current.showSnackBar(type, text);
    };
  
    return (
        <>
            <Box sx={ { pl: 1, borderRadius: 1, color: 'white', bgcolor: 'primary.main'} }>
                <h3>Contact info</h3>
            </Box>    

            <ExtSnackbar ref={childRef} />

            <Box sx={{ mx: 0, my: 1 }}>
                <TextField
                    error={!formErrors.fname ? false : true}
                    helperText={formErrors.fname}                
                    margin="normal"
                    required
                    fullWidth
                    id="fname"
                    label="First Name"
                    name="fname"
                    autoComplete="on"
                    //autoFocus
                    value={formValues.fname}
                    onChange={handleChange}
                />

                <TextField
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
                Save
                </Button>

                <CancelButton onCBClick={handleCancel} />  

            </Box>
            <Box
                sx={{
                    display: 'inline-flex',
                    float: 'right',
                }}
            >
                <Fab color="primary" aria-label="add" sx={{ mt:2, mr:2}}>
                    <AddIcon />
                </Fab>
            </Box>

            <Box sx={{ mx: 0, my: 1 }}>
                    {formValues?.numbers?.length
                        ? (
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                {formValues.numbers.map((number, i) => 
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <PhoneIphoneIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText key={i} primary={number.number} secondary={number.number} />
                                        <IconButton aria-label="edit" onClick={()=>handleScreen('number', contact)} >
                                            <EditIcon />
                                        </IconButton>  
                                        <IconButton aria-label="delete" >
                                            <DeleteIcon />
                                        </IconButton>                                                                  
                                    </ListItem>
                                )}
                            </List>                        
                        ) : <Alert severity="error">No numbers found</Alert> 
                    }
            </Box> 

        </>
    );

}

export default ContactEdit
