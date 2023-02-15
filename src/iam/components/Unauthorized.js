import { useNavigate } from "react-router-dom"

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import NavTabs from "../../components/layout/NavTabs";
import Box from '@mui/material/Box';


const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const theme = createTheme();

    return (
        <>
        <NavTabs val={null} />
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ mt: 2, mb: 4 }}>
                <Alert severity="error">Unauthorized: You do not have access to the requested page.!</Alert>            
            </Box>
        </Container>
        </ThemeProvider>        
        </>
    );    

    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default Unauthorized
