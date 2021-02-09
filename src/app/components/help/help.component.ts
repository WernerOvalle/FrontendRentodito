import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
@Component({
  selector: 'help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  public menu;
  public secciones: Array<string> = ['primera', 'segunda', 'tercera', 'cuarta', 'quinta'];
  constructor() {
    this.menu=1;
   }

  ngOnInit(): void {
    jQuery('#menu-toggle').click(function (e) {
      e.preventDefault();
      jQuery('#wrapper').toggleClass('toggled');
    });
  }
  clickAddTodo1() {
    this.menu=1;
  }
  clickAddTodo2() {
    this.menu=2;
  }
  clickAddTodo3() {
    this.menu=3;
  }
  clickAddTodo4() {
    this.menu=4;
  }
  clickAddTodo5() {
    this.menu=5;
  }
  clickAddTodo6() {
    this.menu=6;
  }
  clickAddTodo7() {
    this.menu=7;
  }
}

