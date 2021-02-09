import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.scss']
})
export class TiendasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    jQuery('#menu-toggle').click(function (e) {
      e.preventDefault();
      jQuery('#wrapper').toggleClass('toggled');
    });
  }

}
