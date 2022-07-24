import { Dialog, Typography, ButtonBase, TextField, List, ListItem, IconButton } from "@mui/material"
import { CSSProperties, ReactElement, useCallback, useEffect } from "react"
import { KanbanInput } from "../atoms/KanbanInput"
import { MultiInput } from "./MultiInput"
import { colors } from '../../colors'
import { CrudOption, ModelClass } from "../../enums"
import { Board, Column, ColumnDto, CreateBoardRequestDto, Task, UpdateBoardRequestDto } from "../../dto/DTOs"
import { useForm, useFieldArray, FieldValues } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup';
import { Clear } from "@mui/icons-material"
import { RootState, UpdateBoardType, useCreateBoardMutation, useGetBoardByIdQuery, useUpdateBoardByIdMutation } from "../../app/strore"
import { useSelector } from "react-redux"
import { skipToken } from "@reduxjs/toolkit/dist/query"

export { AddEditBoardDialog }

type AddEditBoardDialogProps = {
    isOpen: boolean,
    onClose: () => void,
    crudOption: CrudOption
}

type FormProps = {
    boardName: string,
    columns: Column[]
}

const AddEditBoardDialog: (props: AddEditBoardDialogProps) => ReactElement = ({onClose, isOpen, crudOption}: AddEditBoardDialogProps) => {

    const isDarkMode = useSelector((state: RootState) => state.isDarkMode.value)
    const selectedBoardId = useSelector((state: RootState) => state.selectedBoardId.value)

    const {data: selectedBoard, isSuccess} = useGetBoardByIdQuery(selectedBoardId ?? skipToken)
    const [createBoard] = useCreateBoardMutation()
    const [updateBoard] = useUpdateBoardByIdMutation()

    const styles: {[name: string]: CSSProperties} = {
        dialogPaper: {
            backgroundColor: isDarkMode ? colors.primaryDark : colors.primaryLight,
            padding: '2em',
            height: 'max-content',
            width: '500px'
        },
        dialogButton: {
            padding: '15px',
            backgroundColor: colors.violet,
            color: 'white',
            borderRadius: '25px'
        },
        formStyle: {
            display: 'flex',
            gap: '1.5em',
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
        boardName: Yup
            .string()
            .required('Board name is required'),
        columns: Yup
            .array()
            .min(1, 'At least one column is required')
            .of(
                Yup.object({
                    name: Yup
                        .string()
                        .required('Column name is required')
                })
            )
    })

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm<FormProps>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            boardName: '',
            columns: []
        }
    })

    useEffect(() => {
        if(crudOption === CrudOption.Edit && isOpen) {
            setValue('boardName', selectedBoard?.name ?? '')
            setValue('columns', selectedBoard?.columns ?? [])
        }
    }, [isOpen, reset])

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'columns'
    });

    const hanldeClose = () => {
        onClose()
        reset()
    }

    const handleAppendColumn = () => {
        append(new Column('', '', []))
    }

    const handleRemoveColumn = (index: number) => () => {
        remove(index)
    }

    const onSubmit = (data: FormProps) => {
        if(crudOption === CrudOption.Create) {
            createBoard(new CreateBoardRequestDto(data.boardName, data.columns.map(e => new ColumnDto(e.name))))
        }
        else if(crudOption === CrudOption.Edit && selectedBoardId) {
            console.log(data.columns)

            updateBoard({id: selectedBoardId, body: new UpdateBoardRequestDto(selectedBoardId, data.boardName, data.columns)} as UpdateBoardType)
        }

        onClose()
        reset()
    };

    const content = (
        <Dialog PaperProps={{style: styles.dialogPaper}} onClose={hanldeClose} open={isOpen}>
            <form style={styles.formStyle}>
                <Typography color={isDarkMode ? 'white' : 'black'} fontSize={22}>{crudOption === CrudOption.Create ? 'Add New Board' : 'Edit Board'}</Typography>
                <KanbanInput 
                    props={register('boardName')} 
                    error={errors.boardName ? true : false} 
                    helperText={errors.boardName?.message}
                    multiline={false} 
                    label="Name" 
                    placeholder="e.g. Take coffee break" 
                    darkMode={isDarkMode}
                />
                <div style={{width: '100%'}}>
                    <Typography sx={{marginBottom: '0.5em'}} fontSize={14} color={isDarkMode ? 'white': 'black'}>Columns</Typography>
                    <List sx={{margin: '0', padding: 0, width: '100%'}}>
                        {fields.map((field, index) => {
                            return (
                                <ListItem key={field.id} sx={{padding: 0, margin: '0 0 0.5em 0', width: '100%'}}>
                                    <KanbanInput 
                                        props={register(`columns.${index}.name`)}
                                        error={errors.columns?.[index]?.name ? true : false} 
                                        helperText={errors.columns?.[index]?.name?.message}
                                        placeholder={'e.g. Todo'} 
                                        multiline={false} 
                                        darkMode={isDarkMode}
                                    />
                                    <IconButton onClick={handleRemoveColumn(index)} sx={{padding: '5px', transform: `translateX(10px) translateY(${errors.columns?.[index]?.name ? '-10px': '0px'})`}}>
                                        <Clear htmlColor={colors.headersGrey}/>
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                    </List>
                    <ButtonBase onClick={handleAppendColumn} sx={styles.addSubtaskButton}>+ Add New Column</ButtonBase>
                </div>
                <ButtonBase onClick={handleSubmit(onSubmit)} sx={styles.dialogButton}>{crudOption === CrudOption.Create ? 'Create New Board' : 'Update Board'}</ButtonBase>
            </form>
        </Dialog>
    )

    return (
        
        isSuccess ? content : <div/>
        
    )
}