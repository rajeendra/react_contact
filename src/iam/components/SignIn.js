import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Constant from '../constent';

//import { Link, useNavigate, useLocation } from 'react-router-dom';

import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

import Footer from '../../components/layout/Footer';

import useAuth from '../hooks/useAuth';
import useLocalStorage from '../hooks/useLocalStorage';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';

import axios from '../../api/axios';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
const LOGIN_URL = '/auth';

function SignIn(props) {
    const { setHome } = props

    const { setAuth } = useAuth(); // auth, setAuth passing to AuthContext @ AuthProvider
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();
    const formRef = useRef();
    const testRef = useRef();

    // use seperate state to user than the username in the formValues
    // use useEffect() to sync value of user with the value of username in the formValues
    const [user, resetUser, userAttribs] = useInput(Constant.STORE_KEY_USER, '')
    
    // Not in use 
    //const [pwd, setPwd] = useState('');
    
    // Hold response error messages
    const [errMsg, setErrMsg] = useState('');
   
    // Keep Remember Me
    const [check, toggleCheck] = useToggle(Constant.STORE_KEY_PERSIST, false);

    // set initial focus to username
    useEffect(() => {
      setFormValues({ ...formValues, username: user });
      //userRef.current.focus();
      //formRef.current.focus();

      initHomeValues();
      
      //testRef.current.focus();
      //testRef.current.click();
      //testFun();
      //testFunAnother();

    }, [])

    // code snippets
    // ()=>{} // anonymous function
    // useEffect( ()=>{}, [] ) // passing anonymous function
    // assigning anonymous function to const
    const testFun = (obj) => {
      setErrMsg('testFun worked');
    }
    // regular function
    function testFunAnother(params) {
      setErrMsg('testFunAnother worked');
    }

    // Not in use
    // useEffect(() => {
    //     setErrMsg('');
    // }, [user, pwd])

    useEffect(() => {
        setFormValues({ ...formValues, username: user });
    }, [user])    

  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const initHomeValues = () => {
    // Eech login these values initiate
    // App values (biz.home) otherwise remain the same was at logout time
    // setHome({appCount: 0, rate:0})
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormValues({ ...formValues, username: user});
    // if any change to formErrors useEffect triggers to set isSubmit
    setFormErrors(validate(formValues));
    submit();
  };

  const submit = async (e) => {
    if(!isSubmit) return;
    console.log(formValues);

    try {
        const response = await axios.post(LOGIN_URL,
            //JSON.stringify({ user  , pwd  }),
            JSON.stringify({ user : formValues.username , pwd : formValues.password }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
    
        console.log(JSON.stringify(response?.data));
    
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        
        // set Auth info @ AuthContext  
        //setAuth({ user, pwd, roles, accessToken });
        setAuth({ user : formValues.username , pwd : formValues.password , roles, accessToken });
        setHome( { signinOnce: true } )
        // if set this, value of key STORE_KEY_USER also reset
        //resetUser(''); // const reset = () => setValue(initValue);
        
        // Reset password
        // setPwd('');
        setFormValues({ ...formValues, password: '' });
        
        navigate(from, { replace: true });
    
      } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }
  };  

  useEffect(() => {
    console.log(formErrors);
    // Check whether errors available, if no errors found allow to submit
    if (Object.keys(formErrors).length === 0) {
        setIsSubmit(true);  
    }
  }, [formErrors]);
  
  const validate = (values) => {
    setErrMsg();
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    
    if (!values.username) {
      errors.username = "Username is required!";
    }

    // Set only one error at a time for a field

    // if (!values.email) {
    //   errors.email = "Email is required!";
    // } else if (!regex.test(values.email)) {
    //   errors.email = "This is not a valid email format!";
    // }

    // Set only one error at a time for a field
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    
    return errors;
  };

  const theme = createTheme();
  
  const signIn = () => {
    return (
      <>
      <ThemeProvider theme={theme}>
      <div class="App">
          <CssBaseline />
              {/* All page content comes here */}
              <div class="content">   
                  <div class="section-up">
                  <Box
                  sx={{
                      // marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      // minHeight: 'calc(100vh - 0px)',
                      
                  }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
  
                    {/*  Form Box  */}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        { errMsg && <Alert ref={errRef} severity="error">{errMsg}</Alert>}
              
                        <TextField
                            error={!formErrors.username ? false : true}
                            helperText={formErrors.username}                
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="on"
                            autoFocus
                            
                            //value={formValues.username}
                            //onChange={handleChange}
                            
                            //{...userAttribs}
                            onChange={{...userAttribs}.onChange}
                            value={{...userAttribs}.value}
                            
                            ref={userRef}
                        />
  
                        <TextField
                            error={!formErrors.email ? false : true}
                            helperText={formErrors.email}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            //autoFocus
                            value={formValues.email}
                            onChange={handleChange}
                        />
                        <TextField
                            error={!formErrors.password ? false : true}
                            helperText={formErrors.password}                     
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            //label="Password"
                            //label={formValues.password.length>0 ? '' : 'password'}
                            //label=""  
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
  
                        <FormControlLabel
                            control={
                              <Checkbox value="remember" 
                                color="primary" 
                                id="persist"
                                onChange={toggleCheck}
                                checked={check}                        
                              />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            //variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                            //color="success"
                            color="error"
                        >
                        Sign In
                        </Button>
  
                        <Button
                            //type="submit"
                            onClick={() => testFun()}
                            fullWidth
                            variant="contained"
                            //variant="outlined"
                            sx={{ mt: 3, mb: 2, display:'none' }}
                            color="success"
                            //color="error"
                            ref={testRef}
                        >
                        Click me
                        </Button>
  
                        <Grid container sx={{ ml: 1 }}>
                          <Grid item xs>
                              <Link href="#" variant="body2">
                              Forgot password?
                              </Link>
                          </Grid>
                          
                          <Grid item sx={{ mr: 2, cursor: 'pointer'}}  >
                          <Box onClick={() => navigate("/register")}>
                            <Link variant="body2">
                              Sign Up
                            </Link> 
                            </Box> 
                          </Grid>
                        </Grid>
  
                    </Box>
          
                  </Box>            
                   
                  </div>                
  
                  <div class="section-down">
                      <Footer />
                  </div>
              </div>
      </div>
      </ThemeProvider>
      </>
    );
  }

  const testUI = () => {
    return (
      <>
      <ThemeProvider theme={theme}>
      <div class="App">
          <CssBaseline />
              {/* All page content comes here */}
              <div class="content">   
                  <div class="section-up">
                  <Box
                  sx={{
                      // marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      // minHeight: 'calc(100vh - 0px)',
                      
                  }}
                  >
                  </Box>            
                   
                  </div>                
  
                  <div class="section-down">
                      <Footer />
                  </div>
              </div>
      </div>
      </ThemeProvider>
      </>
    );
  }

  useEffect(()=>{},[])

  return(
    //signIn
    signIn()
    //testUI()
  )
}  

//export const STORE_KEY_USER = 'user-key'
//export const STORE_KEY_PERSIST = 'persist'

export default SignIn;