export class Entry {
    id: string
    title: string
    description: string
    isCompleted?: boolean


    constructor(id: string, title: string, description: string, isCompleted = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isCompleted = isCompleted
    }
}
