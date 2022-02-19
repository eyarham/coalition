import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CoalitionContext } from '../coalition/CoalitionContextProvider';
import { remove } from '../_common/membershipApi';


const Leave = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition } = coalitionContext;
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();
  const onClickLeave = async e => {
    e.preventDefault();
    if (!showConfirm) { setShowConfirm(true); }
    else {
      try {
        await remove(coalition.id);
        navigate("/");
      }
      catch (e) {
        setErrorMessage(e.message);
      }
    }
  }
  return (
    <div>
      <input type="button" onClick={onClickLeave} value={"Leave " + coalition.data().name}></input>
      {showConfirm && <div>click again to confirm</div>}
      <div>
        {errorMessage}
      </div>
    </div>
  )
}

export default Leave
