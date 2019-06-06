import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

    // canActivate(): boolean {
    //   if (!this.auth.isAuthenticated()){
    //       console.log ('bye');
    //       this.router.navigate(['/login']);
    //       return false;
    //   }
    //   console.log ('Welcome');
    //   return true;
    // }
  canActivate(next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean {
    this.router.navigate(['/login']);
    console.log("No estas autenticado", this.auth.getUserLoggedIn());
    return this.auth.getUserLoggedIn();
  }

}