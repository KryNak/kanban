import { Dialog, Typography, ButtonBase, TextField, List, ListItem, IconButton } from "@mui/material"
import { CSSProperties, ReactElement, useCallback, useEffect } from "react"
import { KanbanInput } from "../atoms/KanbanInput"
import { MultiInput } from "./MultiInput"
import { colors } from '../../colors'
import { CrudOption, ModelClass } from "../../enums"
import { Board, Column, ColumnDto, CreateBoardRequestDto, Task } from "../../dto/DTOs"
import { useForm, useFieldArray, FieldValues } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup';
import { Clear } from "@mui/icons-material"
import { useCreateBoardMutation } from "../../app/strore"

export { AddEditBoardDialog }

type AddEditBoardDialogProps = {
    isDarkMode: boolean,
    isOpen: boolean,
    onClose: () => void,
    crudOption: CrudOption,
    board?: Board | null
}

type FormProps = {
    boardName: string,
    columns: Column[]
}

const AddEditBoardDialog: (props: AddEditBoardDialogProps) => ReactElement = ({isDarkMode, onClose, isOpen, crudOption, board}: AddEditBoardDialogProps) => {

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

    const [createBoard] = useCreateBoardMutation()

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

    } = useForm<FormProps>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            boardName: '',
            columns: []
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'columns'
    });

    const onSubmit = (data: FormProps) => {
        if(crudOption == CrudOption.Create) {
            createBoard(new CreateBoardRequestDto(data.boardName, data.columns.map(e => new ColumnDto(e.name))))
        }
    };

    return (
        
        <Dialog PaperProps={{style: styles.dialogPaper}} onClose={() => {onClose(); reset()}} open={isOpen}>
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
                                    <IconButton onClick={() => {remove(index)}} sx={{padding: '5px', transform: `translateX(10px) translateY(${errors.columns?.[index]?.name ? '-10px': '0px'})`}}>
                                        <Clear htmlColor={colors.headersGrey}/>
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                    </List>
                    <ButtonBase onClick={() => {append(new Column('', '', []))}} sx={styles.addSubtaskButton}>+ Add New Column</ButtonBase>
                </div>
                <ButtonBase onClick={handleSubmit(onSubmit)} sx={styles.dialogButton}>{crudOption === CrudOption.Create ? 'Create New Board' : 'Update Board'}</ButtonBase>
            </form>
        </Dialog>
        
    )
}