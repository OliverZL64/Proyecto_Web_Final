import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private STORAGE_KEY = 'usuarios_uleam';

  obtenerUsuarios(): Usuario[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  guardarUsuarios(lista: Usuario[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lista));
  }

  agregarUsuario(usuario: Usuario) {
    const lista = this.obtenerUsuarios();
    lista.push(usuario);
    this.guardarUsuarios(lista);
  }

  eliminarUsuario(id: number) {
    const lista = this.obtenerUsuarios().filter(u => u.id !== id);
    this.guardarUsuarios(lista);
  }

  actualizarUsuario(usuarioActualizado: Usuario) {
    const lista = this.obtenerUsuarios().map(u =>
      u.id === usuarioActualizado.id ? usuarioActualizado : u
    );
    this.guardarUsuarios(lista);
  }
}
