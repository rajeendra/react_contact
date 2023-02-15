import Dashboard from '../components/dashboard/Dashboard';
import Contact from '../components/contact/Contact';
import Favorite from '../components/favorite/Favorite';
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

function Gateway() {
  
  var timestamp = new Date().getTime();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.User,ROLES.Editor]} />}>
            {/* /:id and  key= added just to test*/}
            <Route path="contact/:id" key={new Date().getTime()}  element={<Contact />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="favorite" element={<Favorite />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );

}

export default Gateway;