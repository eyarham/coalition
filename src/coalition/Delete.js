import React, {useState} from 'react'
import { deleteDocument } from './api';

const Delete = ({openCoalition}) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  
  const onDeleteClick = e => {
    e.preventDefault();
    if (deleteConfirm) {
      deleteDocument(openCoalition.id)
      setDeleteConfirm(false);
    }
    else setDeleteConfirm(true);
  }
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
