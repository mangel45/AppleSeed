import { Component, ViewChild, ElementRef} from '@angular/core';
import { DatosService } from '../services/datos.service';
import { FiltradoBasico } from '../models/filtrado_basico';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'estadisticas',
  templateUrl: '../views/estadisticas.html'
})
export class EstadisticasComponent {
    public titulo: string;
    public especializadaCheck: boolean;
    public estadisticas: any = [];
    public periodos: any = [];
    public filtrado = new FiltradoBasico();
    public especial_fecha_actual;
    public especial_fecha_inicio;

  constructor(
    private _datosService: DatosService,
    private _route : ActivatedRoute,
    private _router : Router,
  ) { 
      this.titulo = "ESTADÍSTICAS";
    }

    ngOnInit() {
      this.especializadaCheck =  false;
      this.filtrado.periodo =  "";
      this.getEstadisticas();
      this.getPeriodo();
    }

    filtrar() { 
      if(this.especializadaCheck ==  true) {
        this.filtrado.fecha_fin = moment(this.especial_fecha_actual).format('DD-MM-YYYY');
        this.filtrado.fecha_inicio = moment(this.especial_fecha_inicio).format('DD-MM-YYYY');
        this.getEstadisticasFecha();
      } else {
          this.filtrado.fecha_fin =  moment().format("YYYY-MM-DD");
          if(this.filtrado.periodo == "2"){
            this.filtrado.periodo;
            this.getEstadisticasFecha();
          } 
          if(this.filtrado.periodo == "3"){
            this.filtrado.periodo;
            this.getEstadisticasFecha();
          } 
          if(this.filtrado.periodo == "4"){
            this.filtrado.periodo;
            this.getEstadisticasFecha();
          } 
          if(this.filtrado.periodo == "5" || this.filtrado.periodo == "" ){
            this.filtrado.fecha_inicio = "";
            this.filtrado.fecha_fin = "";
            this.getEstadisticas();
          }
      }
      // console.log(this.filtrado.fecha_actual);
      // console.log(this.filtrado.fecha_inicio);
    }

    //Trae las cifras sin filtros y en un inicio
    getEstadisticas() {
      this._datosService.getEstadisticas().subscribe( 
        result => {
              this.estadisticas = result;
              console.log(this.estadisticas);
          },
          error => {
          var errorMessage = <any>error;
          console.log(errorMessage);
          }
      );
    }

    getEstadisticasFecha() {
      this._datosService.getEstadisticasFecha(this.filtrado.fecha_inicio, this.filtrado.fecha_fin, this.filtrado.periodo ).subscribe(
        result => {
              this.estadisticas = result;
              // console.log(result);
          },
          error => {
          var errorMessage = <any>error;
          console.log(errorMessage);
          }
      );
    }

    getPeriodo(){
      this._datosService.getPeriodos().subscribe(
        (result:any) => {
          this.periodos = result;
          console.log(result)
        },
        error => {
          var errorMessage = <any>error;
          console.log(errorMessage);
        }
      )
    }

    //Para exportar el HTML a PDF
    @ViewChild('content') content: ElementRef;
    public imprimirPDF() {
      // let doc = new jsPDF();
      // let specialElementHandlers = {
      //   '#editor': function(element, renderer) {
      //     return true;
      //   }
      // }
      // let content =  this.content.nativeElement;
      // doc.fromHTML(content.innerHTML, 15, 15, {
      //   'width': 190,
      //   'elementHandlers': specialElementHandlers
      // });
      // doc.save('Clearing.pdf');
        var data = document.getElementById('content'); 
        html2canvas(data).then(canvas => { 
          // Few necessary setting options 
          var imgWidth = 208; 
          var pageHeight = 295; 
          var imgHeight = canvas.height * imgWidth / canvas.width; 
          var heightLeft = imgHeight; 
          
          const contentDataURL = canvas.toDataURL('image/png') 
          let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF 
          var position = 0; 
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        
          pdf.save('estadisticas.pdf'); // Generated PDF  
          }); 
    }

  }

