import { createSlice } from "@reduxjs/toolkit";

interface IsDetailsDialogOpenState {
    value: boolean
}

const initialState: IsDetailsDialogOpenState = {
    value: false
}

const isDetailsDialogOpenSlice = createSlice({
    name: 'isDetailsDialogOpenSlice',
    initialState: initialState,
    reducers: {
        hideDetailsDialog: (state) => {
            state.value = false
        },
        showDetailsDialog: (state) => {
            state.value = true
        }
    }
})

export const { hideDetailsDialog, showDetailsDialog } = isDetailsDialogOpenSlice.actions
export const isDetailsDialogOpenSliceReducer = isDetailsDialogOpenSlice.reducer