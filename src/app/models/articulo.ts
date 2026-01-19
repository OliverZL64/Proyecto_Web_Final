export interface Articulo {
  id: number;
  titulo: string;
  autores: string;
  resumen: string;
  palabrasClave: string;
  pdf: string; // base64
  estado: string;
}
