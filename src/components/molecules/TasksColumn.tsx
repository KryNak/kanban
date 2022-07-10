import React from 'react'
import {ProgressColumn, Todo} from '../../data'
import { ColumnHeader } from './TasksColumnHeader'
import { TodoCardList } from './TaskCardList'
export {BoardColumn}

type BoardColumnProps = {
    darkMode: boolean,
    name: string,
    tasks: Todo[],
    color: string,
    style?: React.CSSProperties
}

function BoardColumn({name, tasks, darkMode, color, style}: BoardColumnProps): React.ReactElement {

    const styles: {[name: string]: React.CSSProperties} = {
        column: {
            paddingBottom: '50px'
        }
    }

    return (
        <div style={{...styles.column, ...style}}>
            <ColumnHeader color={color}>{name}</ColumnHeader>
            <TodoCardList darkMode={darkMode} tasks={tasks}></TodoCardList>
        </div>
    )
}