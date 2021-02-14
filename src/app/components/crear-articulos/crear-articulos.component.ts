import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Articulo } from '../../models/articulos';
import { UserService } from '../../services/user.service';
import { ArticuloService} from '../../services/articulos.service';
import { TiendasService } from '../../services/tiendas.service';
import { CategoryService} from '../../services/category.service';
import Swal from 'sweetalert2';
import { global } from '../../services/global';

@Component({
  selector: 'app-crear-articulos',
  templateUrl: './crear-articulos.component.html',
  styleUrls: ['./crear-articulos.component.scss'],
  providers: [UserService, ArticuloService,CategoryService,TiendasService],
})
export class CrearArticulosComponent implements OnInit {
  public page_title: string;
  public identity;
  public validacion1;
  public token;
  public Articulo: Articulo;
  public status: string;
public articulos;
public tiendas;
public categories;
public url;
public afuConfig1 = {
  multiple: false,
  formatsAllowed: '.jpg,.png, .gif, .jpeg',
  maxSize: '50',
  uploadAPI: {
    url: global.url + 'articulos/upload',
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
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _tiendaService: TiendasService,
    private _arituclosService: ArticuloService,
    private _categoryService: CategoryService ) { this.page_title = 'Articulos';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.Articulo = new Articulo(1, 1,1,1,1,'','', '','','');
    this.url = global.url ;
    this.Articulo.user_id=this.identity.sub;
   }

  ngOnInit(): void {
    this.getArticulos(); this.getTiendas();this.getCategories();
  }



  DocUpload1(datos) {
    //console.log(datos.body.image);

    /* let data = JSON.parse(datos.body);

   */ console.log(datos);
   if (datos.body.image) {
      this.Articulo.image = datos.body.image;
      this.validacion1 = 1;
    }
    //console.log(this.identity)
  }
  onSubmit(form) {
  //  console.log(  this.tiendas);
  if (
    this.validacion1 == 1
  ) {
   this._arituclosService.create(this.token, this.Articulo).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.Articulo = response.Articulos;
          this.status = 'success';
          Swal.fire({
            title: 'Articulo Guardadao Existosamente',
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

getArticulos(){
    this._arituclosService.getArticulos().subscribe(
      response=>{
        if(response.status=="success"){
          this.articulos =response.Articulos;
          //console.log(this.articulos)
        }
      },
      error=>{
        console.log(error);
      }
    )
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

getCategories(){
  this._categoryService.getCategories().subscribe(
    response=>{
      if(response.status=="success"){
        this.categories =response.categories;
        //console.log(response)
      }
    },
    error=>{
      console.log(error);
    }
  )
}
}
