import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name:'ui',
    initialState:{
        sidebarOpen:false,
        modalData:{}

    },
    reducers:{
        toggleMenu(state){
            state.sidebarOpen = !state.sidebarOpen
        },
        setModalData(state, actions){
               state.modalData = actions.payload
        }
    }
})


const uiReducer = uiSlice.reducer;
const uiActions = uiSlice.actions;

export {uiReducer, uiActions};