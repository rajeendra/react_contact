import Dashboard from '../components/dashboard/Dashboard';
import Contact from '../components/contact/Contact';
import Favorite from '../components/favorite/Favorite';
import Album from '../components/album/Album';
import Admin from '../components/admin/Admin';
import Layout from '../components/layout/Layout';

import Missing from '../iam/components/Missing';
import Unauthorized from '../iam/components/Unauthorized';
import RequireAuth from '../iam/components/RequireAuth';
import PersistLogin from '../iam/components/PersistLogin';
import Register from '../iam/components/Register';
import SignIn from '../iam/components/SignIn';

import { Routes, Route, Switch } from 'react-router-dom';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function Gateway(props) {
  
  var timestamp = new Date().getTime();

  const {biz, setBiz} = props;


  // Context - app home
  const home = biz.home
  const setHome = (obj) =>{
    setBiz( {...biz, home: {...home, ...obj} })
  }

  // Context - admn model
  const admin = biz.admin
  const setAdmin = (obj) =>{
    setBiz( {...biz, admin: {...admin, ...obj} })
  }

  // Context - contact model
  const contact = biz.contact
  const setContact = (obj) =>{
    setBiz( {...biz, contact: {...contact, ...obj} })
  }

  // Context - album model
  const album = biz.album
  const setAlbum = (obj) =>{
    setBiz( {...biz, album: {...album, ...obj} })
  }


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<SignIn setHome={setHome} />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin home={home} />}>
        {/* <Route > */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
            {/* /:id and  key= added just to test*/}
            <Route path="contact/:id" key={new Date().getTime()}  element={<Contact />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="favorite" element={<Favorite />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="album" element={<Album album={album} setAlbum={setAlbum} />} />
          </Route>          
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin admin={admin} setAdmin={setAdmin}/>} />
          </Route>          
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );

}

export default Gateway;