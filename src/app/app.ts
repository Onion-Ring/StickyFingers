import { Component } from '@angular/core';
import { Header } from "./header/header";
import { AuthorInfo } from './author-info/author-info';
import { Notes } from './notes/notes';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, AuthorInfo, Notes],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'StickyFingers';
}

