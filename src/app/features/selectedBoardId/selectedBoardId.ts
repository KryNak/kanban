import { createSlice, PayloadAction } from "@reduxjs/toolkit"
export { selectedBoardIdSlice, selectedBoardIdSliceReducer, setSelectedBoardId }

interface SelectedBoardIdState {
    value: string | null
}

const initialSelectBoardIdState: SelectedBoardIdState = {
    value: null
}

const selectedBoardIdSlice = createSlice({
    name: 'selectedBoardIdSlice',
    initialState: initialSelectBoardIdState,
    reducers: {
        setSelectedBoardId: (state, action: PayloadAction<string | null>) => {
            state.value = action.payload
        }
    }
})

const { setSelectedBoardId } = selectedBoardIdSlice.actions
const selectedBoardIdSliceReducer = selectedBoardIdSlice.reducer