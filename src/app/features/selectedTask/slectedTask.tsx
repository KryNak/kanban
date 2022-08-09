import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectedTask } from "../../../dto/DTOs";

interface SelectedTaskState {
    value: SelectedTask | null
}

const initialState: SelectedTaskState = {
    value: null
}

export const selectedTaskSlice = createSlice({
    name: 'selectedTaskSlice',
    initialState: initialState,
    reducers: {
        setSelectedTask: (state, action: PayloadAction<SelectedTask | null>) => {
            state.value = action.payload
        }
    }
})

export const { setSelectedTask } = selectedTaskSlice.actions
export const selectedTaskSliceReducer = selectedTaskSlice.reducer