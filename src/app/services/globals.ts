//Variables globales que las puedes utilizar en todo el proyecto
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()

export class GLOBAL {
  private servicioUrl = 'http://23.253.173.64:8081/api/users/login';  // URL to web api

  constructor(private http: HttpClient, private https: Http) { }

  login(username, pass): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.servicioUrl + 'User/login', {
      "email": username,
      "password": pass
    }, { headers: headers });
  }
  recuperarpass(email): Observable<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.get(this.servicioUrl + 'CambiarPassword/' + email, {});
  }

  cambiarpass(id, passold, passnew): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put(this.servicioUrl + 'CambiarPassword/' + id, {
      "NewPassword": passnew,
      "OldPassword": passold
    }, { headers: headers });
  }

  getToken() {
    if (localStorage.getItem("token") != "usuarios no existe" &&
      localStorage.getItem("token") != "password incorrecto" &&
      localStorage.getItem("token") != null) {
      return true;
    }
    return false;
  }


}