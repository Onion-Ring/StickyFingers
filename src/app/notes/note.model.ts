import { type Priority } from "./priority"

export interface Note {
    id:number,
    title:string,
    description:string,
    priority: Priority,
    category:string
}