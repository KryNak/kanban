export { Board, Column, Task, Subtask, CreateBoardRequestDto, ColumnDto, UpdateBoardRequestDto, UpdateSubtaskRequestDto, CreateTaskRequestDto }

class Board {

    id: string
    name: string
    columns: Column[]

    constructor(id: string, name: string, columns: Column[]){
        this.id = id
        this.name = name
        this.columns = columns
    }

}

class Column {

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

class Task {

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

class Subtask {

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

class ColumnDto {

    name: string
    position: number

    constructor(name: string, position: number) {
        this.name = name
        this.position = position
    }

}

class CreateBoardRequestDto {

    name: string
    columns: ColumnDto[]

    constructor(name: string, columns: ColumnDto[]) {
        this.name = name
        this.columns = columns
    }

}

class UpdateBoardRequestDto {

    id: string
    name: string
    columns: Column[]

    constructor(id: string, name: string, columns: Column[]) {
        this.id = id
        this.name = name
        this.columns = columns
    }

}

class UpdateSubtaskRequestDto {

    id: string
    isCompleted: boolean
    taskId: string

    constructor(id: string, isCompleted: boolean, taskId: string) {
        this.id = id
        this.isCompleted = isCompleted
        this.taskId = taskId
    }

}

class CreateTaskRequestDto {

    id: string
    title: String
    description: String
    status: String
    position: number

    constructor(id: string, title: string, description: string, status: string, position: number){
        this.id = id
        this.title = title
        this.description = description
        this.status = status
        this.position = position
    }

}