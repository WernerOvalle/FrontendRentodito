import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  public secciones: Array<string> = ['primera', 'segunda', 'tercera', 'cuarta', 'quinta'];
  constructor() { }

  ngOnInit(): void {
  }

}
