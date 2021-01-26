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
  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png, .gif, .jpeg',
    maxSize: '50',
    uploadAPI: {
      url: global.url + 'user/upload',
      headers: {
        Authorization: this._userService.getToken()
      }
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
    attachPinBtn: 'Sube tu avatar de usuario...', }
  };
  constructor(private _userService: UserService) {
    this.page_title = 'Ajustes';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
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
      this.identity.description,
      this.identity.image
    );
  }

  ngOnInit(): void {}
  onSubmit(form) {
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
        if (response.changes.description) {
          this.user.description = response.changes.description;
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
  }
  DocUpload(datos) {
   /* console.log(datos.body.image);*/

   /* let data = JSON.parse(datos.body);

   */ this.user.image = datos.body.image;
  }
}
