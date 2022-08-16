import { createSlice } from "@reduxjs/toolkit";

interface IsTabletViewMode {
    value: boolean
}

const isTabletViewMode: IsTabletViewMode = {
    value: false
}

export const isTabletViewModeSlice = createSlice({
    name: 'isTabletViewMode',
    initialState: isTabletViewMode,
    reducers: {
        setTabletViewModeOn: (state) => {
            state.value = true
        },
        setTabletViewModeOff: (state) => {
            state.value = false
        }
    }
})

export const { setTabletViewModeOff, setTabletViewModeOn } = isTabletViewModeSlice.actions
export const isTabletViewModeReducer = isTabletViewModeSlice.reducer