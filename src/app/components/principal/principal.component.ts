import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
public year2;
  constructor() { }

  ngOnInit(): void {

  var year = new Date().getFullYear();
 this.year2=year;
  }

}
