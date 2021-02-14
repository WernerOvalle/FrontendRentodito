import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { ArticuloService } from '../../services/articulos.service';
import { global } from '../../services/global';
@Component({
  selector: 'app-particulares-productos',
  templateUrl: './particulares-productos.component.html',
  styleUrls: ['./particulares-productos.component.scss'],
  providers: [ArticuloService]
})
export class ParticularesProductosComponent implements OnInit {
public url;
  public articulos;
  constructor( private _articuloService: ArticuloService) {
this.url=global.url;

   }

  ngOnInit(): void {
    this.getArticulosByParticular();
  }

  getArticulosByParticular(){
    this._articuloService.getArticulosByParticular().subscribe(
      response=>{
        if(response.status=="success"){
          this.articulos =response.Articulos;
          console.log(this.articulos)
        }
      },
      error=>{
        console.log(error);
      }
    )
  }

}
