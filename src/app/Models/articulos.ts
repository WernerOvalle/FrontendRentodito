export class Articulo {
  constructor(
    public id: number,
    public user_id: number,
    public tienda_id: number,
    public categoria_id: number,
    public apartado: number,
    public fecha_apartado: string,
    public title: string,
    public content: string,
    public image:string,
    public cratedAt: any
    ) {}
}
