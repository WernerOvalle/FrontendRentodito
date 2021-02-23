import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticuloService } from '../../services/articulos.service';
import { ServicioService } from '../../services/servicios.service';
import { Articulo } from '../../models/articulos';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import * as jQuery from 'jquery';
import { global } from '../../services/global';
@Component({
  selector: 'app-listado-busqueda',
  templateUrl: './listado-busqueda.component.html',
  styleUrls: ['./listado-busqueda.component.scss'],
  providers: [ArticuloService,ServicioService],
})
export class ListadoBusquedaComponent implements OnInit {
public articulos;
public Servicios;
public url;
public token;
public cliente;
  constructor(
    private _route: ActivatedRoute,
    private _articuloService: ArticuloService,
    private _servicioService: ServicioService,
    private _router: Router,
    private _userService: UserService


  ) {
    this.url = global.url;
    this.token = this._userService.getToken();
    this.cliente = this._userService.getIdentity();
   }

  ngOnInit(): void { this.getArticulos(); this.getServicios(); //console.log(this.cliente.sub)
  }
 getArticulos() {
    this._route.params.subscribe((params) => {
     let id = params['name'];

     //console.log(id);
    // servicios/name/
      this._articuloService.getArticulosByName(id).subscribe(
        (response) => {
          this.articulos = response.Articulos;
        //  console.log(this.articulos);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  getServicios() {
    this._route.params.subscribe((params) => {
     let id = params['name'];

     //console.log(id);
    // servicios/name/
      this._servicioService.getServiciosByName(id).subscribe(
        (response) => {
          this.Servicios = response.Servicios;
        //  console.log(this.Servicios);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  reservar(art2) {
    let articuloReserva = JSON.parse(JSON.stringify(art2));
    delete articuloReserva.categorias;
    delete articuloReserva.tiendas;
    delete articuloReserva.user;

    let that = this;
    Swal.fire({
      title: '<strong>Ingrese la fecha que recogerá el producto</strong>',
      icon: 'info',
      html:
        '<div class="form-group row">' +
        '<label for="example-date-input" class="col-12 col-form-label">Esta fecha deberá cumplirla o perjudicará su récord como cliente: </label> ' +
        '<div class="col-12">' +
        ' <input class="form-control" type="date"   id="exampleinputdate">' +
        '</div>' +
        '</div>',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: 'Confirmar',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: 'Cancelar',
      cancelButtonAriaLabel: 'Thumbs down',
    }).then(function (isConfirm) {
      if (isConfirm.isConfirmed) {
        //console.log(isConfirm)

        articuloReserva.fecha_apartado = jQuery('#exampleinputdate').val();
        //console.log(art.fecha_apartado);
        articuloReserva.apartado = 1;

       articuloReserva.cliente = that.cliente.sub+' - '+that.cliente.name+' '+that.cliente.surname;
      // console.log(  articuloReserva);
        that._articuloService.udpate(that.token, articuloReserva, articuloReserva.id).subscribe(
          (response) => {
            if (response.status == 'success') {
              //this.Articulo = response.changes;

              Swal.fire({
                title: 'La reserva se ha realizado exitosamente!',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              }).then(function () {});
              that.getArticulos();
            } else {
              Swal.fire({
                title: 'Error al hacer la reserva',
                text: 'intente en otra oportunidad',
                icon: 'error',
                confirmButtonText: 'Aceptar',
              });
            }
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Verifique la fecha',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
            //console.log(<any>error);
          }
        );
      } else {
        //console.log(isConfirm)
      }
    });
  }
}
