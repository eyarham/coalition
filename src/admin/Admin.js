import React, { useEffect, useState } from 'react';
import ExpandBox from '../_common/ExpandBox';
import { getIsAdminUser } from './api';
import RulesAdmin from './RulesAdmin';

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState();
  useEffect(() => {
    const effect = async () => {

      const isAdminUser = await getIsAdminUser();
      setIsAdmin(isAdminUser);

    }
    effect();
  }, []);

  if(!isAdmin) return <div>You are not an admin</div>;
  return (
    <div>
      <h3>Admin</h3>
        <ExpandBox headerText="Rules Admin"><RulesAdmin/></ExpandBox>





    </div>
  )
}

export default Admin
