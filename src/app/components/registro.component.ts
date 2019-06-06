import { Component} from '@angular/core';
import { AuthUser } from '../models/authuser';
import { RegisterUser } from '../models/registerUser';
import { DatosService } from '../services/datos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';
// import { AuthService } from '../services/auth.service';

@Component({
  selector: 'registro',
  templateUrl: '../views/registro.html'
})
export class RegistroComponent {
    public titulo: string;
    public username: string;
    public password: string;
    public usuario: AuthUser;
    public errores: {};
    public validar: boolean = false;
    public mensaje: string;

    usrRegister = new RegisterUser();
    usrLogin = new AuthUser();


  constructor(
    private _authService: DatosService,
    private _route : ActivatedRoute,
    private _router : Router,
    public snackBar: MatSnackBar,
    private userService: AuthService
    // private myAwesomeService: AuthService,
) { 
      this.titulo = 'REGISTRO DE USUARIOS';
      /* this.usuario = new AuthUser('','','','',''); */
    }

    ngOnInit() {
      //this.myAwesomeService.getUserLoggedIn();
      //console.log('Se ha cargado el componente home.component.ts');
    }

    /* onSubmit() {
      this.usuario.username = this.usuario.mail;
      // console.log(this.usuario);
      this._authService.registro(this.usuario)
          .subscribe((value) => {
            this.mensaje = 'Usuario registrado con éxito';
            //this.usuario = [];
            this.snackBar.open("Usuario registrado con éxito", "", {
              duration: 5000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right'
              });
            this._router.navigate(['/login']);
      }, 
      (error) => {
        // error.error.email;
        // this.validar = true;
        // console.log(this.errores);
        
        this.snackBar.open(error.error.email, "", {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
          });
        
  
        // if(error.error.email[0] || error.error.username[0]) {
        //   this.message = 'El email ya está registrado en el sistema';
        // }
        // if(error.error.password[0]) {
        //   this.message = 'La contraseña debe de ser mayor a 8 caracteres';
        // }

      });
    } */

    userLogin(){
      if (this.usrLogin.mail !== undefined && this.usrLogin.password !== undefined) {
        this.userService.userLoginEndPoint(this.usrLogin).subscribe(response => {
          console.log("Mi respuesta: ", response);
          if (response.success == true) {
            console.log("¡Bienvenido!");
            localStorage.setItem("username", JSON.stringify(response.result));
            localStorage.setItem("id", response.result.id);
            localStorage.setItem("mail", response.result.mail);
          }
          else if (response.success == false) {
            console.log("No existes amigo");
            alert(response.message);
          }
        });
      }
    }

    userRegister(){
      this.usrRegister.lastname = "";
      this.usrRegister.motherlastname = "";
      if(this.usrRegister.name !== undefined && this.usrRegister.password !== undefined
        && this.usrRegister.mail !== undefined) {
          this.userService.userRegisterEndPoint(this.usrRegister).subscribe(response => {
            console.log ("Mi respuesta: ", response.message);
            if (response.success == true){
              console.log(response.message);
            } else if (response.seccess == false){
              console.log(response.message);
            }
          });
        }
    }
    

  }
 

