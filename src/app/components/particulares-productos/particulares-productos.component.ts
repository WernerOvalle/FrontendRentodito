import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../services/articulos.service';
import { global } from '../../services/global';
import Swal from 'sweetalert2';
import * as jQuery from 'jquery';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-particulares-productos',
  templateUrl: './particulares-productos.component.html',
  styleUrls: ['./particulares-productos.component.scss'],
  providers: [ArticuloService, UserService,CategoryService],
})
export class ParticularesProductosComponent implements OnInit {
  public url;
  public categories;
  public token;
  public menu;
  public articulos2;
  public cliente;
  public categoriaid;
  constructor(
    private _categoryService: CategoryService,
    private _articuloService: ArticuloService,
    private _userService: UserService
  ) {
    this.url = global.url;
    this.token = this._userService.getToken();
    this.cliente = this._userService.getIdentity();
  }

  ngOnInit(): void {

    jQuery('#menu-toggle').click(function (e) {
      e.preventDefault();
      jQuery('#wrapper').toggleClass('toggled');
    });
    this.getCategories();

  }
  getCategories() {
    this._categoryService.getCategories().subscribe(
      (response) => {
        if (response.status == 'success') {
          this.categories = response.categories;
          //console.log(this.categories)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  clickAddTodo(id) {
    //console.log(id)
    this.menu = 1;
    this.categoriaid=id;
    this._articuloService.getArticulosByParticular().subscribe(
      (response) => {
        if (response.status == 'success') {
          this.articulos2 = response.Articulos;
          console.log(this.articulos2);
        }
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
    if (articuloReserva.tienda_id == null) {
      delete articuloReserva.tienda_id;
    }
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
        //console.log(art);
        articuloReserva.cliente =
          that.cliente.sub +
          ' - ' +
          that.cliente.name +
          ' ' +
          that.cliente.surname;
        that._articuloService
          .udpate(that.token, articuloReserva, articuloReserva.id)
          .subscribe(
            (response) => {
              if (response.status == 'success') {
                //this.Articulo = response.changes;

                Swal.fire({
                  title: 'La reserva se ha realizado exitosamente!',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                }).then(function () {});
                that.clickAddTodo(articuloReserva.categoria_id);
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
