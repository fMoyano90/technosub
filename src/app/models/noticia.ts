export class Noticia {
  constructor(
    public id: number,
    public titulo: string,
    public t_breve: string,
    public cuerpo: string,
    public autor: string,
    public imagen: string,
    public categoria: string,
    public prioridad: string,
    public created_at?: Date
  ) {}
}
