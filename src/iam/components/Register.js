
import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

//import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../api/axios';
import Footer from '../../components/layout/Footer';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        //console.log(user + ' ' + pwd + ' ' + matchPwd);
        
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            setSuccess(true);
        
            //clear state and controlled inputs
            setUser('');
            setPwd('');
            setMatchPwd('');
            matchFocus(false);
            validMatch(false);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }
    
    const theme = createTheme();

    const [formErrors, setFormErrors] = useState({});

    return (
        <>
        <ThemeProvider theme={theme}>
        {/* <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh'}}> */}
        <Container component="main" maxWidth="xs" >
        <CssBaseline />  
            <Box minHeight='100vh' >
                {/* All page content comes here */}

                {success ? (
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'green' }}>
                                <CheckCircleOutlineIcon />
                            </Avatar>                
                            <Typography component="h1" variant="body2">
                                Registration successful 
                            </Typography>   
                            <Grid container justifyContent="center">
                                <Link href="/login" variant="body2" >
                                <Grid item xs={12}>
                                    Sign In    
                                </Grid>
                                </Link>
                            </Grid>                                     
                        </Box>
                ) : (
                    <>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <AppRegistrationIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Register
                            </Typography>
                        </Box>

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            { errMsg && <Alert ref={errRef} severity="error">{errMsg}</Alert>}

                            <Box
                                sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                //p: 1,
                                ml: 1,
                                mb: 1, 
                                bgcolor: 'background.paper',
                                color: validName ? "green" : "red",
                                borderRadius: 1,
                                }}
                            >
                                { validName && <FontAwesomeIcon icon={faCheck} /> }
                                { ( userFocus && !validName )  && <FontAwesomeIcon icon={faTimes}  />}
                            </Box>

                            <TextField sx={{mt: 0}}
                                error={!formErrors.username ? false : true}
                                helperText={formErrors.username}                
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="off"
                                //autoFocus
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                ref={userRef}
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            
                            {
                            userFocus && user && !validName &&    
                            
                            <Alert severity="info">
                                <AlertTitle>Rules <strong> - check it out!</strong></AlertTitle>
                                4 to 24 characters.<br/>
                                Must begin with a letter, numbers, underscores, hyphens allowed.
                            </Alert>
                            }                        

                            <Box
                                sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                //p: 1,
                                ml: 1,
                                mb: 1, 
                                bgcolor: 'background.paper',
                                color: validPwd ? "green" : "red",
                                borderRadius: 1,
                                }}
                            >
                                { validPwd && <FontAwesomeIcon icon={faCheck} /> }
                                { ( pwdFocus && !validPwd )  && <FontAwesomeIcon icon={faTimes}  />}
                            </Box>

                            <TextField sx={{mt: 0}}
                                error={!formErrors.password ? false : true}
                                helperText={formErrors.password}                
                                margin="normal"
                                required
                                fullWidth
                                type="password"
                                id="password"
                                label="Password"
                                name="password"
                                autoComplete="off"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            
                            {
                            pwdFocus && !validPwd  &&    
                            
                            <Alert severity="info">
                                <AlertTitle>Rules <strong> - check it out!</strong></AlertTitle>
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </Alert>
                            }                        

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    //p: 1,
                                    ml: 1,
                                    mb: 1, 
                                    bgcolor: 'background.paper',
                                    color: validMatch ? "green" : "red",
                                    borderRadius: 1,
                                }}
                            >
                                { pwd!='' && validMatch && <FontAwesomeIcon icon={faCheck} /> }
                                { ( matchFocus && !validMatch )  && <FontAwesomeIcon icon={faTimes}  />}
                            </Box>

                            <TextField sx={{mt: 0}}
                                error={!formErrors.matchPassword ? false : true}
                                helperText={formErrors.matchPassword}                
                                margin="normal"
                                required
                                fullWidth
                                type="password"
                                id="matchPassword"
                                label="Confirm password"
                                name="matchPassword"
                                autoComplete="off"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            
                            {
                                matchFocus && !validMatch  &&    
                                
                                <Alert severity="info">
                                    <AlertTitle>Rules <strong> - check it out!</strong></AlertTitle>
                                    Must match the first password input field.
                                </Alert>
                            }                        

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={!validName || !validPwd || !validMatch ? true : false}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="center" sx={{ mb: 3}}>
                                <Grid item xs={6} sx={{ mr: 0,  pr: 0  }} justifyContent="right">
                                    Already registered?   
                                </Grid> 

                                <Grid item sx={{ mr: 2, cursor: 'pointer'}}  >
                                    <Box onClick={() => navigate("/login")}>
                                    <Link variant="body2">
                                        Sign In
                                    </Link> 
                                    </Box> 
                                </Grid>                        

                            </Grid>                          
                        </Box>
                    </>
                )}
            </Box> 
            <Footer />
        </Container>
        </ThemeProvider>

        </>
    );

}

export default Register
