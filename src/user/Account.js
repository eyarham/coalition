import React, { useEffect, useRef, useState } from 'react';
import { get, set, updateUserEmail } from './api';


const Account = () => {
  const [selectedAccount, setSelectedAccount] = useState();
  const [updatedDisplayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [showUpdateEmail, setShowUpdateEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [showCredentialReq, setShowCredentialReq] = useState(false);
  const [pw, setpw] = useState('');
  // const newEmailRef = useRef();
  // const pwRef = useRef();
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
    const newAccount = {
      ...selectedAccount.data(),
      displayName: updatedDisplayName,
      pronouns
    }
    await set(selectedAccount.id, newAccount);
    setMessage("update successful");
  }

  const onEnterNewEmail = e => {
    setNewEmail(e.target.value);
    setMessage("");
  }
  const revealEmailUpdate = e => {
    setShowUpdateEmail(!showUpdateEmail)
  }
  const onEnterPw = e => {
    setpw(e.target.value);
  }  
  const onSubmitNewEmail = async e => {
    //TODO: create check for recent sign-in and prompt for credentials if needed
    // const credential = promptForCredentials();

    const response = await updateUserEmail(newEmail, pw);
    switch (response.valid) {
      case false:
        alert(response.message);
        break;
      case null:
        setShowCredentialReq(true)
        break;
      case true:
        alert("success");
    }

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
          <input autoFocus value={newEmail} onChange={onEnterNewEmail}></input>
          <input type="submit" value="Submit"></input>
          {showCredentialReq && (<div>
            <label>Confirm password to continue</label>
            <div>
              <input autoFocus type="password" value={pw} onChange={onEnterPw}></input>
              <input type="submit" value="Confirm"></input>
            </div>
          </div>)
          }
        </div>)
        }
      </form>
      <div>{message}</div>
    </div>
  )
}

export default Account;
