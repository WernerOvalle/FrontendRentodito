export class User {
  constructor(
    public id: number,
    public user_id: number,
    public tienda_id: number,
    public categorias_id: number,
    public title: string,
    public content: string,
    public image:string,
    public cratedAt: any
    ) {}
}
