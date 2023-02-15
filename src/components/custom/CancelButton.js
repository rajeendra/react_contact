import Button from '@mui/material/Button';

const CancelButton = (props) => {

    const { onCBClick } = props;

    const handleClick = (v) => {

    }    
    
    return (
        <>
        <Button
            type="submit"
            //fullWidth
            variant="contained"
            sx={{ ml:1, mt: 3, mb: 2, color: '#455a64', bgcolor: '#cfd8dc',
                    ':hover': {
                    color: '#455a64',
                    bgcolor: '#b0bec5' 
                    },
                }}
            onClick={()=>onCBClick('cancel')} 
        >
        Cancel
        </Button>    
        </>
    );
}

export default CancelButton
