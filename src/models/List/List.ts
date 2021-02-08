export class List {
    id: string
    title: string
    pendingTasks: string[]
    completedTasks: string[]

    constructor(id: string, title: string,) {
        this.id = id;
        this.title = title;
        this.pendingTasks = [];
        this.completedTasks = [];
    }
}
