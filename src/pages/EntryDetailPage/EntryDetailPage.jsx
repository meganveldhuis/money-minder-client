import EditEntryModal from "../../components/EditEntryModal/EditEntryModal";
import { useState } from "react";

function EntryDetailPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reloadData, setReloadData] = useState(true);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>open modal</button>
      {isModalOpen && (
        <EditEntryModal
          setReloadData={setReloadData}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default EntryDetailPage;
