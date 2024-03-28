import {
    Box,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Stack,
    TextField,
  } from "@mui/material";
  import style from "../../styles/modal";
  import { Field, Form, Formik } from "formik";
  import { useDispatch, useSelector } from "react-redux";
  import React, { useEffect } from "react";
  import { uiActions } from "../../store/ui";
  import { getBrands } from "../../store/brands";
  import { getProducts } from "../../store/products";
  import { getFirms } from "../../store/firms";
  import { editPurchase, createPurchase } from "../../store/purchase";
  
  const PurchaseModal = ({ open, edit, closeModal }) => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getBrands());
      dispatch(getProducts());
      dispatch(getFirms());
    }, []);
  
    const brands = useSelector((state) => state.brands.data);
    const products = useSelector((state) => state.products.data);
    const firms = useSelector((state) => state.firms.data);
    let modalData = useSelector((state) => state.ui.modalData);
  
    const initialValues = edit
      ? modalData
      : { brand_id: "", product_id: "", firm_id: "", quantity: "", price: "" };
  
    const handleSubmit = (values, actions) => {
      actions.setSubmitting(false);
      if (edit) {
        dispatch(editPurchase({ ...values, quantity: Number(values.quantity) }));
      } else {
        dispatch(
          createPurchase({ ...values, quantity: Number(values.quantity) })
        );
      }
      actions.resetForm();
      closeModal();
    };
  
    const handleClose = () => {
      dispatch(uiActions.setModalData({}));
      closeModal();
    };
  
    return (
      <>
        <Modal open={open}>
          <Box sx={{ style }}>
            <Stack spacing={4}>
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                  <FormControl sx={{ mb: 2, width: "100%" }}>
                    <InputLabel>Firm</InputLabel>
                    <Field as={Select} name="firm_id" label="Firm" required>
                      {firms.map((firm) => (
                        <MenuItem key={firm.id} value={firm.id}>
                          {firm.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
  
                  <FormControl sx={{ mb: 2, width: "100%" }}>
                    <InputLabel>Brand</InputLabel>
                    <Field as={Select} name="brand_id" label="Brand" required>
                      {brands.map((brand) => (
                        <MenuItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
  
                  <FormControl sx={{ mb: 2, width: "100%" }}>
                    <InputLabel>Product</InputLabel>
                    <Field as={Select} name="product_id" label="Product" required>
                      {products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
  
                  <Field
                    as={TextField}
                    type="text"
                    name="price"
                    variant="outlined"
                    label="Price"
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
  
                  <Field
                    as={TextField}
                    type="text"
                    name="quantity"
                    variant="outlined"
                    label="Quantity"
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                  />
  
                  <Stack direction="row" justifyContent="space-between">
                    <Button type="submit" variant="contained" size="large">
                      {edit ? "Update Purchase" : "Add New Purchase"}
                    </Button>
                    <Button
                      variant="contained"
                      type="button"
                      size="large"
                      color="error"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Form>
              </Formik>
            </Stack>
          </Box>
        </Modal>
      </>
    );
  };
  
  export default PurchaseModal;