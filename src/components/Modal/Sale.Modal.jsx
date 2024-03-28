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
  import { uiActions } from "../../store/ui";
  import { useEffect } from "react";
  import { getBrands } from "../../store/brands";
  import { editSale, createSale } from "../../store/sales";
  import { getProducts } from "../../store/products";
  
  const SaleModal = ({ open, closeModal, edit }) => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getBrands());
      dispatch(getProducts())
      // eslint-disable-next-line
    }, []);
  
    const brands = useSelector((state) => state.brands.data);
    const products = useSelector(state=> state.products.data)
    let modalData = useSelector((state) => state.ui.modalData);
  
    const initialValues = edit
      ? modalData
      : { brand_id: "", product_id: "", quantity: "", price: "" };
  
    const handleSubmit = (values, actions) => {
      actions.setSubmitting(false);
      if (edit) dispatch(editSale({...values, quantity: Number(values.quantity)}));
      else dispatch(createSale({...values, quantity: Number(values.quantity)}));
      actions.resetForm();
      closeModal();
    };
  
    const handleClose = () => {
      dispatch(uiActions.setModalData({}));
      closeModal();
    };
  
    return (
      <Modal open={open}>
        <Box sx={style}>
          <Stack spacing={4}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form>
                <FormControl sx={{width:'100%', mb:2}}>
                  <InputLabel>Brand</InputLabel>
                  <Field
                  as={Select}
                  name="brand_id"
                  label="Brand"
                  required
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </MenuItem>
                  ))}
                </Field>
                </FormControl>
              
                <FormControl sx={{width:'100%', mb:2}}>
                  <InputLabel>Products</InputLabel>
                  <Field
                  as={Select}
                  name="product_id"
                  label="Product"
                  required
                >
                  {products.map((prod) => (
                    <MenuItem key={prod.id} value={prod.id}>
                      {prod.name}
                    </MenuItem>
                  ))}
                </Field>
                </FormControl>
              
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
               <Field
                as={TextField}
                type="text"
                name="price"
                variant="outlined"
                label="Price"
                required
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              
                sx={{ mb: 2 }}
              />
                <Stack direction="row" justifyContent="space-between">
                  <Button type="submit" variant="contained" size="large">
                    {edit ? "Update Sale" : "Add New Sale"}
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
          </Stack>
        </Box>
      </Modal>
    );
  };
  
  export default SaleModal;