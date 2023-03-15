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
  
    return (
      <Box sx={{ 
            mt:6, 
            flexGrow: 1 
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
          {images.map((step, index) => (
            <div key={step.label}>
              
              { 
              // Math.abs(activeStep - index) <= 2  
              Math.abs(activeStep - index) <= 0
              ? 
              (
                <Box
                  //display='flex'
                  //justifyContent='center'
                  component="img"
                  sx={{
                    //height: 255,
                    display: 'block',
                    //maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%',
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) 
              : 
              null
              }
            </div>
          ))}
        {/* </AutoPlaySwipeableViews> */}
        </SwipeableViews>
      </Box>
    );
}

export default AlbumSlider
