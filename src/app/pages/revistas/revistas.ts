import { Component, OnInit } from '@angular/core';
import { RevistasService } from '../../services/revistas';
import { Revista } from '../../models/revista';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-revistas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './revistas.html',
  styleUrls: ['./revistas.css']
})
export class RevistasComponent implements OnInit {

  revistas: Revista[] = [];
  filtro = '';
  mostrarAgregar = false;

  nueva: Revista = {
    id: 0,
    titulo: '',
    issn: '',
    categoria: '',
    anio: new Date().getFullYear(),
    autores: '',
    estado: 'Activa'
  };

  editando: Revista | null = null;

  constructor(private revistasService: RevistasService) {}

  ngOnInit() {
    this.revistas = this.revistasService.obtenerRevistas();
  }

  get revistasFiltradas() {
    if (!this.filtro) return this.revistas;
    return this.revistas.filter(r =>
      Object.values(r).join(' ').toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  agregar() {

    if (!this.validarRevista(this.nueva)) return;

    const nuevaRevista: Revista = {
      ...this.nueva,
      id: this.revistas.length
        ? Math.max(...this.revistas.map(r => r.id)) + 1
        : 1
    };

    this.revistasService.agregarRevista(nuevaRevista);
    this.revistas = this.revistasService.obtenerRevistas();

    // Reset limpio obligatorio con todos los campos
    this.nueva = {
      id: 0,
      titulo: '',
      issn: '',
      categoria: '',
      anio: new Date().getFullYear(),
      autores: '',
      estado: 'Activa'
    };
  }

  eliminar(id: number) {
    this.revistasService.eliminarRevista(id);
    this.revistas = this.revistasService.obtenerRevistas();
  }

  editar(r: Revista) {
    this.editando = { ...r };
  }

  guardarEdicion() {
    if (!this.editando) return;

    if (!this.validarRevista(this.editando)) return;

    this.revistasService.actualizarRevista(this.editando);
    this.revistas = this.revistasService.obtenerRevistas();
    this.editando = null;
  }

  validarRevista(r: Revista): boolean {

    if (!r.titulo || !/^[A-Za-zÁÉÍÓÚÑáéíóúñ0-9\s]+$/.test(r.titulo)) {
      alert("El título solo debe contener letras y números.");
      return false;
    }

    if (!r.issn || !/^[0-9]{4}-[0-9]{4}$/.test(r.issn)) {
      alert("El ISSN debe tener el formato 1234-5678.");
      return false;
    }

    if (!r.categoria || !/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(r.categoria)) {
      alert("La categoría solo debe contener letras.");
      return false;
    }

    if (!r.anio || r.anio < 1900 || r.anio > new Date().getFullYear()) {
      alert("Ingrese un año válido.");
      return false;
    }

    if (!r.autores || r.autores.trim().length < 3) {
      alert("Ingrese autores válidos.");
      return false;
    }

    if (!r.estado) {
      alert("Seleccione un estado.");
      return false;
    }

    return true;
  }
}
