import axios from 'axios';
import { toast } from 'react-toastify';

const { createSlice } = require('@reduxjs/toolkit');

const url = 'https://26222.fullstack.clarusway.com';
const token = sessionStorage.getItem('token');

const productSlice = createSlice({
  name: 'products',
  initialState: { data: [] },
  reducers: {
    getProducts(state, action) {
      state.data = action.payload;
    },
    createProduct(state, action) {
      state.data.push(action.payload);
    },
    deleteProduct(state, action) {
      state.data = state.data.filter((c) => c.id !== action.payload);
    },
    editProduct(state, action) {
      let index = state.data.findIndex((c) => c.id === action.payload.id);
      state.data[index] = action.payload;
    },
  },
});

export const productsReducer = productSlice.reducer;

// Async action
export const getProducts = () => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/products/`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (res.status === 200) {
        dispatch(productSlice.actions.getProducts(res.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const createProduct = (product) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/products/`, {
        method: 'POST',
        'Content-Type': 'application/json',
        data: product,
        headers: { Authorization: `Token ${token}` },
      });

      if (res.status === 201) {
        toast.success('Product Created successfully !');
        dispatch(productSlice.actions.createProduct(res.data));
      }
    } catch (err) {
      console.log(err.response.data.detail);
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/products/${id}/`, {
        method: 'DELETE',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
      });

      if (res.status === 204) {
        toast.success('Product Successfully deleted!');
        dispatch(productSlice.actions.deleteProduct(id));
      }
    } catch (err) {
      console.log(err.response.data.detail);
    }
  };
};

export const editProduct = (product) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${url}/stock/products/${product.id}/`, {
        method: 'PUT',
        'Content-Type': 'application/json',
        headers: { Authorization: `Token ${token}` },
        data: product,
      });

      if (res.status === 200) {
        toast.success('Product Successfully Updated!');
        dispatch(productSlice.actions.editProduct(res.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};