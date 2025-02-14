import "./styles/partials/_global.scss";
import EntrySideBar from "./components/EntrySideBar/EntrySideBar";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SummaryPage from "./pages/SummaryPage/SummaryPage";
import NewEntryPage from "./pages/NewEntryPage/NewEntryPage";
import ExpensesPage from "./pages/ExpensesPage/ExpensesPage";
import IncomePage from "./pages/IncomePage/IncomePage";
import BudgetPage from "./pages/BudgetPage/BudgetPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<SummaryPage />} />
        <Route path="/new" element={<NewEntryPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path="/budget" element={<BudgetPage />} />
      </Routes>
      {/* <h1>MoneyMinder</h1>
      <h2>By Megan</h2>
      <h3>H3</h3>
      <h4>H4</h4>
      <p>Paragraph</p> */}
      {/* <EntrySideBar /> */}
    </BrowserRouter>
  );
}

export default App;
