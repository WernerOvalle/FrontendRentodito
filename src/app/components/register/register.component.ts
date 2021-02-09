import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user';
import { UserService } from '../../services/user.service';
//import * as jQuery from 'jquery';
import Swal from 'sweetalert2';
import { global } from '../../services/global';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public status: string;
  public user: User;
  public identity;
  public token;
  public url;
  public validacion1;
  public validacion2;
  public validacion3;
  public afuConfig1 = {
    multiple: false,
    formatsAllowed: '.jpg,.png, .gif, .jpeg',
    maxSize: '50',
    uploadAPI: {
      url: global.url + 'user/upload1',
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      attachPinBtn: 'Foto...',
    },
  };
  public afuConfig2 = {
    multiple: false,
    formatsAllowed: '.jpg,.png, .gif, .jpeg',
    maxSize: '50',
    uploadAPI: {
      url: global.url + 'user/upload2',
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      attachPinBtn: 'INE (frente)...',
    },
  };
  public afuConfig3 = {
    multiple: false,
    formatsAllowed: '.jpg,.png, .gif, .jpeg',
    maxSize: '50',
    uploadAPI: {
      url: global.url + 'user/upload3',
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      attachPinBtn: 'INE (reverso)...',
    },
  };
  constructor(private _userService: UserService) {
    this.page_title = 'Registrate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '','', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit(): void {
    /*  console.log('componente de registro lanzado');
    console.log(this._userService.test());
    jQuery('.toast').toast('show');*/
  }
  onSubmit(form) {
    //console.log(this.user);
    if (
      this.validacion1 == 1 &&
      this.validacion2 == 1 &&
      this.validacion3 == 1
    ) {
      this._userService.register(this.user).subscribe(
        (response) => {
          /* if (response.status == 'success') {
          this.status = response.status;


        } else {
          this.status = 'error';
          console.log(  "this.status");
        }*/

          Swal.fire({
            title: response.message,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          /*console.log(response);*/
          form.reset();

        },
        (error) => {
          this.status = '';
          for (const property in <any>error.error.error) {
            this.status += <any>error.error.error[property];
          }
          Swal.fire({
            title: <any>error.error.message,
            text: this.status,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          // console.log(<any>error.error);
        }
      );
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Error debe adjuntar las imagenes son obligatorias ',
        icon: 'info',
        confirmButtonText: 'Aceptar',
      });
    }
  }
  DocUpload1(datos) {
    //console.log(datos.body.image);

    /* let data = JSON.parse(datos.body);

   */ if (datos.body.image) {
      this.user.image = datos.body.image;
      this.validacion1 = 1;
    }
    //console.log(this.identity)
  }
  DocUpload2(datos) {
    // console.log(datos.body.image);

    /* let data = JSON.parse(datos.body);

    */ if (datos.body.image) {
      this.user.ine1 = datos.body.image;
      this.validacion2 = 1;
    }
  }
  DocUpload3(datos) {
    //console.log(datos.body.image);

    /* let data = JSON.parse(datos.body);

    */

    if (datos.body.image) {
      this.user.ine2 = datos.body.image;
      this.validacion3 = 1;
    }
  }
}
