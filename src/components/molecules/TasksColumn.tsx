import React from 'react'
import { ColumnHeader } from './TasksColumnHeader'
import { TodoCardList } from './TaskCardList'
export { BoardColumn }

type BoardColumnProps = {
    name: string,
    color: string,
    style?: React.CSSProperties,
    columnId: string
}

function BoardColumn({name, columnId, color, style}: BoardColumnProps): React.ReactElement {

    const styles: {[name: string]: React.CSSProperties} = {
        column: {
            paddingBottom: '50px',
            minWidth: '370px'
        }
    }

    return (
        <div style={{...styles.column, ...style}}>
            <ColumnHeader color={color}>{name}</ColumnHeader>
            <TodoCardList columnId={columnId}/>
        </div>
    )
}