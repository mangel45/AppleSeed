import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from 'src/app/models/authuser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usrLogin = new AuthUser();

  constructor(private router: Router, private userService: AuthService) { }

  ngOnInit() {
  } 


  userLogin() {
    // Versión de prueba: 1
    // mandar a llamar al metodo del servicio user.login
    if (this.usrLogin.mail != undefined && this.usrLogin.password != undefined) {
      this.userService.userLoginEndPoint(this.usrLogin).subscribe(response => {
        console.log("Mi respuesta: ", response);
        if (response.success == true) {
          console.log("¡Bienvenido!");
          //localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(response.result));
          localStorage.setItem("id", response.result.id);
          localStorage.setItem("mail", response.result.email);
          /* localStorage.setItem("rol", response.result.roleId); */
          localStorage.setItem("status", response.result.statusId);
          //window.location.href = "main";
          //this.router.navigate(["home/six"]);
          this.router.navigate(["/home"]);
        }
        else if (response.success == false) {
          console.log("No existes amigo");
          alert("Usuario no existe");
        }
      });
    }
  }

} //Fin de NgOnInit
