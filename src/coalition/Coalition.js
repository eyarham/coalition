import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getLink } from '../invite/api';
import NewPetition from '../petition/NewPetition';
import Petitions from '../petition/Petitions';
import { getMemberCount, remove } from '../_common/membershipApi';
import { getCoalitionLink } from './api';

const Coalition = ({ selectedCoalition }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [openCoalition, setOpenCoalition] = useState(false);
  const [charterText, setCharterText] = useState(false);
  const [memberCount, setMemberCount] = useState();
  const [inviteLink, setInviteLink] = useState("http://localhost:3000/");
  const navigate = useNavigate();
  const setActiveCoalition = async (coalition) => {
    setOpenCoalition(coalition);
    const memberCountFunc = async () => await getMemberCount(coalition.id);
    const count = await memberCountFunc()
    setMemberCount(count);
    setCharterText(coalition.data().charter)
  }
  useEffect(() => {
    const setFromProps = async () => setActiveCoalition(selectedCoalition);
    setFromProps();

  }, [selectedCoalition])
  useEffect(() => {
    const getInviteLink = async () => {
      setInviteLink(await getLink(openCoalition.id));
    }
    if (openCoalition && openCoalition.id)
      getInviteLink();

  }, [openCoalition])
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
  if (!openCoalition) return <div>Loading</div>;
  return (
    <div>
      Selected Coalition
      <hr />
      <div>Name: {openCoalition.data().name}</div>
      <a href={getCoalitionLink(openCoalition.id)}>Coalition Link</a>
      <div>Members: {memberCount}</div>
      <div>
        <div>Charter:</div>
        <textarea disabled value={charterText}></textarea>
      </div>
      <input type="button" value="Copy Invite Link" onClick={() => { navigator.clipboard.writeText(inviteLink) }}></input>
      <div>Invite Link:</div>
      <div>
        <textarea disabled value={inviteLink} className='inviteLinkBox'></textarea>
      </div>
      <NewPetition coalitionId={openCoalition.id} />
      <Petitions coalitionId={openCoalition.id} />
      <div>
        <input type="button" onClick={onClickLeave} value={"Leave " + openCoalition.data().name}></input>
        {showConfirm && <div>click again to confirm</div>}
      </div>
      <div>
        {errorMessage}
      </div>
    </div>
  )
}

export default Coalition
