import React, { useEffect, useState } from 'react'
import PetitionField from './PetitionField';
import petitionTypes from './petitionTypes';

const NewPetitionForm = ({ petitionType, setPetitionDataParent }) => {
  const [selectedPetitionType, setSelectedPetitionType] = useState();
  const [formValue, setFormValue] = useState();

  useEffect(() => {
    const result = petitionTypes.filter(t => t.value === parseInt(petitionType))
    if (result.length === 1) {
      setSelectedPetitionType(result[0]);
    }
  }, [petitionType])
  const onChangeFieldValue = e => {
    const newJsonValue = `{"${e.target.name}": "${e.target.value}"}`
    const json = JSON.parse(newJsonValue);
    const newValue = { ...formValue, ...json };
    setFormValue(newValue);
    setPetitionDataParent(newValue);
  }
  if (!selectedPetitionType) return <div></div>;
  return (
    <div>
      {selectedPetitionType.fields && selectedPetitionType.fields.map((f, i) =>
        <PetitionField key={i} field={f} onChangeFieldValue={onChangeFieldValue} />
      )}
    </div>
  )
}

export default NewPetitionForm
