// AlbumSlider.js

import * as React from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import {images} from '../../test/data/Data';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const AlbumSlider = () => {

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    //const handleStepChange = (step: number) => {
    const handleStepChange = (step) => {
        //console.log(step)
        //console.log(activeStep)
        
        if(step>activeStep) handleNext()
        if(step<activeStep) handleBack()
    };

    // In this way we can findout image height/width for any purpose..
    // ..befoure it load in page  
    const imageHeight = (index) => {
      const image = images[index]
      
      const img = new Image();
      img.id = 'imgId';
      img.src = image.imgPath;

      const height = img.naturalHeight;

      return ( height > 500 ? '100%' : '250' )
    }
  
    return (
      <Box sx={{ 
            mt:6, 
            flexGrow: 1, 
            //height: '100vh'
        }}
      >
 
        {/* <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
          }}
        >
          <Typography>{images[activeStep].label}</Typography>
        </Paper> */}
 
        <MobileStepper
          //steps={maxSteps}
          steps={0}
          position="static"
          activeStep={activeStep}
          //sx={{height: 0}}
            
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />

        {/* <AutoPlaySwipeableViews */}
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((image, index) => (

            <div key={image.label}>
              
              { 
               //(-1, 0) R ( 0, 1 ) R ( 1, 2 ) L ( 2, 3 ) R ( 3, 4 ) R
               // 1 <= 2 - true
               // Math.abs(activeStep - index) <= 2  // no white - page enlarge
               // 1 <= 0 - false  
               Math.abs(activeStep - index) <= 0 // white - page fit
              ? 
              (
                <Box
                  //display='flex'
                  //justifyContent='center'
                  component="img"
                  sx={{
                    //height: '100vh',
                    //height: '50vh',
                    //height: 255,
                    //height: '100%',
                    //height: 'auto',
                    height: imageHeight(index),
                    display: 'block',
                    //maxHeight: 500,
                    overflow: 'hidden',
                    width: '100%',
                  }}
                  src={image.imgPath}
                  alt={image.label}
                  
                  //For testing 
                  //src={image.imgPath}
                  //alt={imageHeight(index)}
                />
              ) 
              :
              null
              //For testing
              //(<div>activeStep: {activeStep} index: {index} Tot: {Math.abs(activeStep - index)}</div>)
              }
            </div>
          ))}
        {/* </AutoPlaySwipeableViews> */}
        </SwipeableViews>
      </Box>
    );
}

export default AlbumSlider
