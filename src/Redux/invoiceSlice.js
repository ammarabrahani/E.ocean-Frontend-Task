import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const invoiceItems = localStorage.getItem("invoiceItems");

const initialState = {
  items: invoiceItems ? JSON.parse(invoiceItems) : [],
  status: false,
};

export const invoicesFetch = createAsyncThunk(
  "invoice/invoicesFetch",
  async () => {
    try {
      const getResponse = await axios.get(`/invoiceDB.json`);
      const updateRes = getResponse.data.invoiceList.map((invoice, index) => {
        return {
          ...invoice,
          uuid: uuidv4(),
          number: index + 1,
        };
      });

      if (!JSON.parse(localStorage.getItem("invoiceItems"))) {
        localStorage.setItem("invoiceItems", JSON.stringify(updateRes));
      }

      return JSON.parse(localStorage.getItem("invoiceItems"));
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
      localStorage.setItem(
        "invoiceItems",
        JSON.stringify([...state.items, action.payload])
      );
    },
    updateInvoice: (state, action) => {
      const { invoiceIndex } = action.payload;
      state.items[invoiceIndex] = action.payload;
      localStorage.setItem("invoiceItems", JSON.stringify(state.items));
    },
    deleteInvoice: (state, action) => {
      const { payload: invoiceIndex } = action;

      if (invoiceIndex >= 0) {
        const filterInvoice = state.items.filter(
          (item, i) => i !== invoiceIndex
        );
        state.items = [...filterInvoice];
        localStorage.setItem("invoiceItems", JSON.stringify(state.items));
        message.success("Invoice Deleted Successfully");
      }
    },
    searchInvoice: (state, action) => {
      const { payload: searchItem } = action;
      state.status = true;
      if (searchItem !== "") {
        const filtered = state.items.filter((item) => {
          return item.customer_name
            .toLowerCase()
            .includes(searchItem.toLowerCase());
        });
        if (filtered.length > 0) {
          state.items = [...filtered];
        }
      } else if (searchItem === "" || !searchItem) {
        state.status = false;
        state.items = [...initialState.items];
      }
      state.status = false;
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

export const { addInvoice, updateInvoice, deleteInvoice, searchInvoice } =
  getInvoiceDetails.actions;

export default getInvoiceDetails.reducer;
