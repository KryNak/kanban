import React from 'react'
import { TodoCard } from '../atoms/TaskCard'
import { Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Droppable } from 'react-beautiful-dnd'

export {TodoCardList}

type TodoCardListProp = {
    columnId: string | null
}

function TodoCardList({columnId}: TodoCardListProp): React.ReactElement {

    const darkMode = useSelector((state: RootState) => state.isDarkMode.value)
    const selectedBoard = useSelector((root: RootState) => root.selectedBoard.value)!!
    const isMobileViewMode = useSelector((root: RootState) => root.isMobileViewMode.value)
    const tasks = selectedBoard?.columns.find(column => column.id === columnId)?.tasks ?? []

    const styles: {[name: string]: any} = {
        listStyle: {
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            height: 'calc(100% - 50px)',
            overflowX: 'hidden',
            alignItems: 'flex-start',
            width: isMobileViewMode ? 'calc(100vw - 100px)' : '350px',
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

    return (
        <Droppable droppableId={columnId ?? ""} direction="vertical" type='task'>
            {provided => (
                <Stack sx={styles.listStyle} {...provided.droppableProps} ref={provided.innerRef}>
                    {
                        tasks && tasks.map((task, index) => {
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