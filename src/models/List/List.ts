export class List {
    id: string
    title: string
    entries: string[]

    constructor(id: string, title: string, entries: string[] = []) {
        this.id = id;
        this.title = title;
        this.entries = entries;
    }
}
