import { Injectable } from '@angular/core';
import { Revision } from '../models/revision';

@Injectable({
  providedIn: 'root'
})
export class RevisionesService {

  private STORAGE_KEY = 'revisiones_uleam';

  obtener(): Revision[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  guardar(lista: Revision[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lista));
  }

  agregar(rev: Revision) {
    const lista = this.obtener();
    lista.push(rev);
    this.guardar(lista);
  }

  eliminar(id: number) {
    const lista = this.obtener().filter(r => r.id !== id);
    this.guardar(lista);
  }

  actualizar(rev: Revision) {
    const lista = this.obtener().map(r =>
      r.id === rev.id ? rev : r
    );
    this.guardar(lista);
  }
}
