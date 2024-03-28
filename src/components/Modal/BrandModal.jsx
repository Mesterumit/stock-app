import { Box, Button, Modal, Stack, TextField } from '@mui/material'
import style from '../../styles/modal'
import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../../store/ui'
import { createBrand, editBrand } from '../../store/brands'

const BrandModal = ({open, closeModal, edit}) => {
    const dispatch = useDispatch();

    let modalData = useSelector((state)=> state.ui.modalData)

    const initialValues = edit? modalData : ({name:'', image:''})

    const handleSubmit= (values, actions)=>{
        actions.setSubmitting(false);
        if(edit) dispatch(editBrand(values))
        else dispatch(createBrand(values))
        actions.resetForm();
        closeModal()
    }

    const handleClose =()=>{
        dispatch(uiActions.setModalData({}))
        closeModal()
    }


  return (


    <Modal open={open}>
        <Box sx={style}>
            <Stack spacing={4}>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <Field 
                    as={TextField}
                    type="text"
                    name="name"
                    variant="outlined"
                    label="Brand Name"
                    required
                    fullWidth
                    sx={{mb:2}}
                    >
                    </Field>
                    <Field 
                    as={TextField}
                    type="text"
                    name="image"
                    variant="outlined"
                    label="Image Url"
                    required
                    fullWidth
                    sx={{mb:2}}
                    >
                    </Field>

                    <Stack direction="row" justifyContent="space-between">
                        <Button type='submit' variant='contained' size="large"> 
                        
                        {edit? 'Update Brand': 'Add new Brand'}
                         </Button>
                        <Button type='button' variant='contained' size="large" color="error" onClick={handleClose}>Cancel </Button>

                    </Stack>
                </Form>
            </Formik>
            </Stack>
        </Box>
    </Modal>
  )
}

export default BrandModal