import "./NewEntryModal.scss";
import "react-datepicker/dist/react-datepicker.css";
import ModalForm from "../ModalForm/ModalForm";

function NewEntryModal({ onClose, setReloadData }) {
  // async function addEntry(newEntry) {
  //   if (isIncome) {
  //     const response = await APIService.postIncome(newEntry);
  //     if (response) {
  //       return true;
  //     }
  //   } else {
  //     const response = await APIService.postExpense(newEntry);
  //     if (response) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   if (!validateForm()) return;
  //   if (await addEntry(formResponse)) {
  //     setReloadData((prev) => !prev);
  //     onClose();
  //   }
  // }

  return (
    <>
      <ModalForm
        onClose={onClose}
        setReloadData={setReloadData}
        isEditing={false}
      />
    </>
  );
}

export default NewEntryModal;
