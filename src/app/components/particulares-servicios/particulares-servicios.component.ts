import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/servicios.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-particulares-servicios',
  templateUrl: './particulares-servicios.component.html',
  styleUrls: ['./particulares-servicios.component.scss'],
  providers: [ServicioService],
})
export class ParticularesServiciosComponent implements OnInit {
  public url;
  public servicios;
  constructor(private _seriviciosService: ServicioService) {
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getArticulosByParticular();
  }

  getArticulosByParticular() {
    this._seriviciosService.getServiciosByRole().subscribe(
      (response) => {
        if (response.status == 'success') {
          this.servicios = response.Servicios;
          console.log(this.servicios);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
