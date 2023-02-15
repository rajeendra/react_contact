import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import CancelButton from '../custom/CancelButton';

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



const ContactNumber = (props) => {
    const { handleScreen } = props; 

    const handleCancel = (val) => {
        handleScreen('edit', props.contact);
    }; 
    
    
    const handleSave = (val) => {   
        
    };       
    

    return (
        <>
            <Box sx={ { pl: 1, borderRadius: 1, color: 'white', bgcolor: 'primary.main'} }>
                <h3>Number info</h3>
            </Box>    

            <Box sx={{ mx: 0, my: 1 }}>
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


 
        </>
    );

}

export default ContactNumber
