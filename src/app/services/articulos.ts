import { Injectable } from '@angular/core';
import { Articulo } from '../models/articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  private STORAGE_KEY = 'articulos_uleam';

  constructor() {}

  obtenerArticulos(): Articulo[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  guardarArticulos(articulos: Articulo[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(articulos));
  }

  agregarArticulo(articulo: Articulo) {
    const articulos = this.obtenerArticulos();
    articulos.push(articulo);
    this.guardarArticulos(articulos);
  }

  eliminarArticulo(id: number) {
    const articulos = this.obtenerArticulos().filter(a => a.id !== id);
    this.guardarArticulos(articulos);
  }

  actualizarArticulo(articuloActualizado: Articulo) {
    const articulos = this.obtenerArticulos().map(a =>
      a.id === articuloActualizado.id ? articuloActualizado : a
    );
    this.guardarArticulos(articulos);
  }

  contarPorEstado() {
  const lista = this.obtenerArticulos();

  return {
    enviados: lista.filter(a => a.estado === 'Enviado').length,
    revision: lista.filter(a => a.estado === 'En revisión').length,
    aprobados: lista.filter(a => a.estado === 'Aprobado').length
  };
}
}
