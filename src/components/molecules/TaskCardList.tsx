import React, { useEffect } from 'react'
import { Task } from '../../dto/DTOs'
import { TodoCard } from '../atoms/TaskCard'
import { Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState, useGetColumnByIdQuery } from '../../app/store'
import { skipToken } from '@reduxjs/toolkit/dist/query'

export {TodoCardList}

type TodoCardListProp = {
    columnId: string | null
}

function TodoCardList({columnId}: TodoCardListProp): React.ReactElement {

    const darkMode = useSelector((state: RootState) => state.isDarkMode.value)
    const {data: column, isSuccess} = useGetColumnByIdQuery(columnId ?? skipToken)

    const styles: {[name: string]: any} = {
        listStyle: {
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            gap: '20px',
            height: 'calc(100% - 50px)',
            overflowX: 'hidden',
            paddingRight: '5px',
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

    return (
        <Stack sx={styles.listStyle}>
            {
                isSuccess && column.tasks.map((task) => {
                    return (
                        <TodoCard key={task.title} task={task} darkMode={darkMode} columnId={columnId ?? ""}/>
                    )
                })
            }
        </Stack>
    )
}