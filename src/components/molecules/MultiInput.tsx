import { Clear } from "@mui/icons-material"
import { Typography, List, ListItem, ButtonBase, IconButton } from "@mui/material"
import { ChangeEventHandler, ReactElement, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/strore"
import { colors } from "../../colors"
import { Column, Task } from "../../dto/DTOs"
import { KanbanInput } from "../atoms/KanbanInput"
import { v4 as uuidv4 } from 'uuid'
import { ModelClass } from "../../enums"

export {MultiInput}

type MultiInputProps = {
    label: string,
    addButtonLabel: string,
    columns?: Column[],
    tasks?: Task[],
    modelClass: ModelClass
}

const MultiInput: (props: MultiInputProps) => ReactElement = ({label, addButtonLabel, columns, tasks, modelClass}: MultiInputProps) => {

    const isDarkMode = useSelector((state: RootState) => state.isDarkMode.value)

    const styles = {
        addSubtaskButton: {
            padding: '15px',
            backgroundColor: isDarkMode ? 'white' : colors.secondaryDark,
            color: isDarkMode ? colors.violet : 'white',
            borderRadius: '25px',
            width: '100%'
        },
    }

    const [columnRows, setColumnRows] = useState<Column[]>(columns ?? [])
    const [taskRows, setTaskRows] = useState<Task[]>(tasks ?? [])

    const isColumnsSelected: boolean = ModelClass.Board === modelClass ? true : false

    const handleDelete = (id: string) => () => {
        if(isColumnsSelected) {
            setColumnRows((columns) => columns.filter((column) => column.id !== id))
        } else {
            setTaskRows((tasks) => tasks.filter((task) => task.id !== id))
        }
    }

    const handleAdd = () => {
        if(isColumnsSelected) {
            setColumnRows((columns) => [...columns, new Column(uuidv4(), '', [])])
        } else {
            setTaskRows((tasks) => [...tasks, new Task(uuidv4(), '', '', '', [])])
        }
    }

    return (
        <div style={{width: '100%'}}>
            <Typography sx={{marginBottom: '0.5em'}} fontSize={14} color={isDarkMode ? 'white': 'black'}>{label}</Typography>
            <List sx={{margin: '0', padding: 0, width: '100%'}}>
                {
                    isColumnsSelected ? (
                        columnRows && columnRows.map((row) => <MutiInputRow key={row.id} value={row.name} handleDeleteAction={handleDelete} placeholder="e.g. Todo" id={row.id} isDarkMode={isDarkMode}/>)
                    ) : (
                        taskRows && taskRows.map((row) => <MutiInputRow key={row.id} value={row.title} handleDeleteAction={handleDelete} placeholder="e.g. Make coffee" id={row.id} isDarkMode={isDarkMode}/>)
                    )
                }
            </List>
            <ButtonBase onClick={handleAdd} sx={styles.addSubtaskButton}>{addButtonLabel}</ButtonBase>
        </div>
    )
}

type MultiInputRowProps = {
    id: string,
    placeholder: string,
    value: string | null,
    isDarkMode: boolean,
    handleDeleteAction: (id: string) => () => void
}

const MutiInputRow: (props: MultiInputRowProps) => ReactElement = ({id, placeholder, value, isDarkMode, handleDeleteAction}: MultiInputRowProps) => {

    const [input, setInput] = useState<string>(value ?? "")
    
    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setInput(e.target.value)
    }

    return (
        <ListItem sx={{padding: 0, margin: '0 0 0.5em 0', width: '100%'}}>
            <KanbanInput onChange={handleChange} placeholder={placeholder} value={input} multiline={false} darkMode={isDarkMode}/>
            <IconButton onClick={handleDeleteAction(id)} sx={{padding: '5px', transform: 'translateX(10px)'}}>
                <Clear htmlColor={colors.headersGrey}/>
            </IconButton>
        </ListItem>
    )
}