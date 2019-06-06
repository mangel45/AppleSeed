import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { routeService } from './routeService';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  private isUserLoggedIn;
  token: any;

  routeParams = new routeService(); // trae la url (http://localhost:62697/api/) y los headers tipo json
  constructor(private http: HttpClient) {
 
  }

  authHttpOptions() {
    this.token = localStorage.getItem("token");
    const authHttpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return authHttpOptions;
  }

  authHttpOptionsParams(parametros) {
    this.token = localStorage.getItem("token");
    const authHttpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'params': parametros
      })
    };
    return authHttpOptions;
  }

  logToken(token) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  setUserLoggedIn(token) {
    this.isUserLoggedIn =  token;
  }
  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  userLoginEndPoint(loginObj: any): Observable<any> {
    var respuesta = this.http.post(this.routeParams.url + 'users/Login', loginObj, { headers: this.routeParams.header });
    console.log("Prueba: Login", loginObj);
    return respuesta;
  }

 userRegisterEndPoint(RegisterObj: any): Observable<any> {
   var respuesta = this.http.post(this.routeParams.url + 'users/userregister', RegisterObj, { headers: this.routeParams.header });
   console.log("Prueba: Register", RegisterObj);
   return respuesta; 
 }

 userRecovery(recoveryObj: any): Observable<any> {
   var respuesta = this.http.post(this.routeParams.url + 'users/RecoveryPassword', recoveryObj, { headers: this.routeParams.header });
   console.log("Prueba: Register", recoveryObj);
   return respuesta;
 }

 changePassword(changeObj: any): Observable<any> {
  // console.log(this._headers.get('Authorization'));
  var respuesta = this.http.post(this.routeParams.url + 'users/ChangePassword' + changeObj+ '/', this.authHttpOptions());
  console.log("Prueba: Cambio", changeObj);
  return respuesta;
}

}