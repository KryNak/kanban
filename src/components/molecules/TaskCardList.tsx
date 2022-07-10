import React from 'react'
import {Todo} from '../../data'
import { TodoCard } from '../atoms/TaskCard'
import { Stack } from '@mui/material'

export {TodoCardList}

type TodoCardListProp = {
    tasks: Todo[],
    darkMode: boolean
}

function TodoCardList({tasks, darkMode}: TodoCardListProp): React.ReactElement {

    const scrollbar = `
    ::-webkit-scrollbar {
        width: 15px;
        background-color: ${darkMode ? 'rgba(34,33,45,255)' : 'rgba(245,247,254,255)'};
        transition: 'all .5s'
    }
      
    ::-webkit-scrollbar-track{
        border-radius: 3px;
        background-color: transparent;
        width: 2px;
        transition: 'all .5s'
    }
    
    ::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background-color: ${darkMode ? 'rgba(44,44,56,255)' : 'rgba(192,193,193,255)'};
        border:3px solid ${darkMode ? 'rgba(34,33,45,255)' : 'rgba(245,247,254,255)'};
        width: 2px;
        transition: 'all .5s'
    }

    ::-webkit-scrollbar-thumb:hover{
        border-radius: 10px;
        background-color: ${darkMode ? 'rgba(44,44,56,255)' : 'rgba(125,125,125,255)'};
        border:3px solid ${darkMode ? 'rgba(34,33,45,255)' : 'rgba(245,247,254,255)'};
        width: 2px;
        transition: 'all .5s'
    }
    `

    const styles: {[name: string]: any} = {
        listStyle: {
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            gap: '20px',
            height: 'calc(100% - 50px)',
            overflowX: 'hidden',
            paddingRight: '5px',
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
                tasks && tasks.map((task, index) => {
                    return (
                        <TodoCard key={task.name} darkMode={darkMode} subtaskAmount={task.subtasksAmount} subtaskCompleted={task.subtasksCompleted}>{task.name}</TodoCard>
                    )
                })
            }
        </Stack>
    )
}