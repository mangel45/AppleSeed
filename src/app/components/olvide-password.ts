import { Component} from '@angular/core';
import { AuthUser } from '../models/authuser';
import { DatosService } from '../services/datos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'olvide-password',
  templateUrl: '../views/olvide-contrasenia.html'
})
export class OlvideContrasenia {
    public token;
    public titulo;
    public email;
    usrForget = new AuthUser();
    
    private showAlert (msj:string) {
      this.snackBar.open(msj, "", {
        duration: 4000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    }

    constructor(private _authService: DatosService, private _route : ActivatedRoute, private router : Router, 
      public snackBar: MatSnackBar, private usrService: AuthService) { 
        }
    ngOnInit() {
        this.titulo = '¿Olvidaste tu contraseña?';
        
    }

    onSubmit() {
/*         var objemail = {
            "email": this.email,
        }
        this._authService.recuperarContrasenia(objemail)
            .subscribe((result) => {
                console.log(result);
                this.snackBar.open("Se ha enviado un correo con los pasos para reestablecer tu contraseña", "", {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right'
                });
        }, 
      (error) => {
        // this.error = error.error.non_field_errors[0];
        console.log(error);
        // this.snackBar.open(error.error.non_field_errors[0], "", {
        //   duration: 3000,
        //   verticalPosition: 'bottom',
        //   horizontalPosition: 'right'
        //   });
      }); */
      
      if (this.usrForget.mail !== undefined) {
        this.usrService.userRecovery(this.usrForget).subscribe(response => {
          console.log( 'Mi respuesta: ', response.message);
          if (response.success !== false) {
            this.showAlert("Se ha enviado un correo con los pasos para reestablecer tu contraseña.");
          } else {
            this.showAlert("El usuario ingresado no existe.");
          }
        });
      }
    }
}