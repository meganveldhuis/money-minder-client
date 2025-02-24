import "react-datepicker/dist/react-datepicker.css";
import ModalForm from "../ModalForm/ModalForm";

function NewEntryModal({ onClose, setReloadData }) {
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
