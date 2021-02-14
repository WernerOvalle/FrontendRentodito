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
    private _tiendaService: ServicioService) {
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
   this._tiendaService.create(this.token, this.servicio).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.servicio = response.servicios;
          this.status = 'success';
          Swal.fire({
            title: 'Servicio Guardado Existosamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(function() {
            window.location.reload();
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
    this._tiendaService.getServicios().subscribe(
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
}
