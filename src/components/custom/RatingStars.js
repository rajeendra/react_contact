import { Box } from '@mui/material';
import { pink, orange } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { useState } from 'react';
    
const RatingStars = (props) => {
    const {rate, handleRate} = props;
    
    function setRate(x){
        handleRate(x)
    }

    const handleTap = (e) => {
        //console.log(e)
        
        switch (e) {
            case 'StarBorder-one':
                setRate(1);
                break;
            case 'Star-one':
                if(rate>=2)
                    setRate(1);
                else
                    setRate(0);
                break;
            case 'StarBorder-two':
                setRate(2);
                break;
            case 'Star-two':
                if(rate==3)
                    setRate(2);
                else
                    setRate(1);
                break;
            case 'StarBorder-three':
                setRate(3);
                break;
            case 'Star-three':
                setRate(2);
                break;
            default:
                console.log(e)
                break;
        }
    }

    return (
        <>
            {/* This all three taken as a one react element */}
            { rate >= 1 
                ? ( <StarIcon onClick={()=>{ handleTap('Star-one') }} fontSize="large" sx={{ width: 1/6, color: orange[500] }}></StarIcon>) 
                : (<StarBorderOutlinedIcon onClick={()=>{ handleTap('StarBorder-one') }} fontSize="large" sx={{ width: 1/6, color: orange[500] }}></StarBorderOutlinedIcon>)
            }
            { rate >= 2 
                ? ( <StarIcon onClick={()=>{ handleTap('Star-two') }} fontSize="large" sx={{ width: 1/6, color: orange[500] }}></StarIcon>) 
                : (<StarBorderOutlinedIcon onClick={()=>{ handleTap('StarBorder-two') }} fontSize="large" sx={{ width: 1/6, color: orange[500] }}></StarBorderOutlinedIcon>)
            }
            { rate >= 3 
                ? ( <StarIcon onClick={()=>{ handleTap('Star-three') }} fontSize="large" sx={{ width: 1/6, color: orange[500] }}></StarIcon>) 
                : (<StarBorderOutlinedIcon onClick={()=>{ handleTap('StarBorder-three') }} fontSize="large" sx={{ width: 1/6, color: orange[500] }}></StarBorderOutlinedIcon>)
            }

        </>
    )
}

export default RatingStars