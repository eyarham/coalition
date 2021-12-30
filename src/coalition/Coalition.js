import React, { useEffect, useState } from 'react';
import { getByCoalition } from '../invite/api';
import { getMemberCount, remove } from '../_common/membershipApi';
import { setCoalition } from './api';

const Coalition = ({ selectedCoalition }) => {
  // const [inviteEmail, setInviteEmail] = useState();
  // const [inviteSuccessful, setInviteSuccessful] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [openCoalition, setOpenCoalition] = useState(false);
  const [message, setMessage] = useState(false);
  const [charterText, setCharterText] = useState(false);
  const [memberCount, setMemberCount] = useState();
  const [inviteLink, setInviteLink] = useState("http://localhost:3000/");


  // const onChangeInviteEmail = e => {
  //   setInviteEmail(e.target.value);
  //   setInviteSuccessful(false);
  // }
  // const onInviteSubmit = e => {
  //   e.preventDefault();
  //   //sendInvite(inviteEmail);
  //   setInviteSuccessful(true);
  //   setInviteEmail("");
  // }
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
      const baseUrl = "http://localhost:3000/";
      const inviteUrl = "invite";
      const invite = await getByCoalition(openCoalition.id);
      const inviteId = invite.id;
      const query = "?id=" + inviteId;
      const inviteLink = baseUrl + inviteUrl + query;
      setInviteLink(inviteLink);
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
      }
      catch (e) {
        setErrorMessage(e.message);
      }
    }

  }
  const onCharterChange = e => {
    setMessage(null);
    setCharterText(e.target.value);
  }
  const onChangeCharter = async e => {
    e.preventDefault();
    const coalitionToUpdate = { ...openCoalition.data(), charter: charterText }
    var updatedCoalition = await setCoalition(openCoalition.id, coalitionToUpdate);
    setOpenCoalition(updatedCoalition);
    setMessage("successfully updated charter");
  }
  if (!openCoalition) return <div>Loading</div>;
  return (
    <div>
      Selected Coalition
      <hr />
      <div>Name: {openCoalition.data().name}</div>
      <div>Members: {memberCount}</div>

      <div>
        <div>Charter:</div>
        <textarea onChange={onCharterChange} value={charterText}></textarea>
        <input type="button" onClick={onChangeCharter} value="Update Charter"></input>
        <div>{message}</div>
      </div>

      {/* <form onSubmit={onInviteSubmit}>
        <input placeholder='invite email' onChange={onChangeInviteEmail} value={inviteEmail}></input>
        <input type="submit" value="Invite member"></input>
        {inviteSuccessful && <div>Invite Successful</div>}
      </form> */}
      <input type="button" value="Copy Invite Link" onClick={() => { navigator.clipboard.writeText(inviteLink) }}></input>
      <div>Invite Link:</div>
      <div>
        <textarea disabled value={inviteLink} className='inviteLinkBox'></textarea>
      </div>
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
