import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CoalitionContext } from '../coalition/CoalitionContextProvider';
import { getUserIsMember, remove } from '../_common/membershipApi';
import Join from './Join';


const Leave = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition } = coalitionContext;
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isMember, setIsMember] = useState(false);
  useEffect(() => {
    const effect = async () => {
      const isMember = await getUserIsMember(coalition.id);
      setIsMember(isMember);
    }
    effect();
  }, [coalition.id])
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
  if (!isMember) return <Join />;
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
