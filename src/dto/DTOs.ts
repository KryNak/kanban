export { Board, Column, Task, Subtask }

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

    name: string
    tasks: Task[]

    constructor(name: string, tasks: Task[]){
        this.name = name
        this.tasks = tasks
    }

}

class Task {

    id: string
    title: string
    status: string
    description: string
    subtasks: Subtask[]

    constructor(id: string, title: string, status: string, description: string, subtasks: Subtask[]) {
        this.id = id
        this.title = title
        this.status = status
        this.description = description
        this.subtasks = subtasks
    }

}

class Subtask {

    id: string
    isCompleted: boolean
    title: string

    constructor(id: string, isCompleted: boolean, title: string) {
        this.id = id
        this.isCompleted = isCompleted
        this.title = title
    }

}