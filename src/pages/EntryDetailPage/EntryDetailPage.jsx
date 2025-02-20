import EditEntryModal from "../../components/EditEntryModal/EditEntryModal";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function EntryDetailPage() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [reloadData, setReloadData] = useState(true);
  const [data, setData] = useState([]);
  const [isIncome, setIsIncome] = useState(false);

  useEffect(() => {
    setIsIncome(pathname.includes("/income"));
  }, []);
  useEffect(() => {
    async function getRecord() {
      const data = isIncome
        ? await APIService.getSingleIncome(id)
        : await APIService.getSingleExpense(id);

      const isTripData = data.trip_id !== null;
      setData(data);
    }
  }, []);

  return (
    <div className="page-content details-page">
      <h1>{isIncome ? "Income" : "Expense"} Details</h1>
      <div>
        <div>
          <button onClick={() => setIsEditModalOpen(true)}>EDIT</button>
          <button>DELETE</button>
        </div>
      </div>

      {isEditModalOpen && (
        <EditEntryModal
          setReloadData={setReloadData}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}

export default EntryDetailPage;
