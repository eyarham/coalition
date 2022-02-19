import React, { useEffect, useState } from 'react';
import { get, set, updateUserEmail } from './api';


const Account = () => {
  const [selectedAccount, setSelectedAccount] = useState();
  const [updatedDisplayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [showUpdateEmail, setShowUpdateEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  useEffect(() => {
    const effectFunc = async () => {
      const account = await get();
      setSelectedAccount(account);

      const { displayName, pronouns } = account.data();
      setDisplayName(displayName);
      setPronouns(pronouns);
    }
    effectFunc();
  }, [])

  //TODO: shift to data array storage of fields and genericize value changing function
  //TODO: create token system for pending change to loggedInUser.email
  const onChageDisplayName = e => {
    setDisplayName(e.target.value);
    setMessage("");
  }
  const onChagePronouns = e => {
    e.preventDefault();
    setPronouns(e.target.value);
    setMessage("");
  }


  //Submit changes to database
  const onSubmitAccountSave = async e => {
    e.preventDefault();
    await set(selectedAccount.id,
      {
        ...selectedAccount.data(),
        displayName: updatedDisplayName,
        pronouns
      })
    setMessage("update successful");
  }

  const onEnterNewEmail = e => {
    setNewEmail(e.target.value);
    setMessage("");
  }
  const revealEmailUpdate = e => {
    setShowUpdateEmail(!showUpdateEmail);
  }
  const onSubmitNewEmail = async e => {
    //TODO: create check for recent sign-in and prompt for credentials if needed
    // const credential = promptForCredentials();
    await updateUserEmail(newEmail);
  }
  //HTML
  if (!selectedAccount) return <div>Loading...</div>;
  return (
    <div>
      <form onSubmit={onSubmitAccountSave}>
        <label>Display name</label>
        <input type="text" value={updatedDisplayName} onChange={onChageDisplayName}></input>
        <div>
          <label>Pronouns</label>
          <input type="text" value={pronouns} onChange={onChagePronouns}></input>
        </div>
        <input type="submit" value="Save"></input>
      </form>
      <hr></hr>
      <form onSubmit={onSubmitNewEmail}>
        <input type="button" onClick={revealEmailUpdate} value="Change account email"></input>
        {showUpdateEmail && (<div>
          <label>Enter new email</label>
          <input type="text" value={newEmail} onChange={onEnterNewEmail}></input>
          <input type="submit" value="Confirm"></input>
        </div>)
        }
      </form>
      <div>{message}</div>
    </div>
  )
}

export default Account;
