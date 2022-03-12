import React, { useEffect, useState } from 'react';
import PetitionField from './PetitionField';
import petitionTypes from './petitionTypes';

const NewPetitionForm = ({ petitionType, setPetitionDataParent }) => {
  const [selectedPetitionType, setSelectedPetitionType] = useState();
  const [formValue, setFormValue] = useState();
  const [fieldType, setFieldType] = useState();

  useEffect(() => {
    const result = petitionTypes.filter(t => t.value === parseInt(petitionType))
    if (result.length === 1) {
      setSelectedPetitionType(result[0]);
    }
  }, [petitionType])
  const updateFormValue = (newFieldValue) => {
    var newValue = { ...formValue, ...newFieldValue };
    if (petitionType === "2") {
      if (!newValue.type) {
        //allow newvalue to overwrite
        newValue = { type: "text", ...newValue };
      }
    }
    setFormValue(newValue);
    setFieldType(newValue.type);
    setPetitionDataParent(newValue);
  }
  if (!selectedPetitionType) return <div></div>;
  return (
    <div>
      {selectedPetitionType.fields && selectedPetitionType.fields.map((f, i) =>
        <PetitionField key={i} field={f} updateFormValue={updateFormValue} fieldType={fieldType} />
      )}
    </div>
  )
}

export default NewPetitionForm
