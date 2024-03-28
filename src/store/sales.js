import axios from "axios";
import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");

const url = "https://26222.fullstack.clarusway.com";
const token = sessionStorage.getItem("token");

const salesSlice = createSlice({
  name: "sales",
  initialState: { data: [] },
  reducers: {
    getSales(state, action) {
      state.data = action.payload;
    },
    createSale(state, action) {
      state.data.push(action.payload);
    },
    deleteSale(state, action) {
      state.data = state.data.filter((c) => c.id !== action.payload);
    },
    editSale(state, action) {
      let index = state.data.findIndex((c) => c.id === action.payload.id);
      state.data[index] = action.payload;
    },
  },
});

export const salesReducer = salesSlice.reducer;

// Async action

export const getSales = () => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/sales/`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (res.status === 200) {
        dispatch(salesSlice.actions.getSales(res.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const createSale = (sale) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/sales/`, {
        method: "POST",
        "Content-Type": "application/json",
        data: sale,
        headers: { Authorization: `Token ${token}` },
      });

      if (res.status === 201) {
        toast.success("Sale Created successfully !");
        dispatch(salesSlice.actions.createSale(res.data));
      }
    } catch (err) {
      console.log(err.response.data.detail);
    }
  };
};
export const deleteSale = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/sales/${id}/`, {
        method: "DELETE",
        "Content-Type": "application/json",
        headers: { Authorization: `Token ${token}` },
      });

      if (res.status === 204) {
        toast.success("Sale Successfully deleted!");
        dispatch(salesSlice.actions.deleteSale(id));
      }
    } catch (err) {
      console.log(err.response.data.detail);
    }
  };
};

export const editSale = (sale) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/sales/${sale.id}/`, {
        method: "PUT",
        "Content-Type": "application/json",
        headers: { Authorization: `Token ${token}` },
        data: sale,
      });

      if (res.status === 200) {
        toast.success("Sale Successfully Updated!");
        dispatch(salesSlice.actions.editSale(res.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};