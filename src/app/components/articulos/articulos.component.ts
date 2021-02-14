import { Component, OnInit } from '@angular/core';

import * as jQuery from 'jquery';
import { CategoryService } from '../../services/category.service';
import { global } from '../../services/global';
@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'],
  providers: [CategoryService],
})
export class ArticulosComponent implements OnInit {

  public categories;
  public articulos;
  public menu;
  public url;
  constructor(

    private _categoryService: CategoryService
  ) {
    this.url = global.url ;
    this.menu=0;
  }

  ngOnInit(): void {
    jQuery('#menu-toggle').click(function (e) {
      e.preventDefault();
      jQuery('#wrapper').toggleClass('toggled');
    });

    this.getCategories();
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
  clickAddTodo(id){
//console.log(id)
this.menu=1;
this._categoryService.getArticulosById(id).subscribe(
  response=>{
    if(response.status=="success"){
      this.articulos =response.articulos;
      console.log(this.articulos)
    }
  },
  error=>{
    console.log(error);
  }
)
  }
}
