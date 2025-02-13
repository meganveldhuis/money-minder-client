import axios from "axios";

class APIService {
  constructor() {
    this.baseURL = import.meta.env.VITE_URL;
  }
  /* -------------------------------- EXPENSES -------------------------------- */
  async getAllExpenses(searchTerm) {
    try {
      const response = await axios.get(
        `${this.baseURL}/expense?search=${searchTerm}`
      );
      return response.data;
    } catch (error) {
      console.log(`Error: Could not get all Expense Records`);
    }
  }
  async getSingleExpense(id) {
    try {
      const response = await axios.get(`${this.baseURL}/expense/${id}`);
      return response.data;
    } catch (error) {
      console.log(`Error: Could not get Expense Record with id ${id}`);
    }
  }
  async postExpense(record) {
    try {
      const response = await axios.post(`${this.baseURL}/expense`, record);
      return response.data;
    } catch (error) {
      console.log(`Error: Could not post new Expense Record`);
    }
  }
  async editExpense(record, id) {
    try {
      const response = await axios.patch(
        `${this.baseURL}/expense/${id}`,
        record
      );
      return response.data;
    } catch (error) {
      console.log(`Error: Could not edit Expense Record with id ${id}`);
    }
  }
  async deleteExpense(id) {
    try {
      const response = await axios.delete(`${this.baseURL}/expense/${id}`);
      return response.data;
    } catch (error) {
      console.log(`Error: Could not delete Expense Record with id ${id}`);
    }
  }

  /* --------------------------------- INCOME --------------------------------- */
  async getAllIncome(searchTerm) {
    try {
      const response = await axios.get(
        `${this.baseURL}/income?search=${searchTerm}`
      );
      return response.data;
    } catch (error) {
      console.log(`Error: Could not get all Income Records`);
    }
  }
  async getSingleIncome(id) {
    try {
      const response = await axios.get(`${this.baseURL}/income/${id}`);
      return response.data;
    } catch (error) {
      console.log(`Error: Could not get Income Record with id ${id}`);
    }
  }
  async postIncome(record) {
    try {
      const response = await axios.post(`${this.baseURL}/income`, record);
      return response.data;
    } catch (error) {
      console.log(`Error: Could not post new Income Record`);
    }
  }
  async editIncome(record, id) {
    try {
      const response = await axios.patch(
        `${this.baseURL}/income/${id}`,
        record
      );
      return response.data;
    } catch (error) {
      console.log(`Error: Could not edit Income Record with id ${id}`);
    }
  }
  async deleteIncome(id) {
    try {
      const response = await axios.delete(`${this.baseURL}/income/${id}`);
      return response.data;
    } catch (error) {
      console.log(`Error: Could not delete Income Record with id ${id}`);
    }
  }
  /* ------------------------------- CATEGORIES ------------------------------- */
  async getAllIncomeCategories() {
    try {
      const response = await axios.get(`${this.baseURL}/categories/income`);
      return response.data;
    } catch (error) {
      console.log(`Error: Could not get all Income Categories`);
    }
  }
  async getAllExpenseCategories() {
    try {
      const response = await axios.get(`${this.baseURL}/categories/expense`);
      return response.data;
    } catch (error) {
      console.log(`Error: Could not get all Expense Categories`);
    }
  }
  async getSingleCategory(id) {
    try {
      const response = await axios.get(`${this.baseURL}/categories/${id}`);
      return response.data;
    } catch (error) {
      console.log(`Error: Could not get Category with id ${id}`);
    }
  }
}
