import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(username: string, password: string): boolean {
    // credenciales simuladas (luego puedes conectar BD)
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('sesion', 'activa');
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('sesion');
  }

  isLogged(): boolean {
    return localStorage.getItem('sesion') === 'activa';
  }
}
