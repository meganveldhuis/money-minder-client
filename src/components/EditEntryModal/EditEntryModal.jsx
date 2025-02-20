import ModalForm from "../ModalForm/ModalForm";
function EditEntryModal({ onClose, setReloadData }) {
  return (
    <>
      <ModalForm
        onClose={onClose}
        setReloadData={setReloadData}
        isEditing={true}
      />
    </>
  );
}

export default EditEntryModal;
