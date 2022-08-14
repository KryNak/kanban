import { configureStore } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery, setupListeners } from "@reduxjs/toolkit/query/react"
import { Board, CreateBoardRequestDto, CreateTaskRequestDto, UpdateBoardRequestDto, UpdateSubtaskRequestDto, UpdateTaskRequestDto } from "../dto/DTOs"
import { isDarkModeReducer } from "./features/isDarkMode/isDarkModeSlice"
import { isDetailsDialogOpenSliceReducer } from "./features/isDetailsDialogShown/isDetailsDialogShown"
import { isSideBarSliceReducer } from "./features/isSideBarShown/isSideBarShown"
import { selectedBoardSliceReducer } from "./features/selectedBoard/selectedBoardSlice"
import { selectedBoardIdSliceReducer, setSelectedBoardId } from "./features/selectedBoardId/selectedBoardId"
import { selectedTaskSliceReducer } from "./features/selectedTask/slectedTask"

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

export class UpdateTaskRequestBody {

    taskId: string
    columnId: string
    requestBody: UpdateTaskRequestDto

    constructor(taskId: string, columnId: string, requestBody: UpdateTaskRequestDto) {
        this.taskId = taskId
        this.columnId = columnId
        this.requestBody = requestBody
    }

}

export class UpdateTaskStatusRequestBody {

    taskId: string
    prevColumnId: string
    targetColumnId: string

    constructor(taskId: string, prevCoumnId: string, targetColumnId: string) {
        this.taskId = taskId
        this.prevColumnId = prevCoumnId
        this.targetColumnId = targetColumnId
    }

}

export class UpdateTaskPosition {

    destinationColumnId: string
    destinationTaskPosition: number
    taskId: string
    sourceColumnId: string

    constructor(destinationColumnId: string, destinationTaskPosition: number, taskId: string, sourceColumnId: string) {
        this.destinationColumnId = destinationColumnId
        this.destinationTaskPosition = destinationTaskPosition
        this.taskId = taskId
        this.sourceColumnId = sourceColumnId
    }

}

export const kanbanApi = createApi({
    reducerPath: "kanbanApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api` }),
    tagTypes: ["Boards", "Columns"],
    endpoints: (builder) => ({
        getBoards: builder.query<Board[], void>({
            query: () => "boards",
            providesTags: ['Boards'],
            async onQueryStarted(arg, api) {
                const queryResult = await api.queryFulfilled
                if(queryResult.data.length > 0 && store.getState().selectedBoardId.value == null){
                    store.dispatch(setSelectedBoardId(queryResult.data[0].id))
                }
            }
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
        updateSubtaskById: builder.mutation<void, UpdateSubtaskType>({
            query: (arg) => ({
                url: `subtasks/${arg.id}`,
                method: 'PUT',
                body: JSON.stringify(arg.body),
                headers: {
                    'content-type': 'application/json'
                }
            }),
            invalidatesTags: ['Columns']
        }),
        deleteTaskById: builder.mutation<void, DeleteTaskType>({
            query: (body) => ({
                url: `tasks/${body.id}`,
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            }),
            invalidatesTags: ['Columns']
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
            invalidatesTags: ['Columns']
        }),
        updateTask: builder.mutation<void, UpdateTaskRequestBody>({
            query: (content) => ({
                url: `tasks/${content.taskId}`,
                method: 'PUT',
                body: JSON.stringify(content.requestBody),
                headers: {
                    'content-type': 'application/json'
                }
            }),
            invalidatesTags: ['Columns']
        }),
        updateTasksStatus: builder.mutation<void, UpdateTaskStatusRequestBody>({
            query: (content) => ({
                url: `tasks/${content.taskId}/status/${content.targetColumnId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Columns']
        }),
        updateTaskPosition: builder.mutation<void, UpdateTaskPosition>({
            query: (content) => ({
                url: `tasks/${content.taskId}/position`,
                method: 'PUT',
                body: JSON.stringify(content),
                headers: {
                    'content-type': 'application/json'
                }
            })
        })
    })
})

export const store = configureStore({
    reducer: {
        [kanbanApi.reducerPath]: kanbanApi.reducer,
        selectedBoard: selectedBoardSliceReducer,
        isDarkMode: isDarkModeReducer,
        isSideBarShown: isSideBarSliceReducer,
        selectedBoardId: selectedBoardIdSliceReducer,
        selectedTask: selectedTaskSliceReducer,
        isDetailsDialogOpen: isDetailsDialogOpenSliceReducer
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
    useUpdateBoardByIdMutation,
    useUpdateSubtaskByIdMutation,
    useDeleteTaskByIdMutation,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useUpdateTasksStatusMutation,
    useUpdateTaskPositionMutation
} = kanbanApi