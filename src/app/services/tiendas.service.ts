import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
  JsonpClientBackend,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tienda } from '../models/tiendas';
import { global } from './global';

@Injectable()
export class TiendasService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  create(token, tiendas):Observable<any> {
    let json = JSON.stringify(tiendas);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
      return this._http.post(this.url + 'tiendas', params, { headers: headers });

  }

  getTiendas():Observable<any> {

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.url + 'tiendas',  { headers: headers });

  }



  getEstados():Observable<any> {

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.url + 'estado/tiendas',  { headers: headers });

  }
  getTiendasByUser(id):Observable<any> {

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
    let url2;

    if(id==null){
     url2='tiendas'
    }else{
     url2 ='tiendas/'+id;
    }
console.log(url2)
      return this._http.get(this.url + url2,  { headers: headers });

  }
  getTiendasById(id):Observable<any> {

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.url + 'tiendas/'+id,  { headers: headers });

  }
  getTiendasByEstado(id):Observable<any> {

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.url + 'tiendasbyestado/'+id,  { headers: headers });

  }
  getArticulosByTienda(id):Observable<any> {

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.url + 'articulo/tienda/'+id,  { headers: headers });

  }
  udpate(token, tienda, id):Observable<any> {

    let json = JSON.stringify(tienda);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
      return this._http.put(this.url + 'tiendas/'+id, params, { headers: headers });

  }

  delete(token,id):Observable<any> {

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);;
      return this._http.delete(this.url + 'tiendas/'+id,  { headers: headers });

  }
}
