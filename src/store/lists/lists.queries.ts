import {axiosInstance} from '../api/axios';
import {DummyLists} from "../../../data/DummyData";
import {List} from "../../models/List/List";

export const fetchLists = (): List[] => {
    return DummyLists;
}
