import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
  JsonpClientBackend,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/categorias';
import { global } from './global';

@Injectable()
export class CategoryService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  create(token, category):Observable<any> {
    let json = JSON.stringify(category);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
      return this._http.post(this.url + 'category', params, { headers: headers });

  }

  getCategories():Observable<any> {

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.url + 'category',  { headers: headers });

  }
  getArticulosById(id):Observable<any> {

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.url + 'articulos/categoria/'+id,  { headers: headers });

  }

  udpate(token, category, id):Observable<any> {

    let json = JSON.stringify(category);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
      return this._http.put(this.url + 'category/'+id, params, { headers: headers });

  }

  delete(token,id):Observable<any> {

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);;
      return this._http.delete(this.url + 'category/'+id,  { headers: headers });

  }
}
