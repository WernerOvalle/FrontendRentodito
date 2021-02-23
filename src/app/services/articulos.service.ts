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
export class ArticuloService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  create(token, articulo):Observable<any> {
    let json = JSON.stringify(articulo);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
      return this._http.post(this.url + 'articulos', params, { headers: headers });

  }

  getArticulos():Observable<any> {

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.url + 'articulos',  { headers: headers });

  }

  getArticulosByName(id):Observable<any> {

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.url + 'articulos/name/'+id,  { headers: headers });

  }

  getArticulosByParticular():Observable<any> {

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.url + 'articulos/persona/1',  { headers: headers });

  }


  udpate(token, articulo, id):Observable<any> {

    let json = JSON.stringify(articulo);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
      return this._http.put(this.url + 'articulos/'+id, params, { headers: headers });

  }

  delete(token,id):Observable<any> {

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);;
      return this._http.delete(this.url + 'articulos/'+id,  { headers: headers });

  }
}
