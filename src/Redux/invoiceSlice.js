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
      let currenInvoice = JSON.parse(localStorage.getItem("invoiceItems"));

      state.items = [...currenInvoice, action.payload];
      localStorage.setItem("invoiceItems", JSON.stringify([...state.items]));
    },
    updateInvoice: (state, action) => {
      let currenInvoice = JSON.parse(localStorage.getItem("invoiceItems"));
      const { invoiceIndex } = action.payload;
      state.items[invoiceIndex] = action.payload;
      currenInvoice[invoiceIndex] = action.payload; // when coming from search
      localStorage.setItem("invoiceItems", JSON.stringify([...currenInvoice]));
    },
    searchInvoice: (state, action) => {
      const { payload: searchItem } = action;
      let currenInvoice = JSON.parse(localStorage.getItem("invoiceItems"));

      state.status = true;
      if (searchItem !== "") {
        const filtered = state.items.filter((item) => {
          return item.customer_name
            .toLowerCase()
            .includes(searchItem.toLowerCase());
        });

        state.items = [...filtered];
      } else if (searchItem === "" || !searchItem) {
        state.status = false;
        state.items = [...currenInvoice];
      }
      state.status = false;
    },
    deleteInvoice: (state, action) => {
      let currenInvoice = JSON.parse(localStorage.getItem("invoiceItems"));

      if (action?.payload?.uuid) {
        const filterInvoice = currenInvoice.filter((item, i) => {
          return item.uuid !== action.payload.uuid;
        });
        localStorage.setItem(
          "invoiceItems",
          JSON.stringify([...filterInvoice])
        );
        state.items = [...filterInvoice];
        message.success("Invoice Deleted Successfully");
      }
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
