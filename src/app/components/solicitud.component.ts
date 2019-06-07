import { Component} from '@angular/core';
import { DatosService } from '../services/datos.service';
import { Clearing } from '../models/clearing';
import { IdApplicationNavigation, CompanyOsc, CompanyComment, CompanyContacto, CompanyDetail } from '../models/solicitud';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import * as jquery from 'jquery';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
/* import { ConsoleReporter } from 'jasmine'; */


@Component({
  selector: 'solicitud',
  templateUrl: '../views/solicitud.html',
  providers: [DatosService]
})
export class SolicitudComponent {
    public mask_telefono = ['+',/[1-9]/, /\d/,' ','(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public mask_cp = [/\d/, /\d/, /\d/, /\d/, /\d/];
    public mask_comienzo = [/\d/, /\d/, /\d/, /\d/];
    public titulo: string;
    public clearing = new Clearing();
    public IdApplicationNavigation = new IdApplicationNavigation();
    public CompanyOsc = new CompanyOsc();
    public CompanyComment = new CompanyComment();
    public CompanyContacto = new CompanyContacto();
    public CompanyDetail = new CompanyDetail();
    public respuesta =  Clearing;
    public mensaje;
    public paises: any = [];
    public estados: any =[];
    public ciudades: any = [];
    public conocidos: any = [];
    public localidades: any = [];
    public materiasenfoque: any = [];
    public comunidades: any = [];
    public materiaslegales: any = [];
    public conocimientosprobono: any = [];
    public edicion: boolean;
    public filesToUpload;
    public resultUpload;
    public historia:boolean = true;
  
  constructor(
      private _datosService: DatosService,
      private _route : ActivatedRoute,
      private _router : Router,
      public snackBar: MatSnackBar,
    ) { 
        this.titulo = "NUEVA SOLICITUD";
    }

      ngOnInit() {
        this.edicion =  true;
        this.clearing.acuerdo_entrega_docs = "0";
        this.clearing.terminos_condiciones = "0";
        this.clearing.cuenta_consejo_independiente = "0";
        this.clearing.recibio_ayuda_probono = "0";
        this.clearing.otra_red_abogados = "0";
        this.clearing.cuenta_con_apoyo = "0";
        this.clearing.fin_religioso = "0";
        this.clearing.miembro_red_probono = "0";
        this.clearing.tiene_discriminacion = "0";
        this.getPaises();
        this.getLocalidades();
        this.getConocido();

        this.getCominidades();
        this.getMateriasLegales();
        this.getConocimientoProbono();
      }


      //Catalogos
      getPaises() {
        this._datosService.getPaises().subscribe( 
          result => {
                this.paises = result;
            },
            error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
            }
        );
      }
      
      getEstados() {
        console.log(this.IdApplicationNavigation.CompanyOsc.idcountry);
        this._datosService.getEstados('/state', {'id_country':this.IdApplicationNavigation.CompanyOsc.idcountry}).subscribe(
          result => {
            this.estados = result;
            console.log(this.estados)
          },
          error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
          }
        );
      }
      
      getCiudades() {
        console.log(this.IdApplicationNavigation.CompanyOsc.idcountry + "-----" + this.IdApplicationNavigation.CompanyOsc.idstate);
        this._datosService.getCiudades('/city', {'id_country':this.IdApplicationNavigation.CompanyOsc.idcountry, 'id_state':this.IdApplicationNavigation.CompanyOsc.idstate}).subscribe(
          result => {
                this.ciudades = result;
                console.log(this.ciudades);
            },
            error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
            }
        );
      }

      getLocalidades() {
        this._datosService.getLocalidades().subscribe( 
          result => {
                this.localidades = result;
                // console.log(result);
            },
            error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
            }
        );
      }

      getConocido(){
        this._datosService.getConocidos().subscribe(
          result => {
            this.conocidos = result;
          },
          error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
          }
        )
      }

     /*  getMateriasEnfoque() {
        this._datosService.getMateriasEnfoque().subscribe( 
          result => {
                this.materiasenfoque = result;
                // console.log(result);
            },
            error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
            }
        );
      }
 */
      getCominidades() {
        this._datosService.getComunidades().subscribe( 
          result => {
                this.comunidades = result;
                // console.log(result);
            },
            error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
            }
        );
      }

      getMateriasLegales() {
        this._datosService.getMateriasLegales().subscribe( 
          result => {
                this.materiaslegales = result;
                // console.log(result);
            },
            error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
            }
        );
      }

      getConocimientoProbono() {
        this._datosService.getConocimientoProbono().subscribe( 
          result => {
                this.conocimientosprobono = result;
                // console.log(result);
            },
            error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
            }
        );
      }
  
      //Recoge el fichero y lo pone en un array
      fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files; //Recoge nuestro fichero y lo pone en un array
        console.log(this.filesToUpload);
      }
      
      //Formulario solicitud 
      enviarSolicitud() {
          /* this.clearing.estado_clearing = 1;
          this.clearing.subestado_clearing = null;
          this.clearing.entidad_probono = null; */
          // console.log(this.clearing);
          console.log(this.IdApplicationNavigation);
          this._datosService.clearing('/clearing', this.IdApplicationNavigation )
              .subscribe( response => {
                debugger;
                console.log(response)
                // console.log("Aqui esta el id"+this.clearing.id);
               /*  this.mensaje =  //'Su solicitud fue enviada con éxito';
                this.snackBar.open(this.mensaje, "", {
                  duration: 5000,
                  verticalPosition: 'bottom',
                  horizontalPosition: 'right'
                  }); */
              // this._router.navigate(['/solicitudes']);
          }, 
          (error) => {
            console.log(error);
          });
      }
      //Validacion del formulario
      validaciones(event) {
        for(var i=0; i<event.length; i++) {
          if(!event[i].valid) {
            $('#'+ event[i].name).focus();
            break;
          }
        }
      }
}
