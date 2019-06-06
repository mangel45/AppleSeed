import { Component} from '@angular/core';
import { AuthUser } from '../models/authuser';
import { DatosService } from '../services/datos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'micuenta',
  templateUrl: '../views/micuenta.html'
})
export class MiCuentaComponent {
    public titulo: string;
    public username: string;
    public password: string;
    public usuario: AuthUser;
    public message: {};
    public error: Error[];
    public validar: boolean = false;
    public mail:string;
    public new_password1;
    public new_password2;
    public token;
    public parametros: any = [];
    private showAlert (msj:string) {
      this.snackBar.open(msj, "", {
        duration: 4000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    }

    usrChange = new AuthUser();

  constructor(
    private _authService: DatosService,
    private _route : ActivatedRoute,
    private _router : Router,
    public snackBar: MatSnackBar,
    private userService: AuthService
  ) { 
      this.titulo = "MI CUENTA";

    }

    ngOnInit() {
      //console.log('Se ha cargado el componente home.component.ts');
    }

    onSubmit() {
      /* this.parametros = {
        "mail" : this.mail,
        "new_password1" : this.new_password1,
        "new_password2" : this.new_password2
      } */

      if (this.usrChange.mail !== undefined && this.usrChange.password !== undefined){
        this.userService.changePassword(this.usrChange).subscribe(response => {
          console.log("Respuesta: ", response);
          if (response.success == true) {
            this.showAlert("Tu contraseña ha sido actualizada con éxito.");
            this._router.navigate(["../solicitudes"]);
          } else if (response.success == false) {
            this.showAlert("Error al actualizar tu contraseña.");
          }
        })
      }




      /* this._authService.changePassword(this.parametros)
          .subscribe((value) => {
            console.log(value);
      },(error) => {
        // this.error = error.error.non_field_errors[0];
        console.log(error);
        // this.snackBar.open(error.error.non_field_errors[0], "", {
        //   duration: 3000,
        //   verticalPosition: 'bottom',
        //   horizontalPosition: 'right'
        //   });
      }); */

    }

  } //Final


