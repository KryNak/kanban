import { ButtonBase, Typography } from "@mui/material"
import React, { ReactElement, useState } from "react"
import { useDispatch } from "react-redux"
import { showDetailsDialog } from "../../app/features/isDetailsDialogShown/isDetailsDialogShown"
import { setSelectedTask } from "../../app/features/selectedTask/slectedTask"
import { DetailsTaskDialog } from "../molecules/DetailsTaskDialog"
import { Task } from './../../dto/DTOs'
export {TodoCard}

const styles: {[name: string]: React.CSSProperties} = {
    todoCard: {
        width: '350px',
        height: 'max-content',
        padding: '20px 20px',
        borderRadius: '5px',
        display: 'grid',
        gap: '5px',
        transition: 'background-color .5s'
    }
}

type TodoCardProps = {
    task: Task
    darkMode: boolean
    columnId: string
}

const TodoCard = ({task, darkMode, columnId}: TodoCardProps): ReactElement => {

    const dispatch = useDispatch()

    const handleOnClick = () => {
        dispatch(setSelectedTask({columnId: columnId, ...task}))
        dispatch(showDetailsDialog())
    }

    return (
        <>
            <ButtonBase onClick={handleOnClick} sx={{borderRadius: '5px'}}>
                <div style={{...styles.todoCard, backgroundColor: darkMode ? 'rgba(44,44,56,255)' : 'rgba(255, 255, 255, 255)'}}>
                    <Typography sx={{transition: 'color .5s', textAlign: 'start'}} fontSize='14px' color={darkMode ? 'white' : 'black'}>
                        {task.title}
                    </Typography>
                    <Typography sx={{textAlign: 'start'}} fontSize='12px' color={'rgba(118,122,134,255)'}>
                        {task.subtasks.filter(e => e.isCompleted).length} of {task.subtasks.length} substasks
                    </Typography>
                </div>
            </ButtonBase>
            
        </>
    )
}