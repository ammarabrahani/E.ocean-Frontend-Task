import { configureStore } from "@reduxjs/toolkit";
import getInvoiceDetails from "./invoiceSlice";

export const store = configureStore({
  reducer: {
    geInvoices: getInvoiceDetails,
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
