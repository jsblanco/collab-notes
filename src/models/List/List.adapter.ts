import {List} from "./List";
import {Adapter} from "../AdapterInt";

export class ListAdapter implements Adapter<List> {

    adapt(item: any): List {
        return new List(item.id, item.title, item.entries)
    }

}
