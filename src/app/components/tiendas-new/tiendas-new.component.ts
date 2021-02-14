import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Tienda } from '../../models/tiendas';
import { UserService } from '../../services/user.service';
import { TiendasService } from '../../services/tiendas.service';
import Swal from 'sweetalert2';
import { global } from '../../services/global';
@Component({
  selector: 'app-tiendas-new',
  templateUrl: './tiendas-new.component.html',
  styleUrls: ['./tiendas-new.component.scss'],
  providers: [UserService, TiendasService],
})
export class TiendasNewComponent implements OnInit {
  public page_title: string;
  public identity;
  public validacion1;
  public token;
  public tienda: Tienda;
  public status: string;
public tiendas;
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
    private _tiendaService: TiendasService) {
      this.page_title = 'Tiendas';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.tienda = new Tienda(1, '', '','');
    this.url = global.url ;
    }

  ngOnInit(): void {
    this.getTiendas();
  }
  DocUpload1(datos) {
    //console.log(datos.body.image);

    /* let data = JSON.parse(datos.body);

   */ console.log(datos);
   if (datos.body.image) {
      this.tienda.image = datos.body.image;
      this.validacion1 = 1;
    }
    //console.log(this.identity)
  }
  onSubmit(form) {
  //  console.log(  this.tiendas);
  if (
    this.validacion1 == 1
  ) {
   this._tiendaService.create(this.token, this.tienda).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.tienda = response.tiendas;
          this.status = 'success';
          Swal.fire({
            title: 'Tienda Guardada Existosamente',
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

getTiendas(){
    this._tiendaService.getTiendas().subscribe(
      response=>{
        if(response.status=="success"){
          this.tiendas =response.Tiendas;
          //console.log(this.categories)
        }
      },
      error=>{
        console.log(error);
      }
    )
  }
}
