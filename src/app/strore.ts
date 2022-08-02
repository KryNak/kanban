import { configureStore } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery, setupListeners } from "@reduxjs/toolkit/query/react"
import { idText } from "typescript"
import { Board, Column, CreateBoardRequestDto, CreateTaskRequestDto, Subtask, UpdateBoardRequestDto, UpdateSubtaskRequestDto } from "../dto/DTOs"
import { isDarkModeReducer } from "./features/isDarkMode/isDarkModeSlice"
import { isSideBarSliceReducer } from "./features/isSideBarShown/isSideBarShown"
import { selectedBoardSliceReducer } from "./features/selectedBoard/selectedBoardSlice"
import { selectedBoardIdSliceReducer } from "./features/selectedBoardId/selectedBoardId"
export { store }

export type UpdateBoardType = {
    id: string, 
    body: UpdateBoardRequestDto
}

export type UpdateSubtaskType = {
    id: string,
    body: UpdateSubtaskRequestDto
    columnId: string
}

export type DeleteTaskType = {
    id: string,
    columnId: string
}

export type CreateTaskType = {
    body: CreateTaskRequestDto
    columnId: string
}

const kanbanApi = createApi({
    reducerPath: "kanbanApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
    tagTypes: ["Boards", "Columns", "Column"],
    endpoints: (builder) => ({
        getBoards: builder.query<Board[], void>({
            query: () => "boards",
            providesTags: ['Boards']
        }),
        getBoardById: builder.query<Board, string>({
            query: (id) => `boards/${id}`,
            providesTags: ['Columns']
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
            }),
            invalidatesTags: ["Boards", "Columns"]
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
            query: (id) => `columns/${id}`,
            providesTags: (result, error, body) => [{type: 'Column', id: result?.id}]
        }),
        updateSubtaskById: builder.mutation<void, UpdateSubtaskType>({
            query: (arg) => ({
                url: `subtasks/${arg.id}`,
                method: 'PUT',
                body: JSON.stringify(arg.body),
                headers: {
                    'content-type': 'application/json'
                }
            }),
            invalidatesTags: (result, error, body) => [{type: 'Column', id: body.columnId}]
        }),
        deleteTaskById: builder.mutation<void, DeleteTaskType>({
            query: (body) => ({
                url: `tasks/${body.id}`,
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            }),
            invalidatesTags: (result, error, body) => [{type: 'Column', id: body.columnId}]
        }),
        createTask: builder.mutation<void, CreateTaskType>({
            query: (content) => ({
                url: 'tasks',
                method: 'POST',
                body: JSON.stringify(content.body),
                headers: {
                    'content-type': 'application/json'
                }
            }),
            invalidatesTags: (result, error, body) => [{type: 'Column', id: body.columnId}]
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
    useUpdateBoardByIdMutation,
    useUpdateSubtaskByIdMutation,
    useDeleteTaskByIdMutation
} = kanbanApi