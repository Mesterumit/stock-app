
import { Box, Button, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import EditIcon from "@mui/icons-material/Edit";
import DeleteOulineIcon from "@mui/icons-material/DeleteOutline";
import CategoryModal from '../components/Modal/CategoryModal';
import { useEffect, useState } from 'react';
import { deleteCategory, getCategories } from '../store/categories';
import { uiActions } from '../store/ui';

const Categories = () => {
  const categories = useSelector(state=> state.categories.data)
  console.log("Categories",categories)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false)
  const closeModal =()=> {setOpen(false); setEdit(false)}
  const openModal = ()=> setOpen(true)

  useEffect(()=>{
    dispatch(getCategories())
    // eslint-disable-next-line 
  }, [])




  const handleEdit = (category)=>{
    setEdit(true)
    setOpen(true)
    dispatch(uiActions.setModalData(category))
  }
  const handleDelete = (id)=>{
    dispatch(deleteCategory(id))
  }
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" p={5}>
        <Typography component="h1" variant='h5' color="inherit" noWrap style={{ marginLeft: sidebarOpen ? '15rem' : '5rem' }}  > Categories</Typography>
        <Button variant='contained' onClick={openModal}>New Catrgory</Button>
      </Stack>

      <Container maxWidth="xl">
        <TableContainer component={Paper} sx={{alignItems:'center'}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'> # </TableCell>
                <TableCell align='center'> Name</TableCell>
                <TableCell align='center'> Number of Products</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {categories.map((row, index)=>(
                <TableRow key={row.id} sx={{"&:lastchild td, &:last-child th": {border:0}}}>
                  <TableCell align='center'> {index+1}</TableCell>
                  <TableCell align='center'> {row.name}</TableCell>
                  <TableCell align='center'> {row.product_count}</TableCell>
                  <TableCell>
                    <EditIcon sx={{color: 'goldenrod', cursor:'pointer', mx:2}} onClick={()=>handleEdit(row)}/>
                    <DeleteOulineIcon sx={{color: 'red', cursor:'pointer', mx:2}} onClick={()=>handleDelete(row.id)}/>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </TableContainer>
      </Container>

      <CategoryModal open={open} closeModal={closeModal} edit={edit}/>
    </Box>
  )
}

export default Categories