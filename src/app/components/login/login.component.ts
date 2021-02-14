import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public identity: string;
  public token: string;
  public status: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Inicia Sesión';
    this.user = new User(1, '', '', 'CLIENTE', '', '','', '', '', '', '');
  }

  ngOnInit(): void {
//esto se ejectua siempre y cierra sesion solo caundo le llega el parametro sure por la url.
    this.logout() ;
  }
  onSubmit(form) {
    //console.log(this.user);
    this._userService.signup(this.user).subscribe(
      (response) => {
        //token
        if (response.status != 'error') {
          this.token = response;
          /*console.log(response);*/
          //objeto usuario identificado
          this._userService.signup(this.user, true).subscribe(
            (response) => {
              this.identity = response;
              //console.log(this.identity)
              /*PERSISTIR*/
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
              Swal.fire({
                title: 'Login Correcto',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              }).then(function () {
               // window.location.reload();
              });
              //console.log(this.identity);
              //console.log(this.token);
              this._router.navigate(['inicio']);
            },
            (error) => {
              this.status = '';
              for (const property in <any>error) {
                this.status += <any>error[property];
              }
              Swal.fire({
                title: <any>error.message,
                text: this.status,
                icon: 'error',
                confirmButtonText: 'Aceptar',
              });
            }
          );
        } else {
          Swal.fire({
            title: 'Login Incorrecto',
            text: this.status,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      },
      (error) => {
        this.status = '';
        for (const property in <any>error) {
          this.status += <any>error[property];
        }
        Swal.fire({
          title: <any>error.message,
          text: this.status,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }

  logout() {
    this._route.params.subscribe((params) => {
      let logout = +params['sure'];
      if (logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity = null;
        this.token = null;
        //Redireccion a inicio
        this._router.navigate(['inicio']);
      }
    });
  }
}
