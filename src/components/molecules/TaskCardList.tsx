import React, { useEffect, useState } from 'react'
import { TodoCard } from '../atoms/TaskCard'
import { Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState, UpdateTaskPosition, useGetColumnByIdQuery, useUpdateTaskPositionMutation } from '../../app/store'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { Column, Task } from '../../dto/DTOs'

export {TodoCardList}

type TodoCardListProp = {
    columnId: string | null
}

function TodoCardList({columnId}: TodoCardListProp): React.ReactElement {

    const darkMode = useSelector((state: RootState) => state.isDarkMode.value)
    const {data: column, isSuccess} = useGetColumnByIdQuery(columnId ?? skipToken)
    const [updateTaskPosition] = useUpdateTaskPositionMutation()

    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        if(isSuccess) {
            setTasks(column.tasks ?? [])
        }
    }, [JSON.stringify(column)])

    const styles: {[name: string]: any} = {
        listStyle: {
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            height: 'calc(100% - 50px)',
            overflowX: 'hidden',
            alignItems: 'flex-start',
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
    }

    // const onDragEnd = (result: DropResult) => {
    //     const { source, destination, draggableId } = result

    //     const taskId = draggableId
    //     const destinationPosition = destination?.index ?? source.index
    //     const sourcePosition = source.index
    //     const columnId = source.droppableId

    //     setTasks((prev) => {
    //         const newTasksOrder: Task[] = Array.from(prev)
    //         const [task] = newTasksOrder.splice(sourcePosition, 1)
    //         newTasksOrder.splice(destinationPosition, 0, task)

    //         return newTasksOrder
    //     })

    //     updateTaskPosition(new UpdateTaskPosition(columnId, destinationPosition, taskId, columnId))
    // }

    return (        
        <Droppable droppableId={columnId ?? ""} direction="vertical" type='task'>
        {provided => (
            <Stack sx={styles.listStyle} {...provided.droppableProps} ref={provided.innerRef}>
                {
                    isSuccess && tasks.map((task, index) => {
                        return (
                            <TodoCard index={index} key={task.title} task={task} darkMode={darkMode} columnId={columnId ?? ""}/>
                        )
                    })
                }
                {provided.placeholder}
            </Stack>
        )}
        </Droppable>
    )
}