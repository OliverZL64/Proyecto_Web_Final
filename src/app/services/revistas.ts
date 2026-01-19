import { Injectable } from '@angular/core';
import { Revista } from '../models/revista';

@Injectable({
  providedIn: 'root'
})
export class RevistasService {

  private STORAGE_KEY = 'revistas_uleam';

  constructor() {}

  obtenerRevistas(): Revista[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  guardarRevistas(revistas: Revista[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(revistas));
  }

  agregarRevista(revista: Revista) {
    const revistas = this.obtenerRevistas();
    revistas.push(revista);
    this.guardarRevistas(revistas);
  }

  eliminarRevista(id: number) {
    const revistas = this.obtenerRevistas().filter(r => r.id !== id);
    this.guardarRevistas(revistas);
  }

  actualizarRevista(revistaActualizada: Revista) {
    const revistas = this.obtenerRevistas().map(r =>
      r.id === revistaActualizada.id ? revistaActualizada : r
    );
    this.guardarRevistas(revistas);
  }
}
