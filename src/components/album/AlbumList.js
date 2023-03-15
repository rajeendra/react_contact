// AlbumList.js

import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import {albums} from '../../test/data/Data';

const AlbumList = (props) => {

    const {handleAlbum} = props

    const theme = createTheme();

      return (
        <ImageList >
            
            {/* <ImageListItem key="Subheader" cols={2}>
                <ListSubheader component="div">December</ListSubheader>
            </ImageListItem> */}

            {albums.map((item) => (
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
                        onClick={()=>handleAlbum(item)}
                    >
                        <InfoIcon />
                    </IconButton>
                    }
                />
                </ImageListItem>
            ))}
        </ImageList>
      );
}

export default AlbumList