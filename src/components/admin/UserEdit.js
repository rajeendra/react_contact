
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const UserEdit = () => {

    const theme = createTheme();

    return (
        <>
            <Box sx={{ pt:12, px: 0, my: 0 }} ></Box>

            <Box sx={{ mx: 0, my: 1 }}>
                <Alert severity="info">Check user page out!</Alert>            
            </Box>
        </>
      );
}

export default UserEdit
