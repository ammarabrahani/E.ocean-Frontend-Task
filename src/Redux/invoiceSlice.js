import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: false,
};

export const invoicesFetch = createAsyncThunk(
  "invoice/invoicesFetch",
  async () => {
    try {
      const paramsPagination = {
        pageNumber: 1,
        pagesize: 1,
      };
      const searchParams = new URLSearchParams({
        pageNumber: paramsPagination.pageNumber,
        pagesize: paramsPagination.pagesize,
      });

      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2IyNWQ1OWIxMmU5MWQxMmRiNjQ0YSIsImlhdCI6MTY4NTU2MjcwMiwiZXhwIjoxNjk0MjAyNzAyfQ.uj8HU-YuIAzMZY-DUNNBQIgQZCyV7JpyrfiUCyvnigM"; // Replace with your actual token
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const getResponse = await axios.get(
        `https://api.oshaonlinecenter.com/admin/users?${searchParams}`,
        { headers }
      );

      //   console.log(updateRes, "updateRes");

      const updateRes = getResponse.data.users.map((invoice) => {
        return {
          ...invoice,
          amount: 130,
        };
      });

      localStorage.setItem("get_products", JSON.stringify(updateRes));

      return updateRes ? updateRes : [];
    } catch (err) {
      throw err;
    }
  }
);

const getInvoiceDetails = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      state.items = [...state.items, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(invoicesFetch.pending, (state) => {
        state.status = "pending";
      })
      .addCase(invoicesFetch.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(invoicesFetch.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const { addInvoice } = getInvoiceDetails.actions;

export default getInvoiceDetails.reducer;
