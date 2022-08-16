import { createSlice } from "@reduxjs/toolkit";

interface IsMobileViewModeState {
    value: boolean
}

const initialIsMobileViewModeState: IsMobileViewModeState = {
    value: false
}

export const isMobileViewModeSlice = createSlice({
    name: 'isMobileViewSlice',
    initialState: initialIsMobileViewModeState,
    reducers: {
        setMobileViewModeOn: (state) => {
            state.value = true
        },
        setMobileViewModeOff: (state) => {
            state.value = false
        }
    }
})

export const isMobileViewModeReducer = isMobileViewModeSlice.reducer
export const { setMobileViewModeOff, setMobileViewModeOn } = isMobileViewModeSlice.actions