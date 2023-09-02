// CardList.js

import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Grid } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {cards} from '../../test/data/Data';

const CardList = (props) => {
    const theme = createTheme();
      return (<>
        <Grid sx={{ mt:5 }}  container spacing={2}>
            {cards.map((item) => {
                return (
                        <Grid item xs={12} sm={6} md={4} lg={3}>    
                            <Card sx={{ maxWidth: "100vw" }} key={item.id}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="140"
                                    image={item.img}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.text}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>              
                    )    
            } ) }
        </Grid>
      </>);  
}
export default CardList