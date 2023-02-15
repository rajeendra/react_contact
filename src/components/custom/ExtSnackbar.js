//ExtSnackbar

/*  
    usage:  Code need to impliment at Parent to get data 
            to this Child component for any event at parent

    import ExtSnackbar, {ERROR,INFO,SUCCESS} from "./ExtSnackbar";

    const handleShowSnackBar = (type, text) => {
        childRef.current.showSnackBar(type, text);
    };

    } catch (err) {
        console.error(err);
        
        handleShowSnackBar(ERROR);
        //handleShowSnackBar(SUCCESS);
        //handleShowSnackBar(ERROR, "error");
        //handleShowSnackBar(SUCCESS, "success");
        //handleShowSnackBar(INFO, "info");
    }

    const childRef = useRef();

    return (
        ..
        <ExtSnackbar ref={childRef} />
        ..
    )

*/

import Alert from '@mui/material/Alert';
import * as React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import Snackbar from '@mui/material/Snackbar';

const ExtSnackbar = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        showSnackBar: (type, text) => {
            type==ERROR && showErrorSnackBar(text);
            type==SUCCESS && showSuccessSnackBar(text);
            type==INFO && text!=null && showInfoSnackBar(text);
        }
     }));
    
    const [message, setMessage] = React.useState(
        {
            open : false,
            text : 'Oops!, something went wrong',
            type : 'error'
        }
    );

    const showSuccessSnackBar= (text) => {
        showBarMessage('success', text != null ? text : 'Task completed.' );
    }

    const showErrorSnackBar= (text) => {
        showBarMessage('error', text != null ? text : 'Oops!, something went wrong' );
    }

    const showInfoSnackBar= (text) => {
        text != null && showBarMessage('info', text);
    }

    const showBarMessage = (type, text) => {
        setMessage( val => { 
            return {
                ...val,
                type: type != null ? type : val.type,
                text: text != null ? text : val.text,
                open: true
            }
        });
    };
  
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setMessage( val => { return {...val, open:false} });
    };

    return (
        <>
            <Snackbar open={message.open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity={message.type} sx={{ width: '100%' }}>
                {message.text}
                </Alert>
            </Snackbar>
        </>
    );

})

export const ERROR = 'error'
export const SUCCESS = 'success'
export const INFO = 'info'

export default ExtSnackbar;
