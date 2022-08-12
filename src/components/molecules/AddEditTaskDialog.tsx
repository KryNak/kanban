import { ButtonBase, Dialog, FormControl, FormHelperText, IconButton, InputLabel, List, ListItem, MenuItem, Select, TextField, Typography } from "@mui/material"
import { CSSProperties, useEffect } from "react"
import { useSelector } from "react-redux"
import { CreateTaskType, RootState, UpdateTaskRequestBody, useCreateTaskMutation, useGetBoardByIdQuery, useUpdateTaskMutation } from "../../app/store"
import { colors } from "../../colors"
import { CrudOption } from "../../enums"
import { KanbanInput } from "../atoms/KanbanInput"
import * as Yup from 'yup'
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Clear, KeyboardArrowDown } from "@mui/icons-material"
import { skipToken } from "@reduxjs/toolkit/dist/query"
import { CreateTaskRequestDto, CreateTaskSubtaskRequestDto, Subtask, Task, UpdateTaskRequestDto, UpdateTaskSubtaskRequestDto } from "../../dto/DTOs"
export {AddEditTaskDialog}

type AddEditTaskDialogProps = {
    onClose: () => void,
    isOpen: boolean,
    crudOption: CrudOption,
    task?: Task,
    parentColumnId?: string 
}

type FormProps = {
    title: string,
    description: string,
    statusId: string,
    subtasks: Subtask[]
}

const AddEditTaskDialog = ({isOpen, onClose, crudOption, task, parentColumnId}: AddEditTaskDialogProps) => {

    const isDarkMode = useSelector((state: RootState) => state.isDarkMode.value)
    const selectedBoardId = useSelector((state: RootState) => state.selectedBoardId.value)

    const {data: selectedBoard} = useGetBoardByIdQuery(selectedBoardId ?? skipToken)
    const [createTask] = useCreateTaskMutation()
    const [updateTask] = useUpdateTaskMutation()

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
        formStyle: {
            display: 'flex',
            gap: '1.5em',
            width: '100%',
            height: '100%',
            flexDirection: 'column'
        },
        addSubtaskButton: {
            padding: '15px',
            backgroundColor: isDarkMode ? 'white' : colors.secondaryDark,
            color: isDarkMode ? colors.violet : 'white',
            borderRadius: '25px',
            width: '100%'
        }
    }

    const validationSchema = Yup.object({
        title: Yup
            .string()
            .required('Task title is required.'),
        description: Yup
            .string(),
        statusId: Yup
            .string()
            .required('Status is required.'),
        subtasks: Yup
            .array()
            .min(1, 'At least one subtask is required.')
            .of(
                Yup.object({
                    title: Yup.string()
                        .required('Subtask title is required.')
                })
            )
    })

    const {
        reset,
        setValue,
        formState: { errors },
        control,
        register,
        handleSubmit
    } = useForm<FormProps>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: '',
            description: '',
            statusId: '',
            subtasks: []
        }
    })

    useEffect(() => {
        if(isOpen) {
            setTimeout(() => {
                reset()
            }, 20)

            setTimeout(() => {
                if(crudOption === CrudOption.Edit) {
                    setValue('title', task?.title ?? "")
                    setValue('description', task?.description ?? "")
                    setValue('statusId', parentColumnId ?? "")
                    setValue('subtasks', task?.subtasks ?? [])
                }
            }, 25)
        }
    }, [isOpen])

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'subtasks'
    });

    const onSubmit = (data: FormProps) => {
        if(crudOption === CrudOption.Create) {
            createTask({body: new CreateTaskRequestDto(data.title, data.description, data.statusId, data.subtasks.map((subtask, index) => new CreateTaskSubtaskRequestDto(subtask.title, index))), columnId: data.statusId} as CreateTaskType)
        }
        else if(crudOption === CrudOption.Edit && parentColumnId) {
            const taskToUpdate = task!!
            const requestBody = new UpdateTaskRequestDto(taskToUpdate.id, data.title, data.description, taskToUpdate.position, data.statusId, data.subtasks.map((subtask, index) => new UpdateTaskSubtaskRequestDto(subtask.id, subtask.title, subtask.isCompleted, index)))
            updateTask(new UpdateTaskRequestBody(taskToUpdate.id, parentColumnId, requestBody))
        }

        onClose()
        setTimeout(() => {
            reset()
        }, 200)
    }

    const handleClose = () => {
        onClose()
        setTimeout(() => {
            reset()
        }, 200)
    }

    const handleAppendColumn = () => {
        append(new Subtask('', false, '', fields.length + 1))
    }

    const handleRemoveColumn = (index: number) => () => {
        remove(index)
    }

    return (
        <Dialog PaperProps={{style: styles.dialogPaper}} onClose={handleClose} open={isOpen}>
            <form style={styles.formStyle}>
                <Typography color={isDarkMode ? 'white' : 'black'} fontSize={22}>{crudOption === CrudOption.Create ? 'Add New Task' : 'Edit Task'}</Typography>
                
                
                <KanbanInput props={register('title')} error={errors.title ? true: false} helperText={errors.title?.message} multiline={false} label="Title" placeholder="e.g. Take coffee break" darkMode={isDarkMode}/>
                
                
                
                <KanbanInput props={register('description')} error={errors.description ? true: false} helperText={errors.description?.message} multiline={true} rows={5} label="Description" placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little." darkMode={isDarkMode}/>
                
                
                
                
                <FormControl sx={{width: '100%'}} error={errors.subtasks ? true : false}>
                    <Typography sx={{marginBottom: '0.5em'}} fontSize={14} color={isDarkMode ? 'white': 'black'}>Subtasks</Typography>
                    <List sx={{margin: '0', padding: 0, width: '100%'}}>
                        {fields.map((field, index) => {
                            return (
                                <ListItem key={field.id} sx={{padding: 0, margin: '0 0 0.5em 0', width: '100%'}}>
                                    <KanbanInput 
                                        props={register(`subtasks.${index}.title`)}
                                        error={errors.subtasks?.[index]?.title ? true : false} 
                                        helperText={errors.subtasks?.[index]?.title?.message}
                                        placeholder={'e.g. Make coffee'} 
                                        multiline={false} 
                                        darkMode={isDarkMode}
                                    />
                                    <IconButton onClick={handleRemoveColumn(index)} sx={{padding: '5px', transform: `translateX(10px) translateY(${errors.subtasks?.[index]?.title ? '-10px': '0px'})`}}>
                                        <Clear htmlColor={colors.headersGrey}/>
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                    </List>
                    <FormHelperText sx={{marginBottom: '0.5em'}}>{errors.subtasks?.message}</FormHelperText>
                    <ButtonBase onClick={handleAppendColumn} sx={styles.addSubtaskButton}>+ Add New Subtask</ButtonBase>
                </FormControl>
                    
                



                <div style={{width: '100%'}}>
                    <Typography sx={{paddingBottom: '0.5em'}} fontSize={14} color={isDarkMode ? 'white': 'black'}>Status</Typography>
                    <FormControl error={errors.statusId ? true : false} sx={{width: '100%'}}>
                        <Controller name="statusId" control={control} render={({field}) => {
                            return (
                                <Select
                                    MenuProps={{sx: {'& .MuiPaper-root': {backgroundColor: isDarkMode ? colors.primaryDark : colors.primaryLight, '& li': {color: isDarkMode ? 'white' : 'black'}}}}} 
                                    IconComponent={KeyboardArrowDown}
                                    sx={selectStyle}
                                    onChange={field.onChange} 
                                    value={field.value}
                                    displayEmpty
                                >
                                    <MenuItem disabled value="">
                                        <em>Select status</em>
                                    </MenuItem>
                                    {
                                        selectedBoard && selectedBoard.columns.map((column) => {
                                            return <MenuItem key={column.id} value={column.id}>{column.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            )
                        }}/>
                        <FormHelperText>{errors.statusId?.message}</FormHelperText>
                    </FormControl>
                </div>



                <ButtonBase type="button" onClick={handleSubmit(onSubmit)} sx={styles.createNewButton}>{crudOption === CrudOption.Create ? 'Create New Task' : 'Update Task'}</ButtonBase>


            </form>
        </Dialog>
    )
}