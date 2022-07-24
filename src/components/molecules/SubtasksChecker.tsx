import { Typography, List, ListItem, Checkbox} from "@mui/material"
import { CSSProperties, ReactElement, useEffect, useState } from "react"
import { Subtask, Task } from "../../dto/DTOs"
import { colors } from '../../colors'
export { SubtasksChecker }

type SubtasksCheckerProps = {
    task: Task,
    isDarkMode: boolean
}

const SubtasksChecker: (props: SubtasksCheckerProps) => ReactElement = ({task, isDarkMode}: SubtasksCheckerProps) => {

    const styles: {[name: string]: CSSProperties} = {
        checkbox: {
            backgroundColor: isDarkMode ? colors.secondaryDark : colors.secondaryLight,
            width: '100%',
            padding: '0.8em',
            borderRadius: '5px',
            display: 'flex',
            gap: '5px'
        }
    }

    useEffect(() => {
        setSubtasks(task.subtasks)
    }, [])

    const [subtasks, setSubtasks] = useState<Subtask[]>([])

    const handleCheck = (index: number) => {
        setSubtasks((prevSubtasks) => [...prevSubtasks].map((subtask, index2) => {
            if(index === index2) {
                const subtask2 = {...subtask}
                subtask2.isCompleted = !subtask.isCompleted
                return subtask2
            }
            else {
                return subtask
            }
        }))
    }

    return (
        <div>
            <Typography sx={{marginBottom: '0.5em'}} fontSize={14} color={isDarkMode ? 'white': 'black'}>Subtasks ({subtasks.filter(e => e.isCompleted === true).length} of {subtasks.length})</Typography>
            <List sx={{margin: '0', padding: 0, width: '100%'}}>
                {
                    subtasks && subtasks.map((subtask, index) => {
                        return (
                            <ListItem key={index} sx={{padding: 0, margin: '0 0 0.5em 0', width: '100%'}}>
                                <div style={styles.checkbox}>
                                    <Checkbox onChange={() => handleCheck(index)} sx={{padding: '5px', color: colors.headersGrey, "&.Mui-checked": {'color': colors.violet}}}/>
                                    <Typography sx={{alignSelf: 'center', textDecoration: subtask.isCompleted ?'line-through' : 'none'}} fontSize={14} color={subtask.isCompleted ? colors.headersGrey : isDarkMode ? 'white' : 'black'}>{subtask.title}</Typography>
                                </div>
                            </ListItem>
                        )
                    })
                }
            </List>
        </div>
    )
}