import { Component} from '@angular/core';
import { AuthUser } from '../models/authuser';
import { DatosService } from '../services/datos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { routeService } from '../services/routeService';

@Component({
  selector: 'login',
  templateUrl: '../views/login.html'
})
export class LoginComponent {
    public titulo: string;
    public username: string;
    public error: Error[];
    public password: string;
    public usuario: AuthUser;
    public message: {};
    public token;
    public validar: boolean = false;
    private showAlert (msj:string) {
      this.snackBar.open(msj, "", {
        duration: 4000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    }

    usrLogin = new AuthUser();

  constructor(
    private _authService: DatosService, private _route : ActivatedRoute, private router : Router, public snackBar: MatSnackBar,
    private userService: AuthService) {
      
      
      this.titulo = "PROCESO DE CLEARING";
      /* this.usuario = new AuthUser('','','','',''); */
    }

    ngOnInit() {
      //console.log('Se ha cargado el componente home.component.ts');
    }

    onSubmit() {
      console.log(this.usuario);
      this.usrLogin.mail = this.usrLogin.mail;
      //this.usuario.username = this.usuario.email;
      this._authService.login(this.usuario)
          .subscribe((result) => {
            console.log(result);
            /* localStorage.setItem("token", result.key);
            this.token = result.key;
            this.myAwesomeService.setUserLoggedIn(this.token);
            window.location.href = "solicitudes"; */
      }, 
    (error) => {
      // this.error = error.error.non_field_errors[0];
    });

    }

    userLogin(){
      if (this.usrLogin.mail !== undefined && this.usrLogin.password !== undefined) {
        this.userService.userLoginEndPoint(this.usrLogin).subscribe(response => {
          console.log("Mi respuesta: ", response);
          if (response.success == true) {
            this.showAlert("¡Bienvenido!");
            localStorage.setItem("username", JSON.stringify(response.result));
            localStorage.setItem("id", response.result.id);
            localStorage.setItem("mail", response.result.mail);
            this.userService.logToken(response.result.token);
            this.router.navigate(["../solicitudes"]);
          }
          else if (response.success == false) {
            console.log("No existes amigo");
            this.showAlert("El usuario ingresado no existe.");
          }
        });
      }
    }
    }
  



