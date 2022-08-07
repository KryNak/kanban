export class Board {

    id: string
    name: string
    columns: Column[]

    constructor(id: string, name: string, columns: Column[]){
        this.id = id
        this.name = name
        this.columns = columns
    }

}

export class Column {

    id: string
    name: string
    tasks: Task[]
    position?: number

    constructor(id: string, name: string, tasks: Task[], position?: number){
        this.name = name
        this.tasks = tasks
        this.id = id
        this.position = position
    }

}

export class Task {

    id: string
    title: string
    status: string
    description: string
    subtasks: Subtask[]
    position?: number

    constructor(id: string, title: string, status: string, description: string, subtasks: Subtask[], position?: number) {
        this.id = id
        this.title = title
        this.status = status
        this.description = description
        this.subtasks = subtasks
        this.position = position
    }

}

export class Subtask {

    id: string
    isCompleted: boolean
    title: string
    position: number

    constructor(id: string, isCompleted: boolean, title: string, position: number) {
        this.id = id
        this.isCompleted = isCompleted
        this.title = title
        this.position = position
    }

}

export class ColumnDto {

    name: string
    position: number

    constructor(name: string, position: number) {
        this.name = name
        this.position = position
    }

}

export class CreateBoardRequestDto {

    name: string
    columns: ColumnDto[]

    constructor(name: string, columns: ColumnDto[]) {
        this.name = name
        this.columns = columns
    }

}

export class UpdateBoardRequestDto {

    id: string
    name: string
    columns: Column[]

    constructor(id: string, name: string, columns: Column[]) {
        this.id = id
        this.name = name
        this.columns = columns
    }

}

export class UpdateSubtaskRequestDto {

    id: string
    isCompleted: boolean
    taskId: string

    constructor(id: string, isCompleted: boolean, taskId: string) {
        this.id = id
        this.isCompleted = isCompleted
        this.taskId = taskId
    }

}

export class CreateTaskRequestDto {

    title: String
    description: String
    status: String
    subtasks: CreateTaskSubtaskRequestDto[]

    constructor(title: string, description: string, status: string, subtasks: CreateTaskSubtaskRequestDto[]){
        this.title = title
        this.description = description
        this.status = status
        this.subtasks = subtasks
    }

}

export class CreateTaskSubtaskRequestDto {

    title: string
    position: number

    constructor(title: string, position: number) {
        this.title = title
        this.position = position
    }

}
 
export class UpdateTaskRequestDto {

    id: string
    title: string
    position: number
    columnId: string
    subtasks: UpdateTaskSubtaskRequestDto[]

    constructor(id: string, title: string, position: number, columnId: string, subtasks: UpdateTaskSubtaskRequestDto[]) {
        this.id = id
        this.title = title
        this.position = position
        this.columnId = columnId
        this.subtasks = subtasks
    }


}

export class UpdateTaskSubtaskRequestDto {

    id: string
    title: string
    position: number

    constructor(id: string, title: string, position: number) {
        this.id = id
        this.title = title
        this.position = position
    }

}