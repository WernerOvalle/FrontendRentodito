import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user';
import { UserService } from '../../services/user.service';
//import * as jQuery from 'jquery';
import Swal from 'sweetalert2';
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
  constructor(private _userService: UserService) {
    this.page_title = 'Registrate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');

    /*
     public id: number,
    public name: string,
    public surname: string,
    public role: string,
    public email: string,
    public password: string,
    public description: string,
    public image:string*/
  }

  ngOnInit(): void {
  /*  console.log('componente de registro lanzado');
    console.log(this._userService.test());
    jQuery('.toast').toast('show');*/
  }
  onSubmit(form) {
    //console.log(this.user);
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
  }
}
