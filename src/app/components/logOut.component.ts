import { Component} from '@angular/core';
import { AuthUser } from '../models/authuser';
import { DatosService } from '../services/datos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'logout',
  templateUrl: '../views/login.html'
})
export class LogOutComponent {
    public token;
    public titulo;
    public usuario: AuthUser;

    constructor(
        private _authService: DatosService,
        private _route : ActivatedRoute,
        private _router : Router,
        public snackBar: MatSnackBar,
        private myAwesomeService: AuthService,
        
      ) { 
        this.titulo ="LogOut";
        }
    ngOnInit() {
      this.logOut();
    }
    onSubmit() {
      this._authService.logout();
    }
    logOut() {
      this._authService.logout();
      
    }
 
}