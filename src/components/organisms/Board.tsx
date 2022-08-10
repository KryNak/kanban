import { ButtonBase, Stack, Typography } from "@mui/material"
import { skipToken } from "@reduxjs/toolkit/dist/query"
import React, { ReactElement, useState } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import { useSelector } from "react-redux"
import { RootState, useGetBoardByIdQuery } from "../../app/store"
import { colors } from "../../colors"
import { CrudOption } from "../../enums"
import { KanbanInput } from "../atoms/KanbanInput"
import { AddEditBoardDialog } from "../molecules/AddEditBoardDialog"
import { BoardColumn } from "../molecules/TasksColumn"

export {Board}

function Board(): React.ReactElement {

    const darkMode = useSelector((state: RootState) => state.isDarkMode.value)
    const selectedBoardId: string | null = useSelector((state: RootState) => state.selectedBoardId.value)

    const {data: selectedBoard, isSuccess} = useGetBoardByIdQuery(selectedBoardId ?? skipToken)

    const styles: {[name: string]: React.CSSProperties} = {
        horizonalListOfColumns: {
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            gap: '1.5em',
            paddingLeft: '1.5em',
            paddingRight: '1.5em',
            overflowX: 'auto',
            overflowY: 'hidden'
        },
        addColumn: {
            marginTop: '50px', 
            borderRadius: '5px', 
            width: '350px',
            minWidth: '350px',
            backgroundColor: darkMode ? 'rgba(35,35,48,255)' : 'rgba(233,239,249,255)',
            height: 'calc(100% - 50px - 50px)',
            minHeight: '100px',
            transition: 'background-color .5s'
        }
    }

    const scroll = {
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

    const [isEditBoardDialogOpen, setIsEditBoardDialogOpen] = useState(false)

    const handleEditBoardDialogClose = () => {
        setIsEditBoardDialogOpen(false)
    }

    const handleEditBoardDialogOpen = () => {
        setIsEditBoardDialogOpen(true)
    }

    const boardSelectedContent: ReactElement = (
        <Stack sx={{...styles.horizonalListOfColumns, ...scroll}}>
            <DragDropContext onDragEnd={() => alert('dropped')}>
                {
                    selectedBoard && selectedBoard.columns.map((column) => {
                        return (
                            <BoardColumn key={column.id} name={column.name} columnId={column.id} color={'red'} />
                        )
                    })
                }
            </DragDropContext>
            
            <ButtonBase onClick={handleEditBoardDialogOpen} sx={{...styles.addColumn}}>
                <Typography fontSize={22} color={'rgba(118,122,134,255)'}>
                    + New Colmun
                </Typography>
            </ButtonBase>
            <AddEditBoardDialog crudOption={CrudOption.Edit} onClose={handleEditBoardDialogClose} isOpen={isEditBoardDialogOpen}/>
        </Stack>
    )

    const boardNotSelectedContent: ReactElement = (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column', flexWrap: 'nowrap', gap: '1.5em'}}>
            <Typography color={colors.headersGrey} textAlign={'center'}>
                There are no boards yet!<br/>
                Please create one.
            </Typography>
            <ButtonBase sx={{backgroundColor: colors.violet, padding: '10px 20px', borderRadius: '25px', whiteSpace: 'nowrap'}}>
                <Typography fontSize={14} color={'white'}>
                    Create Board
                </Typography>
            </ButtonBase>
        </div>
    )

    return (
        selectedBoardId && isSuccess ? boardSelectedContent : boardNotSelectedContent
    )

}