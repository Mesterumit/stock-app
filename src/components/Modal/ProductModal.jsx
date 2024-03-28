import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/categories";
import { getBrands } from "../../store/brands";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Button
} from "@mui/material";
import style from "../../styles/modal";
import { Formik, Form, Field } from "formik";
import { uiActions } from "../../store/ui";
import { createProduct, editProduct } from "../../store/products";

const ProductModal = ({ open, edit, closeModal }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
    // eslint-disable-next-line
  }, []);

  const brands = useSelector((state) => state.brands.data);
  const categories = useSelector((state) => state.categories.data);
  const modalData = useSelector(state=> state.ui.modalData)


  const initialValues = edit
    ? modalData
    : { brand_id: "", category_id: "", name: "" };

  const submitHandler = (values, actions) => {
    actions.setSubmitting(false);
    if(edit) dispatch(editProduct(values))
    else dispatch(createProduct(values))
    actions.resetForm();
    closeModal();
  };


  const handleClose = ()=>{
    dispatch(uiActions.setModalData({}))
    closeModal();
  }
  return (
    <Modal open={open}>
      <Box sx={style}>
        <Formik initialValues={initialValues} onSubmit={submitHandler}>
          <Form>
            <Field
              as={TextField}
              type="text"
              name="name"
              variant="outlined"
              label="Product Name"
              required
              fullWidth
              sx={{ mb: 2 }}
            />
            <FormControl sx={{ mb: 2, width: "100%" }}>
              <InputLabel>Brand</InputLabel>
              <Field as={Select} name="brand_id" label="Brand" required>
                {brands.map((brand) => (
                  <MenuItem value={brand.id} key={brand.id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
            <FormControl sx={{ mb: 2, width: "100%" }}>
              <InputLabel>Category</InputLabel>
              <Field as={Select} name="category_id" label="Category" required>
                {categories.map((cat) => (
                  <MenuItem value={cat.id} key={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>

            <Stack direction="row" justifyContent="space-between">
              <Button type="submit" variant="contained" size="large">
                {edit ? "Update Product" : "Add new Product"}
              </Button>
              <Button
                type="button"
                variant="contained"
                size="large"
                color="error"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Stack>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

export default ProductModal;