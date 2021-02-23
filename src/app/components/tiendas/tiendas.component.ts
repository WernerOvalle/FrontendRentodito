import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as jQuery from 'jquery';
import { ArticuloService } from '../../services/articulos.service';
import { global } from '../../services/global';
import { TiendasService } from '../../services/tiendas.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.scss'],
  providers: [TiendasService,ArticuloService,UserService],
})
export class TiendasComponent implements OnInit {
  public tiendas;
  public articulos;
  public detalle;
  public url;
  public estados;
  public cliente;
  public menu = 0;
  public token;
  constructor(private _tiendaService: TiendasService,private _arituclosService: ArticuloService,  private _userService: UserService) {
    this.url = global.url;  this.cliente = this._userService.getIdentity();    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    jQuery('#menu-toggle').click(function (e) {
      e.preventDefault();
      jQuery('#wrapper').toggleClass('toggled');
    });
    this.getTiendas();
    this.getEstados();
  }
  getTiendas() {
    this._tiendaService.getTiendas().subscribe(
      (response) => {
        if (response.status == 'success') {
          this.tiendas = response.Tiendas;
          //console.log(this.categories)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getEstados() {
    this._tiendaService.getEstados().subscribe(
      (response) => {
        if (response.status == 'success') {
          this.estados = response.Tiendas;
          //console.log(this.categories)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  clickAddTodo(id) {
    this.menu = 1;

    //oetucuib ajax
    this._tiendaService.getTiendasByEstado(id).subscribe(
      (response) => {
        this.detalle = response.Tiendas;
        //console.log(this.tiendas);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  verArticulos(id) {
    this.menu = 2;

    //oetucuib ajax
    this._tiendaService.getArticulosByTienda(id).subscribe(
      (response) => {
        this.articulos = response.articulos;
        //console.log(this.tiendas);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  reservar(art) {
    let articuloReserva = JSON.parse(JSON.stringify(art));
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
        ' <input class="form-control" type="date"   id="exampleinputdate"' +
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
        //console.log(art);
        articuloReserva.cliente = that.cliente.sub+' - '+that.cliente.name+' '+that.cliente.surname;
        that._arituclosService.udpate(that.token, articuloReserva, articuloReserva.id).subscribe(
          (response) => {
            if (response.status == 'success') {
              //this.Articulo = response.changes;

              Swal.fire({
                title: 'La reserva se ha realizado exitosamente!',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              }).then(function () {});
              that.verArticulos(articuloReserva.tienda_id);
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
              text: 'verifique la fecha',
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
