import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { remove } from '../_common/membershipApi';



const Leave = ({ openCoalition }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();
  const onClickLeave = async e => {
    e.preventDefault();
    if (!showConfirm) { setShowConfirm(true); }
    else {
      try {
        await remove(openCoalition.id);
        navigate("/");
      }
      catch (e) {
        setErrorMessage(e.message);
      }
    }
  }
  return (
    <div>
      <input type="button" onClick={onClickLeave} value={"Leave " + openCoalition.data().name}></input>
      {showConfirm && <div>click again to confirm</div>}
      <div>
        {errorMessage}
      </div>
    </div>
  )
}

export default Leave
