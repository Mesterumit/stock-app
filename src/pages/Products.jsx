import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOulineIcon from "@mui/icons-material/DeleteOutline";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../store/products";
import ProductModal from '../components/Modal/ProductModal';
import { uiActions } from "../store/ui";
import { getCategories } from "../store/categories";
import { getBrands } from "../store/brands";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false)

  const closeModal =()=> {setOpen(false); setEdit(false)}
  const openModal = ()=> setOpen(true)

  useEffect(() => {
 
    dispatch(getBrands())
    dispatch(getProducts())
    dispatch(getCategories());
    // eslint-disable-next-line
  }, []);

  const dispatch = useDispatch()
  const products = useSelector(state=> state.products.data)
  const categories= useSelector(state=> state.categories.data)
  const brands= useSelector(state=> state.brands.data)

 
  const handleEdit = (product)=>{
    setEdit(true)
    setOpen(true)

    const modalData = {
      brand_id: brands.find(b=> b.name === product.brand).id, 
      category_id: categories.find(c=> c.name === product.category).id,
      name: product.name,
      id: product.id,

    }
    dispatch(uiActions.setModalData(modalData))
  }
  const handleDelete = (id)=>{
    dispatch(deleteProduct(id))
  }

 const rows = products.map((prod, index)=>({
  id: prod.id, 
  name: prod.name,
  category: prod.category, 
  brand: prod.brand, 
  stock: prod.stock
}))
const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const columns = [
    { field: "id", headerName: "#", width: 200 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "category", headerName: "Category", width: 250 },
    { field: "brand", headerName: "Brand", width: 250 },
    { field: "stock", headerName: "Stock", width: 250 },
    {
      field: "actions",
      headerName: "Actions",

      renderCell: (params) => {

        return (
        <Stack direction="row" spacing={2}>
          <IconButton onClick={()=>handleEdit(params.row)}>
            <EditIcon sx={{ color: "orange" }} />
          </IconButton>
          <IconButton onClick={()=>handleDelete(params.row.id)}>
            <DeleteOulineIcon sx={{ color: "red" }} />
          </IconButton>
        </Stack>
      )}
    },
  ];




  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" p={5}>
        <Typography variant="h5" component="h1" color="inherit" noWrap style={{ marginLeft: sidebarOpen ? '15rem' : '5rem' }}>
          Products
        </Typography>
        <Button variant="contained" onClick={openModal}> New Product</Button>
      </Stack>
      <Container maxWidth="xl">
        <DataGrid 
        
         columns={columns}
         slots={{ toolbar: GridToolbar }}  disableRowSelectionOnClick 
         sx={{bgcolor:'white', 
         '&.MuiDataGrid-root .MuiDataGrid-cell':{ outline: 'none !important'}
         }}
         rows={rows}
 
        />
      </Container>

      <ProductModal open={open} edit={edit} closeModal={closeModal}/>
    </Box>
  );
};

export default Products;