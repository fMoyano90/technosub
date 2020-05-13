export class Producto {
  constructor(
    public id: number,
    public codigo: string,
    public nombre: string,
    public d_breve: string,
    public descripcion: string,
    public imagen: string,
    public categoria: string
  ) {}
}
