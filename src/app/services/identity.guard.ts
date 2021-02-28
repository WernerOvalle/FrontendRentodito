import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class IndetityGuard implements CanActivate {
  constructor(private _router: Router, private _userSerice: UserService) {}
  canActivate() {
    let indetity = this._userSerice.getIdentity();
    if (indetity) {
      return true;
    } else {
      this._router.navigate(['/error']);
      return false;
    }
  }
}
