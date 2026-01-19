import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  usuario = '';
  clave = '';
  error = false;

  constructor(private auth: AuthService, private router: Router) {}

  ingresar() {
    const valido = this.auth.login(this.usuario, this.clave);

    if (valido) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = true;
    }
  }
}
