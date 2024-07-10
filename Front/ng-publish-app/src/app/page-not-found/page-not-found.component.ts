import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
      RouterLink,
  ],
  template: `
    <div class='center'>
      <img src="" alt="404 Not Found"/>
      <h1>Hey, cette page n'existe pas !</h1>
      <a routerLink="/Post" class="waves-effect waves-teal btn-flat">
        Retourner à la page des posts.
      </a>
    </div>
  `,
})
export class PageNotFoundComponent {
}
