import { createSlice } from "@reduxjs/toolkit"
export { selectDarkMode, selectLightMode, isDarkModeReducer }

interface isDarkModeState {
    value: boolean
}

const initialSelectBoardState: isDarkModeState = {
    value: true
}

const selectedBoardSlice = createSlice({
    name: 'counterSlice',
    initialState: initialSelectBoardState,
    reducers: {
        selectDarkMode: (state) => {
            state.value = true
        },
        selectLightMode: (state) => {
            state.value = false
        }
    }
})

const { selectDarkMode, selectLightMode } = selectedBoardSlice.actions
const isDarkModeReducer = selectedBoardSlice.reducer