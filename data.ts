export {Todo, ProgressColumn}

class Todo {

    name: string
    subtasksAmount: number
    subtasksCompleted: number

    constructor(name: string, subtasksAmount: number, subtasksCompleted: number) {
        this.name = name
        this.subtasksAmount = subtasksAmount
        this.subtasksCompleted = subtasksCompleted
    }

}

class ProgressColumn {

    name: string
    tasks: Todo[]

    constructor(name: string, tasks: Todo[]) {
        this.name = name
        this.tasks = tasks
    }

    getMocketProgressColumns(): ProgressColumn[] {
        return [
            new ProgressColumn(
                'Todo (4)',
                [
                    new Todo('Build UI for onboarding flow', 3, 0),
                    new Todo('Build UI for search', 1, 0),
                    new Todo('Build settings UI', 2, 0),
                    new Todo('QA and test all mayor users journeys', 2, 0)
                ]
            ),
            new ProgressColumn(
                'Doing (6)',
                [
                    new Todo('Design settings and search pages', 3, 1),
                    new Todo('Add account management enpoints', 3, 2),
                    new Todo('Design onboarding flow', 3, 1),
                    new Todo('Add search enpoints', 2, 1),
                    new Todo('Add authentication enpoint', 2, 1),
                    new Todo('Reasearch pricing points of various competitors and trail different business models', 3, 1)
                ]
            ),
            new ProgressColumn(
                'Done (7)',
                [
                    new Todo('Conduct 5 wireframe tests', 1, 1),
                    new Todo('Create wireframe prototype', 1, 1),
                    new Todo('Review results of usabillity tests and iterate', 3, 2),
                    new Todo('Create paper prototypes and conduct 10 usabillity tests with potential customers', 2, 2),
                    new Todo('Market discovery', 1, 1),
                    new Todo('Competitor analysis', 2, 2),
                    new Todo('Reasearch the market', 2, 2)
                ]
            )
        ]
    }

}