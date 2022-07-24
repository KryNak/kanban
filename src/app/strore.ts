import { configureStore } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery, setupListeners } from "@reduxjs/toolkit/query/react"
import { Board, Column, CreateBoardRequestDto, UpdateBoardRequestDto } from "../dto/DTOs"
import { isDarkModeReducer } from "./features/isDarkMode/isDarkModeSlice"
import { isSideBarSliceReducer } from "./features/isSideBarShown/isSideBarShown"
import { selectedBoardSliceReducer } from "./features/selectedBoard/selectedBoardSlice"
import { selectedBoardIdSliceReducer } from "./features/selectedBoardId/selectedBoardId"
export { store }

export type UpdateBoardType = {
    id: string, 
    body: UpdateBoardRequestDto
}

const kanbanApi = createApi({
    reducerPath: "kanbanApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
    tagTypes: ["Boards"],
    endpoints: (builder) => ({
        getBoards: builder.query<Board[], void>({
            query: () => "boards",
            providesTags: ['Boards']
        }),
        getBoardById: builder.query<Board, string>({
            query: (id) => `boards/${id}`
        }),
        deleteBoardById: builder.mutation<void, string>({
            query: (id) => ({
                url: `boards/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Boards"]
        }),
        updateBoardById: builder.mutation<Board, UpdateBoardType>({
            query: (board) => ({
                url: `boards/${board.id}`,
                method: 'PUT',
                body: JSON.stringify(board.body),
                headers: {
                    'content-type': 'application/json'
                }
            })
        }),
        createBoard: builder.mutation<void, CreateBoardRequestDto>({
            query: (board) => ({
                url: 'boards',
                method: 'POST',
                body: JSON.stringify(board),
                headers: {
                    'content-type': 'application/json'
                }
            }),
            invalidatesTags: ["Boards"]
        }),
        getColumnById: builder.query<Column, string>({
            query: (id) => `columns/${id}`
        })
    })
})

const store = configureStore({
    reducer: {
        [kanbanApi.reducerPath]: kanbanApi.reducer,
        selectedBoard: selectedBoardSliceReducer,
        isDarkMode: isDarkModeReducer,
        isSideBarShown: isSideBarSliceReducer,
        selectedBoardId: selectedBoardIdSliceReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(kanbanApi.middleware)
    }
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const { 
    useGetBoardsQuery, 
    useGetBoardByIdQuery, 
    useDeleteBoardByIdMutation, 
    useCreateBoardMutation, 
    useGetColumnByIdQuery,
    useUpdateBoardByIdMutation
} = kanbanApi