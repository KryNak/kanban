import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Board } from "../dto/DTOs"
import { selectedBoardSliceReducer } from "./features/selectedBoard/selectedBoardSlice"
export { store, useGetBoardsQuery}

const kanbanApi = createApi({
    reducerPath: "kanbanApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
    endpoints: (builder) => ({
        getBoards: builder.query<Board[], void>({
            query: () => "boards"
        })
    })
})



const store = configureStore({
    reducer: {
        [kanbanApi.reducerPath]: kanbanApi.reducer,
        selectedBoard: selectedBoardSliceReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(kanbanApi.middleware)
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const { useGetBoardsQuery } = kanbanApi