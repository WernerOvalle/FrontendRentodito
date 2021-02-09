import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'],
})
export class ArticulosComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    jQuery('#menu-toggle').click(function (e) {
      e.preventDefault();
      jQuery('#wrapper').toggleClass('toggled');
    });
  }
}
