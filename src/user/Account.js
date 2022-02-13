import React, { useEffect, useState } from 'react';
import { get, set } from './api';


const Account = () => {
  const [selectedAccount, setSelectedAccount] = useState();
  const [updatedDisplayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [pronouns, setPronouns] = useState('');
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
  const onChageDisplayName = e => {
    setDisplayName(e.target.value);
    setMessage("");
  }
  const onChagePronouns = e => {
    e.preventDefault();
    setPronouns(e.target.value);
    setMessage("");
  }
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
      <div>{message}</div>
    </div>
  )
}

export default Account;
