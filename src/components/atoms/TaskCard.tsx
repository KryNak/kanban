import { Typography } from "@mui/material"
import { Container } from "@mui/system"
import React, { ReactElement } from "react"
import { Draggable } from "react-beautiful-dnd"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { showDetailsDialog } from "../../app/features/isDetailsDialogShown/isDetailsDialogShown"
import { setSelectedTask } from "../../app/features/selectedTask/slectedTask"
import { RootState } from "../../app/store"
import { Task } from './../../dto/DTOs'
export {TodoCard}

type TodoCardProps = {
    task: Task
    darkMode: boolean
    columnId: string,
    index: number
}

const TodoCard = ({task, darkMode, columnId, index}: TodoCardProps): ReactElement => {

    const isMobileViewMode = useSelector((root: RootState) => root.isMobileViewMode.value)

    const styles: {[name: string]: React.CSSProperties} = {
        todoCard: {
            width: isMobileViewMode ? '250px' : '350px',
            height: 'max-content',
            padding: '20px 20px',
            margin: '5px 0',
            borderRadius: '5px',
            display: 'grid',
            gap: '5px',
            transition: 'background-color .5s'
        }
    }

    const dispatch = useDispatch()

    const handleOnClick = () => {
        dispatch(setSelectedTask({columnId: columnId, ...task}))
        dispatch(showDetailsDialog())
    }

    return (
        <Draggable draggableId={task.id} index={index}>
            {provided => (
                <Container onClick={handleOnClick} {...provided.dragHandleProps} {...provided.draggableProps} sx={{...styles.todoCard, backgroundColor: darkMode ? 'rgba(44,44,56,255)' : 'rgba(255, 255, 255, 255)'}} ref={provided.innerRef}>
                    <Typography sx={{transition: 'color .5s', textAlign: 'start'}} fontSize='14px' color={darkMode ? 'white' : 'black'}>
                        {task.title}
                    </Typography>
                    <Typography sx={{textAlign: 'start'}} fontSize='12px' color={'rgba(118,122,134,255)'}>
                        {task.subtasks.filter(e => e.isCompleted).length} of {task.subtasks.length} substasks
                    </Typography>
                </Container>
            )}
        </Draggable>
    )
}