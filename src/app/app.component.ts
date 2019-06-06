import { Component, Output } from '@angular/core';
import { DatosService } from './services/datos.service';
import { AuthService } from './services/auth.service';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Clearing';
  public token;

  constructor(
    private _authService: DatosService,
    private myAwesomeService: AuthService,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    this.token = localStorage.getItem("token");
    // this.myAwesomeService.getUserLoggedIn();
    this.myAwesomeService.setUserLoggedIn(this.token);
    // console.log(this.myAwesomeService.getUserLoggedIn());
    // console.log(this.token);
    // console.log(localStorage.getItem("token"));
  }

  logOut() {
    /* this._authService.logout(); */
    this.token = localStorage.removeItem("Token");
    this._router.navigate(["../login"]);
  }


}
