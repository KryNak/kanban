export {Task, ProgressColumn, Subtask}

class Subtask {

    description: string
    checked: boolean

    constructor(description: string, checked: boolean) {
        this.description = description
        this.checked = checked
    }

}

class Task {

    name: string
    subtasks: Subtask[]
    description: string

    constructor(name: string, subtasks: Subtask[], description: string) {
        this.name = name
        this.subtasks = subtasks
        this.description = description
    }

}

class ProgressColumn {

    name: string
    subtasks: Task[]
    color: string

    constructor(name: string, tasks: Task[], color: string) {
        this.name = name
        this.subtasks = tasks
        this.color = color
    }

    static getMocketProgressColumns(): ProgressColumn[] {
        return [
            new ProgressColumn(
                'Todo (4)',
                [
                    new Task('Build UI for onboarding flow', [new Subtask('Sign up page', false), new Subtask('Sign in page', false), new Subtask('Welcome page', false)], "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition."),
                    new Task('Build UI for search', [], ''),
                    new Task('Build settings UI', [], ''),
                    new Task('QA and test all mayor users journeys', [], '')
                ],
                'red'
            ),
            new ProgressColumn(
                'Doing (6)',
                [
                    new Task('Design settings and search pages', [], ''),
                    new Task('Add account management enpoints', [], ''),
                    new Task('Design onboarding flow', [], ''),
                    new Task('Add search enpoints', [], ''),
                    new Task('Add authentication enpoint', [], ''),
                    new Task('Reasearch pricing points of various competitors and trail different business models', [], '')
                ],
                'blue'
            ),
            new ProgressColumn(
                'Done (7)',
                [
                    new Task('Conduct 5 wireframe tests', [], ''),
                    new Task('Create wireframe prototype', [], ''),
                    new Task('Review results of usabillity tests and iterate', [], ''),
                    new Task('Create paper prototypes and conduct 10 usabillity tests with potential customers', [], ''),
                    new Task('Market discovery', [], ''),
                    new Task('Competitor analysis', [], ''),
                    new Task('Reasearch the market', [], '')
                ],
                'green'
            )
        ]
    }

}