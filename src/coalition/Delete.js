import React, { useContext, useState } from 'react';
import { deleteDocument } from './api';
import { CoalitionContext } from './CoalitionContextProvider';

const Delete = () => {
  const coalitionContext = useContext(CoalitionContext);
  const { coalition, isCreator } = coalitionContext;
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const onDeleteClick = e => {
    e.preventDefault();
    if (deleteConfirm) {
      deleteDocument(coalition.id)
      setDeleteConfirm(false);
    }
    else setDeleteConfirm(true);
  }
  if (!isCreator) return <div></div>;
  return (
    <div>Creator things
      <div>
        <input type="button" value="Delete Coalition" onClick={onDeleteClick}></input>
      </div>
      <div>{deleteConfirm && <div>Delete?</div>}</div>
    </div>
  )
}

export default Delete
