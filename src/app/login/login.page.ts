import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  user = {
    usuario: "",
    password: ""
  };

  constructor(private router: Router) {}

  ngOnInit() {
  }

  ingresar() {
    let navigationExtras: NavigationExtras = {
      state: {
      user: this.user
      }
    };  

    this.router.navigate(["/home"], navigationExtras);
  }

}
