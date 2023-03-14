// Albums.js

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavTabs from '../layout/NavTabs';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';

import Footer from '../layout/Footer';


import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

const Albums = () => {

    const theme = createTheme();

      return (
        <>
        <ThemeProvider theme={theme}>
        <Box class="App">
            <CssBaseline />
                {/* All page content comes here */}
                <AppBar position="fixed" color="default">
                    <NavTabs val={3} />
                </AppBar>
                <Box class="content">   
                    <Box class="section-up">
                        {/* <ImageList sx={{ width: 500, height: 450 }}> */}
                        <ImageList >
                            {/* <ImageListItem key="Subheader" cols={2}>
                                <ListSubheader component="div">December</ListSubheader>
                            </ImageListItem> */}
                            {itemData.map((item) => (
                                <ImageListItem key={item.img}>
                                <img
                                    // src={`${item.img}?w=248&fit=crop&auto=format`}
                                    src={`${item.img}?fit=crop&auto=format`}
                                    // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    srcSet={`${item.img}?fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={item.title}
                                    subtitle={item.author}
                                    actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${item.title}`}
                                    >
                                        <InfoIcon />
                                    </IconButton>
                                    }
                                />
                                </ImageListItem>
                            ))}
                        </ImageList>

                    
                    </Box>                

                    <Box class="section-down">
                        <Footer />
                    </Box>
                </Box>
        </Box>
        </ThemeProvider>
        </>
      );
}

export default Albums


const itemData = [
    {
      //img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      img: 'https://i.pinimg.com/564x/2d/82/8f/2d828f21fd6c829f8ee9698e3b7f205b.jpg',
      title: 'Breakfast',
      author: '@bkristastucchio',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      //img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      img: 'https://i.pinimg.com/564x/01/a8/b2/01a8b20022d3ac8d1c0ad960e7b67466.jpg',
      title: 'Burger',
      author: '@rollelflex_graphy726',
    },
    {
      //img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      img: 'https://i.pinimg.com/564x/53/29/35/532935f03007bff37cf6c232827ccb2c.jpg',
      title: 'Camera',
      author: '@helloimnik',
    },
    {
      //img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      img: 'https://i.pinimg.com/564x/67/cd/c1/67cdc1683f91f9916de003ca3c94ef57.jpg',
      title: 'Coffee',
      author: '@nolanissac',
      cols: 2,
    },
    {
      //img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      img: 'https://i.pinimg.com/564x/e9/50/74/e95074fa9eb49a1efc47bdaf40ba7389.jpg',
      title: 'Hats',
      author: '@hjrc33',
      cols: 2,
    },
    {
      //img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      img: 'https://i.pinimg.com/564x/f9/1b/74/f91b745881f4101c75c6e0172698f054.jpg',
      title: 'Honey',
      author: '@arwinneil',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      //img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      img: 'https://i.pinimg.com/564x/53/90/27/539027304396d2fb172a8e68f86b6686.jpg',
      title: 'Basketball',
      author: '@tjdragotta',
    },
    {
      //img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      img: 'https://i.pinimg.com/564x/37/90/64/3790641ca2a5a34031c53e00b268d81e.jpg',
      title: 'Fern',
      author: '@katie_wasserman',
    },
    {
      //img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      img: 'https://i.pinimg.com/564x/ef/80/95/ef80956f82a32420ba227aa079a81082.jpg',
      title: 'Mushrooms',
      author: '@silverdalex',
      rows: 2,
      cols: 2,
    },
    {
      //img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      img: 'https://i.pinimg.com/564x/fd/dd/c1/fdddc1fac8e78f18ebf4820fa9b2532e.jpg',
      title: 'Tomato basil',
      author: '@shelleypauls',
    },
    {
      //img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      img: 'https://i.pinimg.com/564x/89/f4/a2/89f4a2a7c2a6f18649aeda970f46f527.jpg',
      title: 'Sea star',
      author: '@peterlaster',
    },
    {
      //img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      img: 'https://i.pinimg.com/564x/a7/b0/fe/a7b0fed3121d27a4af5b6d1a4f8ad3e0.jpg',
      title: 'Bike',
      author: '@southside_customs',
      cols: 2,
    },
  ];
  
