import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuarios';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  filtro = '';
  mostrarAgregar = false;
  editando: Usuario | null = null;

  nuevo: Usuario = {
    id: 0,
    nombres: '',
    apellidos: '',
    correo: '',
    rol: 'Autor',
    estado: 'Activo'
  };

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.usuarios = this.usuariosService.obtenerUsuarios();
  }

  get usuariosFiltrados() {
    if (!this.filtro) return this.usuarios;
    return this.usuarios.filter(u =>
      Object.values(u).join(' ').toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  agregar() {
    if (!this.validarUsuario(this.nuevo)) return;

    const nuevoUsuario: Usuario = {
      ...this.nuevo,
      id: this.usuarios.length
        ? Math.max(...this.usuarios.map(u => u.id)) + 1
        : 1
    };

    this.usuariosService.agregarUsuario(nuevoUsuario);
    this.usuarios = this.usuariosService.obtenerUsuarios();

    this.nuevo = {
      id: 0,
      nombres: '',
      apellidos: '',
      correo: '',
      rol: 'Autor',
      estado: 'Activo'
    };

    this.mostrarAgregar = false;
  }

  eliminar(id: number) {
    this.usuariosService.eliminarUsuario(id);
    this.usuarios = this.usuariosService.obtenerUsuarios();
  }

  editar(u: Usuario) {
    this.editando = { ...u };
  }

  guardarEdicion() {
    if (!this.editando) return;
    if (!this.validarUsuario(this.editando)) return;

    this.usuariosService.actualizarUsuario(this.editando);
    this.usuarios = this.usuariosService.obtenerUsuarios();
    this.editando = null;
  }

  validarUsuario(u: Usuario): boolean {

    if (!u.nombres || !/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(u.nombres)) {
      alert("Nombres inválidos.");
      return false;
    }

    if (!u.apellidos || !/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(u.apellidos)) {
      alert("Apellidos inválidos.");
      return false;
    }

    if (!u.correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u.correo)) {
      alert("Correo inválido.");
      return false;
    }

    if (!u.rol) {
      alert("Seleccione un rol.");
      return false;
    }

    if (!u.estado) {
      alert("Seleccione estado.");
      return false;
    }

    return true;
  }
}
