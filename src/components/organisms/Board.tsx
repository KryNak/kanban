import { ButtonBase, Stack, Typography } from "@mui/material"
import { skipToken } from "@reduxjs/toolkit/dist/query"
import React, { ReactElement, useEffect, useRef, useState } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setSelectedBoard } from "../../app/features/selectedBoard/selectedBoardSlice"
import { RootState, UpdateTaskPosition, useGetBoardByIdQuery, useUpdateTaskPositionMutation } from "../../app/store"
import { colors } from "../../colors"
import { Board as BoardModel, Task } from "../../dto/DTOs"
import { CrudOption } from "../../enums"
import { AddEditBoardDialog } from "../molecules/AddEditBoardDialog"
import { BoardColumn } from "../molecules/TasksColumn"

export function Board(): React.ReactElement {

    const dispatch = useDispatch()

    const darkMode: boolean = useSelector((state: RootState) => state.isDarkMode.value)
    const selectedBoard: BoardModel | null = useSelector((state: RootState) => state.selectedBoard.value)
    const selectedBoardId: string | null = useSelector((state: RootState) => state.selectedBoardId.value)
    const isMobileViewMode: boolean = useSelector((state: RootState) => state.isMobileViewMode.value)

    const [updateTaskPosition] = useUpdateTaskPositionMutation()
    const {data: fetchedBoard, isSuccess} = useGetBoardByIdQuery(selectedBoardId ?? skipToken)

    const [selectedColumn, setSelectedColumn] = useState<number>(0)

    useEffect(() => {
        if(!isSuccess) return;
        dispatch(setSelectedBoard(fetchedBoard ?? null))
    }, [JSON.stringify(fetchedBoard)])

    useEffect(() => {
        setSelectedColumn(0)
    }, [selectedBoardId])



    const styles: {[name: string]: React.CSSProperties} = {
        horizontalListOfColumns: {
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            gap: '1.5em',
            paddingLeft: isMobileViewMode ? '0' : '1.5em',
            paddingRight: isMobileViewMode ? '0' : '1.5em',
            overflowX: isMobileViewMode ? 'hidden' : 'auto',
            overflowY: 'hidden',
            zIndex: '1'
        },
        addColumn: {
            marginTop: '50px', 
            borderRadius: '5px', 
            width: '350px',
            minWidth: '350px',
            backgroundColor: darkMode ? 'rgba(35,35,48,255)' : 'rgba(233,239,249,255)',
            height: 'calc(100% - 50px - 50px)',
            minHeight: '100px',
            transition: 'background-color .5s'
        }
    }

    const scroll = {
        '&::-webkit-scrollbar': {
            width: '15px',
            backgroundColor: darkMode ? 'rgba(34,33,45,255)' : 'rgba(245,247,254,255)',
            transition: 'all 10s'
        },
        '&::-webkit-scrollbar-track': {
            borderRadius: '3px',
            backgroundColor: 'transparent',
            width: '2px',
            transition: 'all 10s'
        },
        
        '&::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            backgroundColor: darkMode ? 'rgba(44,44,56,255)' : 'rgba(192,193,193,255)',
            border: `3px solid ${darkMode ? 'rgba(34,33,45,255)' : 'rgba(245,247,254,255)'}`,
            width: '2px',
            transition: 'all 10s'
        },
    
        '&::-webkit-scrollbar-thumb:hover': {
            borderRadius: '10px',
            backgroundColor: darkMode ? 'rgba(44,44,56,255)' : 'rgba(125,125,125,255)',
            border: `3px solid ${darkMode ? 'rgba(34,33,45,255)' : 'rgba(245,247,254,255)'}`,
            width: '2px',
            transition: 'all 10s'
        }
    }

    const [isEditBoardDialogOpen, setIsEditBoardDialogOpen] = useState(false)

    const handleEditBoardDialogClose = () => {
        setIsEditBoardDialogOpen(false)
    }

    const handleEditBoardDialogOpen = () => {
        setIsEditBoardDialogOpen(true)
    }

    const onDragEnd = (result: DropResult) => {
        if(!selectedBoard) return;
        const unwrappedBoard: BoardModel = selectedBoard!!

        const { source, destination, draggableId } = result

        const taskId = draggableId

        const destinationPosition = destination?.index ?? source.index
        const sourcePosition = source.index

        const sourceColumnId = source.droppableId
        const destinationColumnId = destination?.droppableId ?? sourceColumnId
        
        if(sourceColumnId === destinationColumnId) {

            const sourceColumnIndex = unwrappedBoard.columns.findIndex(e => e.id === sourceColumnId)
            if(sourceColumnIndex === -1) return;

            const newTasksOrder: Task[] = Array.from(unwrappedBoard.columns[sourceColumnIndex].tasks)
            const [task] = newTasksOrder.splice(sourcePosition, 1)
            newTasksOrder.splice(destinationPosition, 0, task)
            
            const newSelectedBoard = {...unwrappedBoard, columns: unwrappedBoard.columns.map((col, index) => index === sourceColumnIndex ? {...col, tasks: newTasksOrder} : col)}
            
            dispatch(setSelectedBoard(newSelectedBoard))

        }
        else if(sourceColumnId !== destinationColumnId) {

            const sourceColumnIndex = unwrappedBoard.columns.findIndex(e => e.id === sourceColumnId)
            const destinationColumnIndex = unwrappedBoard.columns.findIndex(e => e.id === destinationColumnId)
            if(sourceColumnIndex === -1 || destinationColumnIndex === -1) return;

            const columnWithDeletedTask = Array.from(unwrappedBoard.columns[sourceColumnIndex].tasks)
            const [task] = columnWithDeletedTask.splice(sourcePosition, 1)

            const columnWithAddedTask = Array.from(unwrappedBoard.columns[destinationColumnIndex].tasks)
            columnWithAddedTask.splice(destinationPosition, 0, task)

            const columnsAfterDrop = Array.from(unwrappedBoard.columns)
            columnsAfterDrop.splice(sourceColumnIndex, 1, {...unwrappedBoard.columns[sourceColumnIndex], tasks: columnWithDeletedTask})
            columnsAfterDrop.splice(destinationColumnIndex, 1, {...unwrappedBoard.columns[destinationColumnIndex], tasks: columnWithAddedTask})

            const reformedSelectedBoard = {...unwrappedBoard, columns: columnsAfterDrop}

            dispatch(setSelectedBoard(reformedSelectedBoard))

        }
        
        updateTaskPosition(new UpdateTaskPosition(destinationColumnId, destinationPosition, taskId, sourceColumnId))
            
    }

    const onClickForward: () => void = () => {
        if(selectedBoard && selectedBoard.columns.length - 1 > selectedColumn){
            setSelectedColumn(prev => prev + 1)
        }
    }

    const onClickBack: () => void = () => {
        if(selectedColumn > 0) {
            setSelectedColumn(prev => prev - 1)
        }
    }

    const boardSelectedContent: ReactElement = (
        <Stack sx={{...styles.horizontalListOfColumns, ...scroll}}>

            {
                isMobileViewMode ? (
                    <div style={{display: 'flex', flexDirection: 'row', position: 'relative', left: `calc(${selectedColumn} * -100vw)`, transition: isMobileViewMode ? 'left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' : ''}}>
                    {
                        selectedBoard && selectedBoard.columns.map((column) => {
                            return (
                                <DragDropContext key={column.id} onDragEnd={onDragEnd}>
                                    <BoardColumn onClickBack={onClickBack} onClickForward={onClickForward} name={column.name} columnId={column.id} color={column.color} />
                                </DragDropContext>
                            )
                        })
                    }
                    </div>
                ) : (
                    <DragDropContext onDragEnd={onDragEnd}>
                    {
                        selectedBoard && selectedBoard.columns.map((column) => {
                            return (
                                <BoardColumn key={column.id} name={column.name} columnId={column.id} color={column.color} />
                            )
                        })
                    }
                    </DragDropContext>
                )
            }


            <ButtonBase onClick={handleEditBoardDialogOpen} sx={{...styles.addColumn}}>
                <Typography fontSize={22} color={'rgba(118,122,134,255)'}>
                    + New Colmun
                </Typography>
            </ButtonBase>
            <AddEditBoardDialog crudOption={CrudOption.Edit} onClose={handleEditBoardDialogClose} isOpen={isEditBoardDialogOpen}/>
        </Stack>
    )

    const boardNotSelectedContent: ReactElement = (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column', flexWrap: 'nowrap', gap: '1.5em'}}>
            <Typography color={colors.headersGrey} textAlign={'center'}>
                There are no boards yet!<br/>
                Please create one.
            </Typography>
            <ButtonBase onClick={handleEditBoardDialogOpen} sx={{backgroundColor: colors.violet, padding: '10px 20px', borderRadius: '25px', whiteSpace: 'nowrap'}}>
                <Typography fontSize={14} color={'white'}>
                    Create Board
                </Typography>
            </ButtonBase>
            <AddEditBoardDialog crudOption={CrudOption.Create} onClose={handleEditBoardDialogClose} isOpen={isEditBoardDialogOpen}/>
        </div>
    )

    return (
        selectedBoardId ? boardSelectedContent : boardNotSelectedContent
    )

}