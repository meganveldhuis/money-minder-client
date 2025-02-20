import "./styles/partials/_global.scss";
import "./App.scss";
import NewEntryModal from "./components/NewEntryModal/NewEntryModal";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SummaryPage from "./pages/SummaryPage/SummaryPage";
import ExpensesPage from "./pages/ExpensesPage/ExpensesPage";
import IncomePage from "./pages/IncomePage/IncomePage";
import BudgetPage from "./pages/BudgetPage/BudgetPage";
import { useState } from "react";
import EntryDetailPage from "./pages/EntryDetailPage/EntryDetailPage";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reloadData, setReloadData] = useState(true);
  return (
    <BrowserRouter>
      <Navbar setIsModalOpen={setIsModalOpen} />
      {isModalOpen && (
        <NewEntryModal
          setReloadData={setReloadData}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <button className="add-button" onClick={() => setIsModalOpen(true)}>
        +
      </button>
      <Routes>
        <Route path="/" element={<SummaryPage reloadData={reloadData} />} />
        <Route
          path="/expenses"
          element={<ExpensesPage reloadData={reloadData} />}
        />
        <Route
          path="/expenses/:id"
          element={<EntryDetailPage reloadData={reloadData} />}
        />
        <Route
          path="/income"
          element={<IncomePage reloadData={reloadData} />}
        />
        <Route
          path="/income/:id"
          element={<EntryDetailPage reloadData={reloadData} />}
        />
        <Route
          path="/budget"
          element={<BudgetPage reloadData={reloadData} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
