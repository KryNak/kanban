import { configureStore } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Board } from "../dto/DTOs"
import { isDarkModeReducer } from "./features/isDarkMode/isDarkModeSlice"
import { isSideBarSliceReducer } from "./features/isSideBarShown/isSideBarShown"
import { selectedBoardSliceReducer } from "./features/selectedBoard/selectedBoardSlice"
export { store, useGetBoardsQuery, useGetBoardByIdQuery}

const kanbanApi = createApi({
    reducerPath: "kanbanApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
    endpoints: (builder) => ({
        getBoards: builder.query<Board[], void>({
            query: () => "boards"
        }),
        getBoardById: builder.query<Board, string>({
            query: (id) => `boards/${id}`
        })
    })
})

const store = configureStore({
    reducer: {
        [kanbanApi.reducerPath]: kanbanApi.reducer,
        selectedBoard: selectedBoardSliceReducer,
        isDarkMode: isDarkModeReducer,
        isSideBarShown: isSideBarSliceReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(kanbanApi.middleware)
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const { useGetBoardsQuery, useGetBoardByIdQuery } = kanbanApi