import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Servicio } from '../../models/servicios';
import { UserService } from '../../services/user.service';
import { ServicioService } from '../../services/servicios.service';
import Swal from 'sweetalert2';
import { global } from '../../services/global';

@Component({
  selector: 'app-servicios-new',
  templateUrl: './servicios-new.component.html',
  styleUrls: ['./servicios-new.component.scss'],
  providers: [UserService, ServicioService],
})
export class ServiciosNewComponent implements OnInit {


  public page_title: string;
  public identity;
  public validacion1;
  public token;
  public servicio: Servicio;
  public servicio2;
  public status: string;
public servicios;
public url;
public afuConfig1 = {
  multiple: false,
  formatsAllowed: '.jpg,.png, .gif, .jpeg',
  maxSize: '50',
  uploadAPI: {
    url: global.url + 'tiendas/upload',
       headers: {
        Authorization: this._userService.getToken()
      }
  },
  theme: 'attachPin',
  hideProgressBar: false,
  hideResetBtn: true,
  hideSelectBtn: false,
  replaceTexts: {
    attachPinBtn: 'Foto...',
  },
};
  constructor(  private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _servicioService: ServicioService) {
      this.page_title = 'Servicios';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.servicio = new Servicio(1, 1, '','','','');
    this.url = global.url ;
    }

  ngOnInit(): void {
    this.getServicios();
  }
  DocUpload1(datos) {
    //console.log(datos.body.image);

    /* let data = JSON.parse(datos.body);

   */ console.log(datos);
   if (datos.body.image) {
      this.servicio.image = datos.body.image;
      this.validacion1 = 1;
    }
    //console.log(this.identity)
  }
  onSubmit(form) {
  //  console.log(  this.tiendas);
  if (
    this.validacion1 == 1
  ) {
   this._servicioService.create(this.token, this.servicio).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.servicio = response.servicios;
          this.status = 'success';
          Swal.fire({
            title: 'Servicio Guardado Existosamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(function() {
         /*   window.location.reload();*/
        });

        } else {
          this.status = 'error';
          Swal.fire({
            title: 'Error al guardar Categoria',
            text: this.status,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      },
      (error) => {

        this.status = 'error';
        Swal.fire({
          title: <any>error,
          text: this.status,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        }
        );
        //console.log(<any>error);
      }
    );
  }else {
    Swal.fire({
      title: 'Error',
      text: 'Error debe adjuntar las imagenes son obligatorias ',
      icon: 'info',
      confirmButtonText: 'Aceptar',
    });
  }
}

getServicios(){
    this._servicioService.getServicios().subscribe(
      response=>{
        if(response.status=="success"){
          this.servicios =response.Servicios;
          //console.log(this.categories)
        }
      },
      error=>{
        console.log(error);
      }
    )
  }
  DocUpload2(datos) {
    //console.log(datos.body.image);

    /* let data = JSON.parse(datos.body);

   */// console.log(datos);
   if (datos.body.image) {
      this.servicio2.image = datos.body.image;

    }
    //console.log(this.identity)
  }
  actualizarModel(store) {
    this.servicio2 = JSON.parse(JSON.stringify(store));
    console.log(this.servicio2);
  }


  onSubmit2(form) {


   this._servicioService
      .udpate(this.token, this.servicio2, this.servicio2.id)
      .subscribe(
        (response) => {
          if (response.status == 'success') {
            //this.Articulo = response.changes;
            this.status = 'success';
            Swal.fire({
              title: 'Tienda Actualizado Existosamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            }).then(function () {});
            this.getServicios();
          } else {
            this.status = 'error';
            Swal.fire({
              title: 'Error al guardar Tienda',
              text: this.status,
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
        },
        (error) => {
          this.status = 'error';
          Swal.fire({
            title: <any>error,
            text: this.status,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          //console.log(<any>error);
        }
      );
  }

  eliminar(id) {
    Swal.fire({
      title: '¿Estas seguro de eliminar?',
      text: 'Tu no podras revertir esta accion luego de confirmar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._servicioService.delete(this.token, id).subscribe(
          (response) => {
            Swal.fire(
              'Eliminado!',
              'El registro fue eliminado exitosamente',
              'success'
            );

            this.getServicios();
          },
          (error) => {
            Swal.fire(
              'Error!',
              'Error al eliminar',
              'error'
            );
           // console.log(error);
          }
        );
      }
    });
  }
}
