import { Dialog, Typography, ButtonBase, IconButton, MenuItem, Menu, List, ListItem, Checkbox, Select, SelectChangeEvent } from "@mui/material"
import { CSSProperties, ReactElement, useEffect, useState } from "react"
import { colors } from '../../colors'
import { SelectedTask, Subtask, Task, UpdateSubtaskRequestDto } from "../../dto/DTOs"
import { KeyboardArrowDown, MoreVert } from "@mui/icons-material"
import { RemovingDialog } from "./RemovingDialog"
import { CrudOption, ModelClass } from "../../enums"
import { AddEditTaskDialog } from "./AddEditTaskDialog"
import { RootState, UpdateSubtaskType, useGetBoardByIdQuery, useDeleteTaskByIdMutation, useUpdateSubtaskByIdMutation, useUpdateTasksStatusMutation, UpdateTaskStatusRequestBody } from "../../app/store"
import { skipToken } from "@reduxjs/toolkit/dist/query"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedTask } from "../../app/features/selectedTask/slectedTask"
import { hideDetailsDialog } from "../../app/features/isDetailsDialogShown/isDetailsDialogShown"

export {DetailsTaskDialog}

const DetailsTaskDialog: () => ReactElement = () => {

    const isDarkMode = useSelector((root: RootState) => root.isDarkMode.value)

    const styles: {[name: string]: CSSProperties} = {
        createNewButton: {
            padding: '15px',
            backgroundColor: colors.violet,
            color: 'white',
            borderRadius: '25px'
        },
        dialogPaper: {
            backgroundColor: isDarkMode ? colors.primaryDark : colors.primaryLight,
            padding: '2em',
            height: 'max-content',
            width: '500px',
            display: 'flex',
            gap: '1.5em'
        },
        titleSection: {
            display: 'flex'
        },
        buttonShared: {
            padding: '10px 15px',
            borderRadius: '25px',
            width: '100%'
        },
        checkbox: {
            backgroundColor: isDarkMode ? colors.secondaryDark : colors.secondaryLight,
            width: '100%',
            padding: '0.8em',
            borderRadius: '5px',
            display: 'flex',
            gap: '5px'
        }
    }

    const menuStyle = {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        minWidth: '200px',
        backgroundColor: isDarkMode ? colors.primaryDark: colors.primaryLight,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: isDarkMode ? colors.primaryDark : colors.primaryLight,
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        }
    }

    const selectStyle= {
        width: '100%',
        color: isDarkMode ? 'white' : 'black',
        fontSize: '14px',
        '& fieldset': {
            borderColor: colors.headersGrey
        },
        '&:hover fieldset': {
            borderColor: `${colors.headersGrey} !important`
        },
        '&.Mui-focused fieldset': {
            borderColor: `${colors.headersGrey} !important`
        },
        '& svg': {
            color: colors.violet
        }
    }

    const dispatch = useDispatch()

    const selectedTask = useSelector((root: RootState) => root.selectedTask.value)
    const isDetailsDialogOpen = useSelector((root: RootState) => root.isDetailsDialogOpen.value)

    const [isRemovingDialogOpen, setIsRemovingDialogOpen] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [isTaskEditDialogOpen, setIsTaskEditDialogOpen] = useState<boolean>(false)
    const isMenuOpen = Boolean(anchorEl)

    const selectedBoardId = useSelector((state: RootState) => state.selectedBoardId.value)
    const {data: selectedBoard} = useGetBoardByIdQuery(selectedBoardId ?? skipToken)
    const [updateSubtask] = useUpdateSubtaskByIdMutation()
    const [deleteTask] = useDeleteTaskByIdMutation()
    const [updateTaskStatus] = useUpdateTasksStatusMutation()

    const {columnId, ...task} = selectedTask ?? new SelectedTask()
    const subtasks: Subtask[] = selectedTask?.subtasks ?? []
    

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleMenuClick: (e: React.MouseEvent<HTMLElement>) => void = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleOpenRemovingDialog = () => {
        dispatch(hideDetailsDialog())
        setAnchorEl(null)
        setIsRemovingDialogOpen(true)
    }

    const handleEditDialogOpen = () => {
        dispatch(hideDetailsDialog())
        setAnchorEl(null)
        setIsTaskEditDialogOpen(true)
    }

    const handleCloseRemovingDialog = () => {
        setIsRemovingDialogOpen(false)
    }

    const handleEditDialogClose = () => {
        setIsTaskEditDialogOpen(false)
    }

    const handleCheck = (subtask: Subtask) => () => {
        if(selectedTask) {
            updateSubtask({id: subtask.id, body: new UpdateSubtaskRequestDto(subtask.id, !subtask.isCompleted, selectedTask.id), columnId: selectedTask.columnId} as UpdateSubtaskType)
            dispatch(setSelectedTask({...selectedTask, subtasks: selectedTask.subtasks.map((sub) => sub.id === subtask.id ? {...sub, isCompleted: !subtask.isCompleted} : sub )}))
        }
    }

    const handleTaskDelete = () => {
        if(selectedTask) {
            deleteTask({id: selectedTask.id, columnId: selectedTask.columnId})
            setIsRemovingDialogOpen(false)
        }
    }

    const handleClose = () => {
        dispatch(hideDetailsDialog())
    }

    const handleStatusChange = (e: SelectChangeEvent) => {
        updateTaskStatus(new UpdateTaskStatusRequestBody(task.id, columnId, e.target.value))
        dispatch(setSelectedTask({columnId: e.target.value, ...task}))
    }

    return (
        <>
            <Dialog PaperProps={{style: styles.dialogPaper}} onClose={handleClose} open={isDetailsDialogOpen}>
                <div style={styles.titleSection}>
                    <Typography sx={{flexGrow: '1'}} color={isDarkMode ? 'white' : 'black'} fontSize={22}>{task.title}</Typography>
                    <IconButton onClick={handleMenuClick} sx={{alignSelf: 'flex-start', transform: 'translateX(16px)'}}>
                        <MoreVert htmlColor={colors.headersGrey}/>
                    </IconButton>
                </div>
                {
                    task.description && <Typography color={colors.headersGrey} fontSize={14}>{task.description}</Typography>
                }
                <div>
                    <Typography sx={{marginBottom: '0.5em'}} fontSize={14} color={isDarkMode ? 'white': 'black'}>Subtasks ({subtasks.filter(e => e.isCompleted === true).length} of {subtasks.length})</Typography>
                    <List sx={{margin: '0', padding: 0, width: '100%'}}>
                        {
                            subtasks.map((subtask) => {
                                return (
                                    <ListItem key={subtask.id} sx={{padding: 0, margin: '0 0 0.5em 0', width: '100%'}}>
                                        <div style={styles.checkbox}>
                                            <Checkbox checked={subtask.isCompleted} onChange={handleCheck(subtask)} sx={{padding: '5px', color: colors.headersGrey, "&.Mui-checked": {'color': colors.violet}}}/>
                                            <Typography sx={{alignSelf: 'center', textDecoration: subtask.isCompleted ?'line-through' : 'none'}} fontSize={14} color={subtask.isCompleted ? colors.headersGrey : isDarkMode ? 'white' : 'black'}>{subtask.title}</Typography>
                                        </div>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </div>
                <div style={{width: '100%'}}>
                    <Typography sx={{paddingBottom: '0.5em'}} fontSize={14} color={isDarkMode ? 'white': 'black'}>Status</Typography>
                    <Select onChange={handleStatusChange} value={columnId} MenuProps={{sx: {'& .MuiPaper-root': {backgroundColor: isDarkMode ? colors.primaryDark : colors.primaryLight, '& li': {color: isDarkMode ? 'white' : 'black'}}}}} IconComponent={KeyboardArrowDown} sx={selectStyle}>
                        {
                            selectedBoard && selectedBoard.columns.map((column) => {
                                return <MenuItem key={column.id} value={column.id}>{column.name}</MenuItem>
                            })
                        }
                    </Select>
                </div>
            </Dialog>
            <Menu anchorEl={anchorEl}
                id="account-menu"
                open={isMenuOpen}
                onClose={handleMenuClose}
                PaperProps={{
                    elevation: 0,
                    sx: menuStyle
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                <MenuItem onClick={handleEditDialogOpen} sx={{color: isDarkMode ? 'white': 'black'}}>Edit Task</MenuItem>
                <MenuItem onClick={handleOpenRemovingDialog} sx={{color: '#DC3545'}}>Delete Task</MenuItem>
            </Menu>
            <RemovingDialog mode={ModelClass.Task} isDarkMode={isDarkMode} isOpen={isRemovingDialogOpen} onClose={handleCloseRemovingDialog} onCancel={handleCloseRemovingDialog} onDelete={handleTaskDelete}/>
            <AddEditTaskDialog parentColumnId={columnId} isOpen={isTaskEditDialogOpen} onClose={handleEditDialogClose} crudOption={CrudOption.Edit} task={task}/>
        </>
    )
    
    
}