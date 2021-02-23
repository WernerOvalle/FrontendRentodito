import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../Models/user';
import { UserService } from '../../services/user.service';
import { TiendasService } from '../../services/tiendas.service';
import Swal from 'sweetalert2';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss'],
  providers: [UserService,TiendasService],
})
export class UserNewComponent implements OnInit {
  public page_title: string;
  public identity;
  public url;
  public token;
  public tiendas;
  public user: User;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _tiendaService: TiendasService
  ) {
    this.page_title = 'Usuarios';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = new User(1, '', '', 'CLIENTE', '', '', '', '', '', '', '');
    this.url = global.url;
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getUsuarios(this.token);this.getTiendas();
  }
  getUsuarios(token) {
    this._userService.getUsuarios(token).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.user = response.user;
          // console.log(response)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getTiendas(){
    this._tiendaService.getTiendas().subscribe(
      response=>{
        if(response.status=="success"){
          this.tiendas =response.Tiendas;
         // console.log(this.tiendas)
        }
      },
      error=>{
        console.log(error);
      }
    )
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
        this._userService.delete(this.token, id).subscribe(
          (response) => {
            Swal.fire(
              'Eliminado!',
              'El registro fue eliminado exitosamente',
              'success'
            );

            this.getUsuarios(this.token);
          },
          (error) => {
            Swal.fire('Error!', 'Error al eliminar', 'error');
            console.log(error);
          }
        );
      }
    });
  }

  update(usr) {
   // console.log( usr);
   delete usr.tiendas;
    this._userService.udpate2(this.token, usr, usr.id).subscribe(
      (response) => {
        if (response.status == 'success') {
          //this.Articulo = response.changes;
          this.status = 'success';
          Swal.fire({
            title: 'Articulo Actualizado Existosamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(function () {});
          this.getUsuarios(this.token);
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
        });
        //console.log(<any>error);
      }
    );
  }
  @ViewChild('myModal') myModal: ElementRef;

  @ViewChild('img01') myImg: ElementRef;
  change(nombreimagen) {
    this.myModal.nativeElement.style.display = 'block';
    this.myImg.nativeElement.src = this.url + 'user/avatar/' + nombreimagen;
  }

  cerrar() {
    this.myModal.nativeElement.style.display = 'none';
  }
}
