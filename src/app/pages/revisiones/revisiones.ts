import { Component, OnInit } from '@angular/core';
import { Revision } from '../../models/revision';
import { RevisionesService } from '../../services/revisiones';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-revisiones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './revisiones.html',
  styleUrls: ['./revisiones.css']
})
export class RevisionesComponent implements OnInit {

  lista: Revision[] = [];
  filtro = '';
  mostrarAgregar = false;
  editando: Revision | null = null;

  nuevo: Revision = {
    id: 0,
    articulo: '',
    revisor: '',
    calificacion: 0,
    fecha: ''
  };

  constructor(private service: RevisionesService) {}

  ngOnInit() {
    this.lista = this.service.obtener();
  }

  get filtradas() {
    if (!this.filtro) return this.lista;
    return this.lista.filter(r =>
      Object.values(r).join(' ').toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  agregar() {
    if (!this.validar(this.nuevo)) return;

    const rev: Revision = {
      ...this.nuevo,
      id: this.lista.length
        ? Math.max(...this.lista.map(r => r.id)) + 1
        : 1
    };

    this.service.agregar(rev);
    this.lista = this.service.obtener();

    this.nuevo = { id:0, articulo:'', revisor:'', calificacion:0, fecha:'' };
    this.mostrarAgregar = false;
  }

  editar(r: Revision) {
    this.editando = { ...r };
  }

  guardarEdicion() {
    if (!this.editando || !this.validar(this.editando)) return;
    this.service.actualizar(this.editando);
    this.lista = this.service.obtener();
    this.editando = null;
  }

  eliminar(id:number) {
    if(!confirm("¿Eliminar revisión?")) return;
    this.service.eliminar(id);
    this.lista = this.service.obtener();
  }

  validar(r: Revision): boolean {

    if (!r.articulo || r.articulo.length < 3) {
      alert("Artículo inválido.");
      return false;
    }

    if (!r.revisor || !/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(r.revisor)) {
      alert("Nombre de revisor inválido.");
      return false;
    }

    if (r.calificacion < 1 || r.calificacion > 10) {
      alert("Calificación debe ser entre 1 y 10.");
      return false;
    }

    if (!r.fecha) {
      alert("Seleccione fecha.");
      return false;
    }

    return true;
  }
}
