import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../../services/articulos';
import { Articulo } from '../../models/articulo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articulos.html',
  styleUrls: ['./articulos.css']
})
export class ArticulosComponent implements OnInit {

  articulos: Articulo[] = [];
  filtro = '';
  mostrarAgregar = false;
  preview: any = null;

  nuevo: Articulo = {
    id: 0,
    titulo: '',
    autores: '',
    resumen: '',
    palabrasClave: '',
    pdf: '',
    estado: ''
  };

  editando: Articulo | null = null;

  constructor(private articulosService: ArticulosService) {}

  ngOnInit() {
    this.articulos = this.articulosService.obtenerArticulos();
  }

  get articulosFiltrados() {
    if (!this.filtro) return this.articulos;
    return this.articulos.filter(a =>
      Object.values(a).join(' ').toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  cargarPDF(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert("Solo se permiten archivos PDF.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result;
      this.nuevo.pdf = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  agregar() {

    if (!this.validarArticulo(this.nuevo)) return;

    const nuevoArticulo: Articulo = {
      ...this.nuevo,
      id: this.articulos.length
        ? Math.max(...this.articulos.map(a => a.id)) + 1
        : 1
    };

    this.articulosService.agregarArticulo(nuevoArticulo);
    this.articulos = this.articulosService.obtenerArticulos();

    this.nuevo = {
      id: 0,
      titulo: '',
      autores: '',
      resumen: '',
      palabrasClave: '',
      pdf: '',
      estado: ''
    };

    this.preview = null;
    this.mostrarAgregar = false;
  }

  eliminar(id: number) {
    this.articulosService.eliminarArticulo(id);
    this.articulos = this.articulosService.obtenerArticulos();
  }

  editar(a: Articulo) {
    this.editando = { ...a };
    this.preview = a.pdf;
  }

  guardarEdicion() {
    if (!this.editando) return;

    if (!this.validarArticulo(this.editando)) return;

    this.articulosService.actualizarArticulo(this.editando);
    this.articulos = this.articulosService.obtenerArticulos();
    this.editando = null;
    this.preview = null;
  }

  validarArticulo(a: Articulo): boolean {

    if (!a.titulo || a.titulo.trim().length < 5) {
      alert("El título debe tener al menos 5 caracteres.");
      return false;
    }

    if (!a.autores || a.autores.trim().length < 3) {
      alert("Ingrese autores válidos.");
      return false;
    }

    if (!a.resumen || a.resumen.trim().length < 10) {
      alert("El resumen es demasiado corto.");
      return false;
    }

    if (!a.palabrasClave || a.palabrasClave.split(',').length < 2) {
      alert("Ingrese al menos 2 palabras clave separadas por comas.");
      return false;
    }

    if (!a.estado) {
      alert("Seleccione un estado.");
      return false;
    }

    return true;
  }
}
