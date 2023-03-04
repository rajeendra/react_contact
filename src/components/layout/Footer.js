import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer = () => {

    function Copyright(props) {
        return (
          // <Typography variant="body2" color="text.secondary" align="center" {...props}>
          <Typography variant="body2" color="text.secondary" align="center" 
              sx={{ 
                    //mt: 'calc(auto - 500px)', width: '100vw', pt: 7, pb: 1, 
                    mt: 'auto', width: '100vw', pt: 7, pb: 1, 
                    //mt: 'calc(100vh - 0px)', width: '100vw', pt: 7, pb: 1, 
                    //width: '100vw', pt: 7, pb: 1, 
                    ...props.sx 
                  }}
          >
            {' © Copyright   by '}
            <Link color="inherit" href="https://mui.com/">
              rajeendra
            </Link>{'.  | '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }


    return (
        <Copyright sx={{ bgcolor: '#212121' , color: '#757575' }} />
        // <Copyright sx={{ bgcolor: 'primary.dark' , color: '#757575' }} />
        // <Copyright sx={{ bgcolor: '#004d40' , color: '#757575' }} />
    )
   
}

export default Footer
