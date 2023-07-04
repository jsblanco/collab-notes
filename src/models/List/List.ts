import { Entry } from '../Entry/Entry';

export interface List {
    id: string
    icon: string
    title: string
    entries: Entry[]
}

export interface DbList {
    id: string
    icon: string
    title: string
    entries: string[]
}
