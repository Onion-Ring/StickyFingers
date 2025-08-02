import { Component, input } from '@angular/core';
import { NoteModel } from '../note.model';

@Component({
  selector: 'app-note',
  imports: [],
  templateUrl: './note.html',
  styleUrl: './note.css'
})
export class Note {


  note = input.required<NoteModel>();


}
