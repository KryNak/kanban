import React from 'react'
import { ColumnHeader } from './TasksColumnHeader'
import { TodoCardList } from './TaskCardList'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { ButtonBase } from '@mui/material'
import { ArrowBackIos, ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { colors } from '../../colors'
export { BoardColumn }

type BoardColumnProps = {
    name: string,
    color: string,
    style?: React.CSSProperties,
    columnId: string,
    onClickForward?: () => void,
    onClickBack?: () => void
}

function BoardColumn({name, columnId, color, style, onClickBack, onClickForward}: BoardColumnProps): React.ReactElement {

    const isMobileViewMode: boolean = useSelector((root: RootState) => root.isMobileViewMode.value)

    const styles: {[name: string]: React.CSSProperties} = {
        column: {
            paddingBottom: '50px',
            minWidth: isMobileViewMode ? '100vw' : '350px',
            display: 'flex',
            justifyContent: isMobileViewMode ? 'space-between' : 'flex-start'
        }
    }

    return (
        <div style={{...styles.column, ...style}}>
            {
                isMobileViewMode && (
                    <ButtonBase disableRipple onClick={onClickBack} sx={{width: `50px`, marginBottom: '-50px'}}>
                        <ArrowBackIosNew htmlColor={colors.violet}/>
                    </ButtonBase>
                )
            }
            
            <div>
                <ColumnHeader color={color}>{name}</ColumnHeader>
                <TodoCardList columnId={columnId}/>
            </div>


            {
                isMobileViewMode && (
                    <ButtonBase disableRipple onClick={onClickForward} sx={{width: `50px`, marginBottom: '-50px'}}>
                        <ArrowForwardIos htmlColor={colors.violet}/>
                    </ButtonBase>
                )
            }
        </div>
    )
}