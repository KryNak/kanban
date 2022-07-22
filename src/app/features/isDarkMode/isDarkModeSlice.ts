import { createSlice } from "@reduxjs/toolkit"
export { selectDarkMode, selectLightMode, isDarkModeReducer }

interface isDarkModeState {
    value: boolean
}

const initialSelectBoardState: isDarkModeState = {
    value: true
}

const isDarkModeSlice = createSlice({
    name: 'selectedBoardSlice',
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

const { selectDarkMode, selectLightMode } = isDarkModeSlice.actions
const isDarkModeReducer = isDarkModeSlice.reducer