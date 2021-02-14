
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../Models/user';
import { UserService } from '../../services/user.service';

import Swal from 'sweetalert2';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss'],
  providers: [UserService],
})
export class UserNewComponent implements OnInit {
  public page_title: string;
  public identity;
  public url;
  public token;
  public user: User;
  public status: string;
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService) {

      this.page_title = 'Usuarios';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.user = new User(1, '', '', 'CLIENTE', '', '','', '', '', '', '');
      this.url = global.url ;
      this.token = this._userService.getToken();
    }

  ngOnInit(): void {    this.getUsuarios(this.token);
  }
  getUsuarios(token){
    this._userService.getUsuarios(token).subscribe(
      response=>{
        if(response.status=="success"){
          this.user =response.user;
         // console.log(response)
        }
      },
      error=>{
        console.log(error);
      }
    )
  }
}

