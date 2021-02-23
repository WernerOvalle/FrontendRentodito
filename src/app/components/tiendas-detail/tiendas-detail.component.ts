import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TiendasService } from '../../services/tiendas.service';
import { Tienda } from '../../models/tiendas';
@Component({
  selector: 'app-tiendas-detail',
  templateUrl: './tiendas-detail.component.html',
  styleUrls: ['./tiendas-detail.component.scss'],
  providers: [TiendasService],
})
export class TiendasDetailComponent implements OnInit {
  @Input() set ide2(ide:string){};

  public tienda: Tienda;
  public tiendas;
  constructor(
    private _route: ActivatedRoute,
    private _tiendaService: TiendasService,
    private _router: Router
  ) {
    this.tienda = new Tienda(1, '', '','', '');
    console.log(this.ide2);
  }

  ngOnInit(): void {
   /* this.getPOst();*/

  }
 /* getPOst() {
    this._route.params.subscribe((params) => {
      let id = +params['id'];
      //oetucuib ajax
      this._tiendaService.getTiendasById(id).subscribe(
        (response) => {
          this.tiendas = response.Tiendas;
          console.log(this.tiendas);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }*/

}
