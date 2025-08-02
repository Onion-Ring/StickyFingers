import { type Priority } from "./priority"

export interface NoteModel {
    id:number,
    title:string,
    description:string,
    priority: Priority,
    category:string
}