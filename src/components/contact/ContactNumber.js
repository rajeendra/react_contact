import { useState, useEffect } from "react";

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
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import CancelButton from '../custom/CancelButton';

import useAuth from "../../iam/hooks/useAuth";
import { PedalBikeSharp } from '@mui/icons-material';

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

//
  1omx - 0wlf 
  1/0 : default/no, o/w : own/work, m/l mob/land, f/x : fax/no

  personal / official - Default: switch set to off for the value is 'o'   
  mob / fixed - Default: switch set to off for the value is 'm'

*/

const ContactNumber = (props) => {
    const {auth, setAuth} = useAuth(); 
    const {handleScreen} = props; 
    const [newNumber, setNewNumber] = useState(props?.number==null?true:false);
    const [number, setNumber] = useState(
        props?.number
        ?
        props.number
        :    
        {
          "id": new Date().getTime(),
          "number": "+94",
          "type": "0omx"
        }    
    ); 
    const [personal, setPersonal] = useState(false);
    const [mobile, setMobile] = useState(false);    

    // use of a useEffect to intiate a state value by use a another state value
    // intiate personal/official, mobile/fixed with number.type
    useEffect(() => {
      const init = async () => {
          try {
            // use of the number to 
            const numberInOp = number?.type?.length===4 ?number.type: '0omx'

            const p = numberInOp.substring(1,2)==='o'
              ?'personal'
              : numberInOp.substring(1,2)==='w'
              ?'official'
              :'personal'

              const m = numberInOp.substring(2,3)==='m'
              ?'mob'
              : numberInOp.substring(2,3)==='l'
              ?'fixed'
              :'mob'       

              setPersonal(p==='personal'?false:true);
              setMobile(m==='mob'?false:true);

          } catch (err) {
              console.error(err);
          }
      }

      init();

      return () => {
      }
    }, [])

    const handleTogglePersonal = (e) => {
      setPersonal(e=>!e)
    };       
    const handleToggleMobile = (e) => {
      setMobile(e=>!e)
    };       


    const handleChange = (event) => {
      const { name, value } = event.target;
      //console.log(value);
      setNumber(obj => { return {...obj, number: value} }  )
    };        

    const handleCancel = (val) => {
      
      setAuth(json => {
        return {
            ...json,
            selectedNumber : null
        }
      })       

      // method 1  
      // handleScreen('edit')
      
      // method 2
      const x = ()=>{handleScreen(auth?.selectedContact?._id?'edit':'add')};
      x();
    }; 
    
    const handleConfirm = (e) => {   
      const selectedContact = auth?.selectedContact;
      const p = !personal?'o':'w';
      const m =  !mobile?'m':'l' ;
      const type = '0' + p + m + 'x';
      //console.log(number) 

      if(!newNumber){
      
        // method 1
        // const nbs = [];
        // selectedContact?.numbers.map(e=>{
        //   if (e.id == number.id) 
        //     nbs.push( {...e, number:number.number} ) 
        //   else  
        //     nbs.push( e )   
        // })

        // method 2
        // const nbs  = selectedContact?.numbers.map(e=>{
        //   if (e.id == number.id) 
        //     return {...e, number:number.number} 
        //   else  
        //     return e   
        // })      

        // method 3
        const nbs = selectedContact?.numbers.map( e =>
          e.id == number.id
          ? { ...e, 
              number:number.number,
              type: type
            }
          : e 
        )     
        // console.log(nbs)    
        
        // method 1
        // selectedContact['numbers'] = nbs;
        
        // method 2
        selectedContact.numbers = nbs;

      } else{
        const numbs = auth?.selectedContact.numbers;
        number.type = type;
        numbs.push(number)

        selectedContact.numbers = numbs;
      }
      
      setAuth(e => {
        return {
            ...e,
            selectedContact : selectedContact
        }
      })

      handleCancel();
    };   

    return (
        <>
            <Box sx={{ pt:14, px: 0, my: 0 }} ></Box>  

            <Box sx={{ mx: 0, my: 1 }}>
              <TextField
                      //error={!formErrors.fname ? false : true}
                      //helperText={formErrors.fname}                
                      margin="normal"
                      required
                      fullWidth
                      id="number"
                      label="Number"
                      name="number"
                      autoComplete="off"
                      autoFocus
                      value={number.number}
                      onChange={handleChange}
              />
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={5} md={5}                
                sx={{
                    mt: 1,
                    mr:0,
                    display: 'inline-flex',
                    justifyContent: 'flex-end',
                    //float: 'right'
                }}
              >
                <Typography sx={{ mt:0}} variant="body2" color="text.secondary">
                  personal
                </Typography>
              </Grid>
              <Grid item xs={2} md={2}
                sx={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  //float: 'right'
                }}              
              >              
                <Switch sx={{ mb:0}}
                    checked={personal}
                    onChange={handleTogglePersonal}
                    inputProps={{ 'aria-label': 'controlled' }}
                />

              </Grid>
              <Grid item xs={5} md={5}
                sx={{
                  mt: 1,
                  mr: 0,
                  display: 'inline-flex',
                  justifyContent: 'flex-start',
                  //float: 'right'
                }}              
              >
                <Typography variant="body2" color="text.secondary">
                  official
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={5} md={5}                
                sx={{
                    mt: 1,
                    mr:0,
                    display: 'inline-flex',
                    justifyContent: 'flex-end',
                    //float: 'right'
                }}
              >
                <Typography sx={{ mt:0}} variant="body2" color="text.secondary">
                  mobile
                </Typography>
              </Grid>
              <Grid item xs={2} md={2}
                sx={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  //float: 'right'
                }}              
              >              
                <Switch sx={{ mb:0}}
                    checked={mobile}
                    onChange={handleToggleMobile}
                    inputProps={{ 'aria-label': 'controlled' }}
                />

              </Grid>
              <Grid item xs={5} md={5}
                sx={{
                  mt: 1,
                  mr: 0,
                  display: 'inline-flex',
                  justifyContent: 'flex-start',
                  //float: 'right'
                }}              
              >
                <Typography variant="body2" color="text.secondary">
                  fixed
                </Typography>
              </Grid>
            </Grid>            

            <Box
                sx={{
                    mt: 2,
                    //display: 'inline-flex',
                    display: 'flex',
                    //justifyContent: 'flex-start',
                    justifyContent:  'center'
                    //float: 'left',
                    //float: 'center'
                }}
            >
                <Button
                    type="submit"
                    //fullWidth
                    variant="contained"
                    sx={{ ml:1, mt: 3, mb: 2 }}
                    onClick={ () => {handleConfirm('confirm');} }                    
                >
                Confirm
                </Button>

                <CancelButton onCBClick={handleCancel} />  

            </Box>
        </>
    );

}

export default ContactNumber
