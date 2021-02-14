import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/categorias';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.scss'],
  providers: [UserService, CategoryService],
})
export class CategoryNewComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public category: Category;
  public status: string;

  public categories;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.page_title = 'Categorias';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category(1, '', '');
  }

  ngOnInit(): void {
    this.getCategories();
  }

  onSubmit(form) {
    console.log(  this.category);
   this._categoryService.create(this.token, this.category).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.category = response.category;
          this.status = 'success';
          Swal.fire({
            title: 'Categoria Guardada Existosamente',
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
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response=>{
        if(response.status=="success"){
          this.categories =response.categories;
          //console.log(this.categories)
        }
      },
      error=>{
        console.log(error);
      }
    )
  }
}
