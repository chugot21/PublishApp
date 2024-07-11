import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserLogin, UserRegister, UserStorage} from "../models/UserModel";
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {RegisterComponent} from "../register/register.component";
import {StorageService} from "../storage.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  message: string = 'Vous etes deconnecte.';

  user = new UserLogin();

  constructor(
      private authService: AuthService,
      private router: Router,
      private dialog: MatDialog,
      private storage: StorageService,
  ) {}

  ngOnInit() {

  }

  login(user: UserLogin) {
    this.authService.login(user).subscribe((userData: UserStorage) => {
      if (userData.token) {
        this.message = 'Vous etes connecte.';
        this.storage.saveData(userData.token, userData.id);
        //localStorage.setItem('authToken', token);
        this.router.navigate(['/Post']);
      } else {
        this.message = 'Identifiant ou mot de passe incorrect.';
        this.router.navigate(['/user/login']);
      }
    });
  }

  registerDialog() {
    //init les valeurs du user ?
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; //si on clique a l'exterieur de la fenetre ou esc -> sort de la fenetre
    dialogConfig.autoFocus = true; //focus sur le premier element de la fenetre.
    dialogConfig.width = "60%"; //<<<<<< modif

    // dialogConfig.data = {
    //   id: 1,
    //   title: 'Angular For Beginners'
    // };

    this.dialog.open(RegisterComponent, dialogConfig);

    // const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(
    //     data => console.log("Dialog output:", data)
    // );
  }
}
