import { Calendar } from 'components/appointments/Calendar';
import { AllStaff } from 'components/staff/AllStaff';
import { Treatments } from 'components/treatments/Treatments';
import { Signin } from 'components/user/Signin';
import { UserProfile } from 'components/user/UserProfile';
import { ReactElement } from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

import { Home } from './Home';

export function Routes(): ReactElement {
  return (
    <Switch>
      <Route path="/Staff" element={<AllStaff />} />
      <Route path="/Calendar" element={<Calendar />} />
      <Route path="/Treatments" element={<Treatments />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/user/:id" element={<UserProfile />} />
      <Route path="/" element={<Home />} />
    </Switch>
  );
}
