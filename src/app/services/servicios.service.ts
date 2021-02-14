import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
  JsonpClientBackend,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicios';
import { global } from './global';

@Injectable()
export class ServicioService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  create(token, servicio):Observable<any> {
    let json = JSON.stringify(servicio);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
      return this._http.post(this.url + 'servicios', params, { headers: headers });

  }

  getServicios():Observable<any> {

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.url + 'servicios',  { headers: headers });

  }

  getServiciosByRole():Observable<any> {

    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.get(this.url + 'servicios/role/1',  { headers: headers });

  }
}
