import "./styles/partials/_global.scss";
import NewEntryModal from "./components/NewEntryModal/NewEntryModal";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SummaryPage from "./pages/SummaryPage/SummaryPage";
import ExpensesPage from "./pages/ExpensesPage/ExpensesPage";
import IncomePage from "./pages/IncomePage/IncomePage";
import BudgetPage from "./pages/BudgetPage/BudgetPage";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <BrowserRouter>
      <Navbar setIsModalOpen={setIsModalOpen} />
      {isModalOpen && <NewEntryModal onClose={() => setIsModalOpen(false)} />}
      <button onClick={() => setIsModalOpen(true)}>+ Add New Entry</button>
      <Routes>
        <Route path="/" element={<SummaryPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path="/budget" element={<BudgetPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
