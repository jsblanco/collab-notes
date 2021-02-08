import {Entry} from "./Entry";
import {Adapter} from "../AdapterInt";

export class EntryAdapter implements Adapter<Entry> {

    adapt(item: any): Entry {
        return new Entry(item.id, item.title, item.description, item.isCompleted)
    }

}
