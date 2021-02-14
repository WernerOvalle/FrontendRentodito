import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Rentodito';
  public identity;
  public token;
  public url;
  constructor(
    public _userService: UserService
    ) { this.url = global.url
      this.loaduser();
  }
  ngOnInit(){
    console.log("web cargada");
  }

  ngDoCheck(){
    this.loaduser();
  }

  loaduser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
