import { Component, signal } from '@angular/core';
import { NewNoteModal } from './new-note-modal/new-note-modal';

@Component({
  selector: 'app-new-note',
  imports: [NewNoteModal],
  standalone: true,
  templateUrl: './new-note.html',
  styleUrl: './new-note.css'
})
export class NewNote {

  newNoteSectionOpened = signal<boolean>(true);
  newNoteModalOpened = signal<boolean>(false);

  onOpenNewNoteModal(){
    this.newNoteModalOpened.set(true);
  }  

  onCloseNewNoteModal(){
    this.newNoteModalOpened.set(false);
  }

  onCloseSection(){
    this.newNoteSectionOpened.set(false);
  }
  
  onOpenSection(){
    this.newNoteSectionOpened.set(true);
  }
}
