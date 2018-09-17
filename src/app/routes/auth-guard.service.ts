/**
 * Created by claudiu on 12/19/2017.
 */
import { Injectable }     from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot}    from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
    // if (this.localStorageService.get('user')) {
    //   // logged in so return true
    //   return true;
    // }
    //
    // // not logged in so redirect to login page with the return url and return false
    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    // return false;
  }

}
