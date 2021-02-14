import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { TiendasService } from '../../services/tiendas.service';
@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.scss'],
  providers: [TiendasService]
})
export class TiendasComponent implements OnInit {
public tiendas;
public detalle;
public menu =0;
  constructor(private _tiendaService: TiendasService ) { }

  ngOnInit(): void {
    jQuery('#menu-toggle').click(function (e) {
      e.preventDefault();
      jQuery('#wrapper').toggleClass('toggled');
    });
    this.getTiendas();
  }
  getTiendas(){
    this._tiendaService.getTiendas().subscribe(
      response=>{
        if(response.status=="success"){
          this.tiendas =response.Tiendas;
          //console.log(this.categories)
        }
      },
      error=>{
        console.log(error);
      }
    )
  }

  clickAddTodo(id){
this.menu=id;


        //oetucuib ajax
        this._tiendaService.getTiendasById(id).subscribe(
          (response) => {
            this.detalle = response.Tiendas;
            //console.log(this.tiendas);
          },
          (error) => {
            console.log(error);
          }
        );



      }
}
