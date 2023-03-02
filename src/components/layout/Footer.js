import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Footer = () => {

    function Copyright(props) {
        console.log(props)
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
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
        <Copyright sx={{ mt:2, pt: 7, pb: 1, bgcolor: '#212121' , color: '#757575' }} />
        // <Copyright sx={{ mt:2, pt: 7, pb: 1, bgcolor: 'primary.dark' , color: '#757575' }} />
        // <Copyright sx={{ mt:2, pt: 7, pb: 1, bgcolor: '#004d40' , color: '#757575' }} />
    )
}

export default Footer
