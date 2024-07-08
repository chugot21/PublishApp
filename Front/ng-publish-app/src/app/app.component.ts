import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
      RouterOutlet,
      RouterLink,
  ],
  template: `
    <nav>
      <div class="nav-wrapper teal">
        <a href="#" class="brand-logo center">
          Publish App
        </a>
      </div>
    </nav>

    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
