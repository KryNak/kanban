import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Board } from "../../../dto/DTOs"
export { selectedBoardSlice, selectedBoardSliceReducer, setSelectedBoard }

interface SelectedBoardState {
    value: Board | null
}

const initialSelectBoardState: SelectedBoardState = {
    value: null
}

const selectedBoardSlice = createSlice({
    name: 'selectedBoardSlice',
    initialState: initialSelectBoardState,
    reducers: {
        setSelectedBoard: (state, action: PayloadAction<Board | null>) => {
            state.value = action.payload
        }
    }
})

const { setSelectedBoard } = selectedBoardSlice.actions
const selectedBoardSliceReducer = selectedBoardSlice.reducer