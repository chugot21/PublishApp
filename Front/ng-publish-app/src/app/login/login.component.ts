import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  message: string = 'Vous etes deconnecte. (pikachu/pikachu)';
  name: string;
  password: string;
  auth: AuthService;

  constructor(
      private authService: AuthService,
      private router: Router,
  ) {
  }

  ngOnInit() {
    this.auth = this.authService;
  }

  setMessage(): void {
    if(this.auth.isLoggedIn) {
      this.message = 'Vous etes connecte';
    } else {
      this.message = 'Identifiant ou mot de passe incorrect.';
    }
  }

  login(): void {
    this.message = 'Tentative de connexion en cours...';
    this.auth.login(this.name, this.password)
        .subscribe((isLoggedIn: boolean) => {
          this.setMessage();
          if(isLoggedIn){
            this.router.navigate(['/Post']);
          } else {
            this.password = '';
            this.router.navigate(['/user/login']);
          }
        })
  }

  logout(): void {
    this.auth.logout();
    this.message = 'Vous etes deconnecte.';
  }
}
