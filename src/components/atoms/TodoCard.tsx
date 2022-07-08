import { Typography } from "@mui/material"
import React, { ReactElement } from "react"
export {TodoCard}

type TodoCardProps = {
    subtaskAmount: number, 
    subtaskCompleted: number, 
    darkMode: boolean,
    children: string
}

function TodoCard({subtaskAmount, subtaskCompleted, darkMode, children}: TodoCardProps): ReactElement{

    const styles: {[name: string]: React.CSSProperties} = {
        todoCard: {
            width: '250px',
            height: 'max-content',
            padding: '20px 20px',
            borderRadius: '5px',
            display: 'grid',
            gap: '5px'
        }
    }

    return (
        <div style={{...styles.todoCard, backgroundColor: darkMode ? 'rgba(44,44,56,255)' : 'rgba(255, 255, 255, 255)'}}>
            <Typography color={darkMode ? 'white' : 'black'}>
                {children}
            </Typography>
            <Typography fontSize='12px' color={'rgba(118,122,134,255)'}>
                {subtaskCompleted} of {subtaskAmount} subtasks
            </Typography>
        </div>
    )
}