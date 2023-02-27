import * as React from 'react';
import { useNavigate, Link } from "react-router-dom";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CottageIcon from '@mui/icons-material/Cottage';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';

import useLogout from "../../iam/hooks/useLogout";

const NavTabs = (props) => {
    const [value, setValue] = React.useState(props.val);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      
      setValue(newValue);
      
      if(newValue==0){
        navigate('/');
      } 
      if(newValue==1){
        navigate('/contact/1');
      }                    
      if(newValue==2){
        navigate('/favorite');
      }                    
      if(newValue==3){
        navigate('/admin');
      }                    
      if(newValue==4){
          signOut();
      }
    };
  
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/');
    }

    return (
        <>
        <Tabs value={value} onChange={handleChange} variant="scrollable" aria-label="icon tabs example">
          <Tab icon={<CottageIcon />} aria-label="home" />
          <Tab icon={<ContactPhoneIcon />} aria-label="contacts" />
          <Tab icon={<FavoriteIcon />} aria-label="Favorite" />
          <Tab icon={<SettingsIcon />} aria-label="Settings" />
          <Tab icon={<ExitToAppIcon />} aria-label="Logout" />
        </Tabs>
        </>
    );

}

export default NavTabs
