import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort, Sort} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../services/datos.service';
import { Clearing } from '../models/clearing';
import { busqueda } from '../models/busqueda';



@Component({
  selector: 'solicitudes-lista',
  templateUrl: '../views/solicitudes-lista.html'
})

export class SolicitudesListaComponent {
// Variables de filtros
public busquedaModel = new busqueda();
clear:busqueda = new busqueda();
fechaSolicitud:Date = null;


    titulo = "TODAS LAS SOLICITUDES";
    public token;
    public lista: any = [];
    public estados: any = [];
    public estados_sol:any = [];
    public subestados:any = [];
    public materiaslegales;
    public clearing = new Clearing();
    public Busqueda = new busqueda();
    public id_estado: number;
    public parametros: any =[];
    public id:any = [];
    public rangoFechaSearch:any = [];
    public filterQuery = '';

  constructor(
    private _datosService: DatosService,
    private _route : ActivatedRoute,
    private _router : Router,
  ) { 
      
    }
    displayedColumns: string[] = ['id', 'nombre_osc', 'fecha_solicitud', 'fecha_actualizacion', 'estado_clearing', 'mas'];
    // dataSource = new MatTableDataSource<SolicitudesList>(ELEMENT_DATA);
    dataSource = new MatTableDataSource();
    tmpdataSource = [];
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    ngOnInit() {
      this.token = localStorage.getItem("token");
      this.dataSource.data = [];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.listaSolicitudes();
      /* this.getEstados(); */
      /* this.getMateriasLegales(); */
      this.getEstadosSolicitud();
    }
// ******************************************* Filtros

busquedaGeneral(){

  this.tmpdataSource = this.dataSource.data;
  this.dataSource.data = this.filterValue(this.tmpdataSource, this.filterQuery);
  
}

private filterValue(items:any, term:any) {
  if (Array.isArray(items) && items.length && term && term.length) {
    return items.filter(item => {
      let keys = Object.keys(item);
      if (Array.isArray(keys) && keys.length) {
        for (let key of keys) {
          if (item.hasOwnProperty(key) && item[key] && item[key].length && (item[key].toString().toLowerCase().replace(/ /, '')).includes((term.toString().toLowerCase().replace(/ /g, '')))) {
            return true;
          }
        }
        return false;
      } else {
        return false;
      }
    });
  } else {
    return items;
  }
}

filtroBusqueda(){
  if (this.fechaSolicitud != null){
this.busquedaModel.FechaSolicitud.format('DDMMYYYY');
} else {
  this.busquedaModel.FechaSolicitud = "";
}
this._datosService.getFiltro(this.parametros).subscribe(
  (result) => {
    this.dataSource.data = this.lista.result;
    console.log(this.lista.result);
  },
  error => {
    var errorMessage = <any>error;
    console.log(errorMessage)
;  }
)
}

borrarFiltros(){
  this.busquedaModel.Clean();
  this.dataSource.data = [];
}

    listaSolicitudes() {
      this._datosService.getSolicitudesLista(this.parametros).subscribe( 
        (result) => {
              this.lista = result;
              // console.log(result);
              this.dataSource.data = this.lista.result;
              console.log(this.lista.result);
          },
          error => {
          var errorMessage = <any>error;
          console.log(errorMessage);
          }
      );
    }

    //Obtiene todos los estados
    getEstadosSolicitud(){
      this._datosService.getEstadosSolicitud().subscribe(
        (result:any) => {
              this.estados_sol = result;
              console.log(this.estados_sol);
          },
          error => {
          var errorMessage = <any>error;
          console.log(errorMessage);
          }
      );
    }
    //Obtiene todos los subestados
    getSubestadosSolicitud() {
      console.log(this.busquedaModel.clearing_Status);
      this._datosService.getSubestados('catalogs/Clearing_Sub_Status', { 'clearing_status': this.busquedaModel.clearing_Status }).subscribe (
        (result) => {
              this.subestados = result;
              console.log(result);
          },
          error => {
          var errorMessage = <any>error;
          console.log(errorMessage);
          }
      );
    }

  } //Final