import axios from "axios";

class APIService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL;
  }
  async getPhoto(searchTerm) {
    try {
      const response = await axios.get(
        `${this.baseURL}/photo/?search=${searchTerm}`
      );
      return response.data;
    } catch (error) {
      console.log(`Error getting photo with search ${searchTerm}`);
    }
  }
  /* -------------------------------- EXPENSES -------------------------------- */
  async getAllExpenses(
    searchTerm = "",
    yearFilter = "",
    monthFilter = "",
    categoryFilter = ""
  ) {
    try {
      const response = await axios.get(
        `${this.baseURL}/expense?search=${searchTerm}&year=${yearFilter}&month=${monthFilter}&category=${categoryFilter}`
      );
      return response.data;
    } catch (error) {
      console.log(`Error: Could not get all Expense Records`);
    }
  }
  async getExpensesByCategory(yearFilter = "", monthFilter = "") {
    try {
      const response = await axios.get(
        `${this.baseURL}/expense/category?year=${yearFilter}&month=${monthFilter}`
      );
      return response.data;
    } catch (error) {
      console.log(`Error: Could not get all Expense Records by category`);
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
  async getAllIncome(
    searchTerm = "",
    yearFilter = "",
    monthFilter = "",
    categoryFilter = ""
  ) {
    try {
      const response = await axios.get(
        `${this.baseURL}/income?search=${searchTerm}&year=${yearFilter}&month=${monthFilter}&category=${categoryFilter}`
      );
      return response.data;
    } catch (error) {
      console.log(`Error: Could not get all Income Records`);
    }
  }
  async getIncomeByCategory(yearFilter = "", monthFilter = "") {
    try {
      const response = await axios.get(
        `${this.baseURL}/income/category?year=${yearFilter}&month=${monthFilter}`
      );
      return response.data;
    } catch (error) {
      console.log(`Error: Could not get all Income Records by category`);
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
  async getAllCategories() {
    try {
      const response = await axios.get(`${this.baseURL}/categories`);
      return response.data;
    } catch (error) {
      console.log(`Error: Could not get all Categories`);
    }
  }
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
  /* ---------------------------------- DATES --------------------------------- */
  async getAllYears() {
    try {
      const response = await axios.get(`${this.baseURL}/date/years`);
      return response.data;
    } catch (error) {
      console.log(`Error: Could not get all years`);
    }
  }

  /* --------------------------------- BUDGET --------------------------------- */
  async getAllBudget() {
    try {
      const response = await axios.get(`${this.baseURL}/budget`);
      return response.data;
    } catch (error) {
      console.log(`Error: Could not get all budget lines`);
    }
  }
  async getBudgetByCategoryID(categoryID) {
    try {
      const response = await axios.get(`${this.baseURL}/budget/${categoryID}`);
      return response.data;
    } catch (error) {
      console.log(
        `Error: Could not get budget lines with category id ${categoryID}`
      );
    }
  }
  async addBudgetAndCategory(newBudget) {
    try {
      const response = await axios.put(
        `${this.baseURL}/budget/category`,
        newBudget
      );
      return response.data;
    } catch (error) {
      console.log(
        `Error: Could not add budget line with category name ${newBudget.category_name}`
      );
    }
  }

  /* ------------------------------- CURRENCIES ------------------------------- */
  async getAllCurrency() {
    try {
      const response = await axios.get(`${this.baseURL}/currency`);
      return response.data;
    } catch (error) {
      console.log(`Error: Could not get all currencies`);
    }
  }
  /* ---------------------------------- TRIPS --------------------------------- */
  async getAllTrips() {
    try {
      const response = await axios.get(`${this.baseURL}/trips`);
      return response.data;
    } catch (error) {
      console.log(`Error: Could not get all trips`);
    }
  }
  async getTripById(trip_id) {
    try {
      const response = await axios.get(`${this.baseURL}/trips/${trip_id}`);
      return response.data;
    } catch (error) {
      console.log(`Error: Could not get trip with id ${trip_id}`);
    }
  }
  /* --------------------------------- GEMINI --------------------------------- */
  async getAIOverview(data) {
    try {
      const searchTerm = `With the following data, tell me how to optimize my budget in 400 words or less, and use headers, bolded terms, and bullet points (with markdown syntax) to make the important information pop : ${JSON.stringify(
        data
      )}`;
      const searchBody = {
        search: searchTerm,
      };
      const response = await axios.post(`${this.baseURL}/gemini`, searchBody);
      return response.data;
    } catch (error) {
      console.log(`Error: Could not get AI Overview`);
    }
  }
  async continueAIConversation(lastResponse, data, userQuestion) {
    try {
      const searchTerm = `My budget data is ${JSON.stringify(
        data
      )}, your last response was ${lastResponse}. My next Question is ${userQuestion}`;
      const searchBody = {
        search: searchTerm,
      };
      const response = await axios.post(`${this.baseURL}/gemini`, searchBody);
      return response.data;
    } catch (error) {
      console.log(`Error: Could not get AI Overview`);
    }
  }
}

export default new APIService();
