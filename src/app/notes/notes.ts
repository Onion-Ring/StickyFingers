import { Component } from '@angular/core';
import { NewNote } from "./new-note/new-note";
import { NoteList } from './note-list/note-list';

@Component({
  selector: 'app-notes',
  imports: [NewNote,NoteList],
  standalone:true,
  templateUrl: './notes.html',
  styleUrl: './notes.css'
})
export class Notes {

}
