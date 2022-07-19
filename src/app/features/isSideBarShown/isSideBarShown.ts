import { createSlice } from "@reduxjs/toolkit";
export { isSideBarSliceReducer, hideSideBar, showSideBar }

interface isSideBarShownState {
    value: boolean
}

const initialIsSideBarShown: isSideBarShownState = {
    value: true
}

const isSideBarShownSlice = createSlice({
    name: 'isSideBarShown',
    initialState: initialIsSideBarShown,
    reducers: {
        hideSideBar: (state) => {
            state.value = false
        },
        showSideBar: (state) => {
            state.value = true
        }
    }
})

const { hideSideBar, showSideBar } = isSideBarShownSlice.actions
const isSideBarSliceReducer = isSideBarShownSlice.reducer