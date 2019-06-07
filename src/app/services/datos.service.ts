import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './globals';
import { Clearing } from '../models/clearing';
import { IdApplicationNavigation, CompanyOsc, CompanyComment, CompanyContacto, CompanyDetail } from '../models/solicitud';
import {map} from 'rxjs/operators'; 
import { AuthService } from './auth.service';

@Injectable()
export class DatosService {
    // public url: string;
    public url = "http://apiclearing.demo-minimalist.com/";
    /* public url = "http://23.253.173.64:8081/api/"; */

     _headers = new HttpHeaders( {
        "Content-Type": "application/json",
        "Authorization": "Token "+ localStorage.getItem("token")
     });

     _contentHtml = new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded"
     });

    constructor(
        private http: HttpClient,
        private _http: Http,
        private _authServices: AuthService,
    ) {
    }

    //Todo lo de usuarios
    login(parametros): Observable<any> {     
        return this.http.post(this.url + 'rest-auth/login/', parametros);
    }
    logout() {
        return this.http.get(this.url+'rest-auth/logout/', {headers: this._headers} );
    }
    changePassword(parametros) {
        // console.log(this._headers.get('Authorization'));
        return this.http.post(this.url + 'rest-auth/password/change/', parametros, {headers: this._headers}); 
    }
    recuperarContrasenia(email) {
        return this.http.post(this.url + 'rest-auth/password/reset/', email); 
    } 
    
    registro(parametros) {     
        return this.http.post(this.url + 'rest-auth/registration/', parametros);
    }
     //Sube un fichero de imagen por POST 
     subirArchivos(params: Array<string>, files: Array<File>) {
         console.log(files);
        return new Promise((resolve, reject)=> {
            //Simular un formulario normal
            var formData: any = new FormData();
            //Instacia de XMLHttpRequest deja disponible el objeto para las peticiones ajax
            var xhr = new XMLHttpRequest();


            for(var i=0; i < files.length; i++) {
                formData.append('uploads[]', files[i], files[i].name);
            }

            //Cuando la peticion de ajax este preparada
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200 ) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open("POST", this.url+'archivos/', true);
            xhr.send(formData);
        });
    }

    //Proceso de clearing inicial
    // clearing(parametros) {
    //     return this.http.post(this.url + 'clearing/', parametros);
    // }
    clearing(url, parametros) { //solicitud : IdApplicationNavigation
        /* let json = JSON.stringify(solicitud);
        console.log(solicitud);
        debugger;
        let parametros = json; */
        /* let headers = new Headers({'Content-Type':'application/json'}); */
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem("token"));
        debugger;
        console.log(parametros);
         return this.http.post('http://23.253.173.64:8081/api/' + url, parametros,  {headers: headers});
         //.pipe(map(res => res.json()));
    }
    //Actualizar el formulario
    actualizarFormulario(id, parametros) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.put(this.url + 'clearing/'+id+'/', parametros, {headers: headers});
    }
    getSolicitudesLista1() {
        /* return this.http.get(this.url+'clearing/'); */
        return this.http.get('http://23.253.173.64:8081/api/clearing/Search/', this._authServices.authHttpOptions());
        // var body = 'palabra=' + '&fecha_solicitud=' + '&estado_solicitud='+ '&sub_estado_solicitud='+ 
    } 

    getSolicitudesLista(parametros){
        //var body = 'palabra=' + palabra + '&fecha_solicitud=' + fechaSolicitud + '&estado_solicitud=' + estadoSolicitud + '&sub_estado_solicitud=' + subEstadoSolicitud;
        return this.http.get('http://23.253.173.64:8081/api/clearing/Search/'+ parametros +'/', this._authServices.authHttpOptions());
    }

    getSolicitud(id) {
        return this.http.get(this.url+'clearing/'+id+'/');
    }

    //Catalogos
    getPaises() {
        return this.http.get('http://23.253.173.64:8081/api/catalogs/country', this._authServices.authHttpOptions());
    }
    getEstados(url, parametros) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem("token"));
        return this.http.get('http://23.253.173.64:8081/api/catalogs' + url, { headers: headers, params: parametros });
    }
    getCiudades(url, parametros) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem("token"));
        return this.http.get('http://23.253.173.64:8081/api/catalogs/' + url ,{ headers: headers, params: parametros });
    }

    getConocidos(){
        return this.http.get('http://23.253.173.64:8081/api/catalogs/how_did_you', this._authServices.authHttpOptions());
    }

    getLocalidades() {
        return this.http.get(this.url + 'catalogos/localidades/', this._authServices.authHttpOptions());
    }
    getComunidades() {
        return this.http.get(this.url + 'catalogos/comunidades/', this._authServices.authHttpOptions());
    }
    getMateriasLegales() {
        return this.http.get(this.url + 'catalogos/materias-legales/', this._authServices.authHttpOptions());
    }
    getConocimientoProbono() {
        return this.http.get(this.url + 'catalogos/conocimiento-probono/', this._authServices.authHttpOptions());
    }
    getPeriodos(){
        return this.http.get('http://23.253.173.64:8081/api/catalogs/Time_Frame', this._authServices.authHttpOptions());
    }
    getSubestados1(id:number) {
        return this.http.get('http://23.253.173.64:8081/api/catalogs/Clearing_Sub_Status/'+ id + '/', this._authServices.authHttpOptions());
    }
    getEstadosSolicitud(){
        /* return this.http.get(this.url + 'catalogs/Clearing_Status', this._authServices.authHttpOptions()); */
        return this.http.get('http://23.253.173.64:8081/api/catalogs/Clearing_Status', this._authServices.authHttpOptions());
    }
    getSubestados(url, parametros) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem("token"));

        return this.http.get('http://23.253.173.64:8081/api/' + url, { headers: headers, params: parametros });
        //return this.http.get(this.url + 'catalogos/subestados/Clearing_Sub_Status', this._authServices.authHttpOptionsParams(id));
    }

    getFiltro(parametros){
        return this.http.get('http://23.253.173.64:8081/api/clearing/Search/', this._authServices.authHttpOptionsParams(parametros));
    }

    getEntidadesProbono() {
        return this.http.get(this.url + 'catalogos/entidades/', this._authServices.authHttpOptions());
    }
    //Apartado de estadisticas
    getEstadisticas() {
        return this.http.get('http://23.253.173.64:8081/api/clearing/Estadistica', this._authServices.authHttpOptions());
    }

    getEstadisticasFecha(fecha_inicial, fecha_actual, periodo) {
        var body = 'fecha_inicial='+fecha_inicial+'&fecha_actual='+fecha_actual + '&periodo=' + periodo;
        return this.http.get('http://23.253.173.64:8081/api/clearing/Estadistica' + body + '/', this._authServices.authHttpOptions()); 
    }

} //Final 