import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { global } from '../../services/global';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [UserService],
})
export class UserEditComponent implements OnInit {
  public user: User;
  public identity;
  public token;
  public status;
  public page_title: string;
  public url;
  /*public validacion1;
  public validacion2;
  public validacion3;*/
  public afuConfig1 = {
    multiple: false,
    formatsAllowed: '.jpg,.png, .gif, .jpeg',
    maxSize: '50',
    uploadAPI: {
      url: global.url + 'user/upload1',
     /* headers: {
        Authorization: this._userService.getToken()
      }*/
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
    attachPinBtn: 'Sube tu avatar de usuario...', }
  };
  public afuConfig2 = {
    multiple: false,
    formatsAllowed: '.jpg,.png, .gif, .jpeg',
    maxSize: '50',
    uploadAPI: {
      url: global.url + 'user/upload2',
    /*  headers: {
        Authorization: this._userService.getToken()
      }*/
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
    attachPinBtn: 'Sube tu INE (Frente)...', }
  };
  public afuConfig3 = {
    multiple: false,
    formatsAllowed: '.jpg,.png, .gif, .jpeg',
    maxSize: '50',
    uploadAPI: {
      url: global.url + 'user/upload3',
     /* headers: {
        Authorization: this._userService.getToken()
      }*/
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
    attachPinBtn: 'Sube tu INE (Reverso)...', }
  };
  constructor(private _userService: UserService) {
    this.page_title = 'Ajustes';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '','','');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url ;


    //rellenar object usuario
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      '',
      this.identity.ine1,
      this.identity.ine2,
      this.identity.punteo,
      this.identity.image
    );
  }

  ngOnInit(): void {}
  onSubmit(form) {
if(this.token){
    this._userService.update(this.token, this.user).subscribe(
      (response) => {
        //console.log(response)

        Swal.fire({
          title: 'Datos Actualizado',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        //actualizar sesion
        if (response.changes.name) {
          this.user.name = response.changes.name;
        }
        if (response.changes.surname) {
          this.user.surname = response.changes.surname;
        }
        if (response.changes.email) {
          this.user.email = response.changes.email;
        }
        if (response.changes.ine1) {
          this.user.ine2 = response.changes.ine1;
        }
        if (response.changes.ine2) {
          this.user.ine2 = response.changes.ine2;
        }
        if (response.changes.punteo) {
          this.user.punteo = response.changes.punteo;
        }
        if (response.changes.image) {
          this.user.image = response.changes.image;
        }
        this.identity = this.user;
        localStorage.setItem('identity', JSON.stringify(this.identity));
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: <any>error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }else{
    Swal.fire({
      title: 'Error',
      text: 'Error no tiene permisos ',
      icon: 'info',
      confirmButtonText: 'Aceptar',
    });
  }
}
  DocUpload1(datos) {
    //console.log(datos.body.image);

   /* let data = JSON.parse(datos.body);

   */  if (datos.body.image) {
     this.user.image = datos.body.image;
    //this.validacion1=1;
    }
   //console.log(this.identity)

  }
  DocUpload2(datos) {
    // console.log(datos.body.image);

    /* let data = JSON.parse(datos.body);

    */    if (datos.body.image) {
     this.user.ine1 = datos.body.image;
    // this.validacion2=1;
     }
   }
   DocUpload3(datos) {
     //console.log(datos.body.image);

    /* let data = JSON.parse(datos.body);

    */

    if (datos.body.image) {
      this.user.ine2 = datos.body.image;
     //this.validacion3=1;
     }
   }
}
