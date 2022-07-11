import { ButtonBase, Stack, Typography } from "@mui/material"
import React from "react"
import { ProgressColumn } from "../../data"
import { BoardColumn } from "../molecules/TasksColumn"

export {Board}

type BoardProps = {
    columns: ProgressColumn[],
    darkMode: boolean
}

function Board({columns, darkMode}: BoardProps): React.ReactElement {

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

    return (
        <Stack sx={{...styles.horizonalListOfColumns, ...scroll}}>
            {
                columns && columns.map((column, index) => {
                    return (
                        <BoardColumn name={column.name} tasks={column.tasks} darkMode={darkMode} color={column.color} />
                    )
                })
            }
            <ButtonBase sx={{...styles.addColumn}}>
                <Typography fontSize={22} color={'rgba(118,122,134,255)'}>
                    + New Colmun
                </Typography>
            </ButtonBase>
        </Stack>
    )

}