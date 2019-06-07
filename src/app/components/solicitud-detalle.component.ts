import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { DatosService } from '../services/datos.service';
import { Clearing } from '../models/clearing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import * as jquery from 'jquery';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  solicitud: string;
  notas: string;
}

@Component({
  selector: 'solicitud-revision',
  templateUrl: '../views/solicitud.html'
})

export class RevSolicitudComponent {
  public mask_telefono = ['+', /[1-9]/, /\d/, ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public mask_comienzo = [/\d/, /\d/, /\d/, /\d/];
  public mask_cp = [/\d/, /\d/, /\d/, /\d/, /\d/];
  public titulo: string;
  public clearing: any = [];
  public pais;
  public mensaje;
  public paises: any = [];
  public ciudades: any = [];
  public localidades: any = [];
  public materiasenfoque: any = [];
  public comunidades: any = [];
  public materiaslegales: any = [];
  public conocimientosprobono: any = [];
  animal: string;
  name: string;
  public sub: any;

  public edicion: boolean;
  public subestados;
  public entidadesProbono: any = [];
  public id: any;
  public detalle_clearing: any = [];
  public detalle_notas: any = [];

  constructor(
    private _datosService: DatosService,
    private _route: ActivatedRoute,
    private _router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.edicion = false;
    //this.detalleSolicitud();
    this.getPaises();
    this.getCiudades();
    this.getLocalidades();
    this.getMateriasEnfoque();
    this.getCominidades();
    this.getMateriasLegales();
    this.getConocimientoProbono();
    this.getEntidadesProbono();
    this.getDetalleSolicitud(this.id);
    

  }

  openDialog(): void {    

    const dialogRef = this.dialog.open(DialogInforme, {
      width: '1000px',
      height: '600px',
      data: { solicitud: this.detalle_clearing, notas: this.detalle_notas }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  getDetalleSolicitud(id) {
    this._datosService.service_general_get("clearing/" + id).subscribe((clearing) => {
      //console.log(clearing.result[0]);
      this.detalle_clearing = clearing.result[0];
      this._datosService.service_general_params_get("clearing/GetByIdApplication/", { id_application: clearing.result[0].idApplication }).subscribe((notas) => {
        console.log(notas.result);
        this.detalle_notas = notas.result;
      });
    });
  };
  //detalleSolicitud() {
  //    // this.clearing.estado_clearing = 1;
  //    this._route.params.forEach((params: Params) => {
  //    this.id= params['id'];
  //    // console.log(id);
  //    this._datosService.getSolicitud(this.id).subscribe(
  //        response => {
  //            this.clearing = response;
  //            this.getFiltroSubestados(this.clearing.estado_clearing);
  //        },
  //        error => {
  //            console.log(<any>error);
  //        }
  //    );
  //});
  //this.clearing.cuenta_con_apoyo = 0;
  //}
  habilitarEdicion() {
    this.edicion = true;
  }

  //Boton de Guardar Solicitud paso en revision
  actualizarSolicitud() {
    this.clearing.estado_clearing = 1;
    console.log(this.clearing);
    this._datosService.actualizarFormulario(this.id, this.clearing)
      .subscribe((value) => {
        this._router.navigate(['/solicitudes']);
        this.mensaje = 'Su solicitud se guardó con éxito';
        this.snackBar.open(this.mensaje, "", {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        console.log(value);
      },
        (error) => {
          console.log(error);
        });
  }
  //Asignar caso a entidad probono
  asignarCaso() {
    this._datosService.actualizarFormulario(this.id, this.clearing)
      .subscribe((value) => {
        this._router.navigate(['/solicitudes']);
        this.mensaje = 'Su caso se ha asignado correctamente';
        this.snackBar.open(this.mensaje, "", {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        // this._router.navigate(['/solicitud/', this.id]);
      },
        (error) => {
          console.log(error);
        });
  }
  //Guardar Subestado
  guardarSubEstado() {
    if (this.clearing.subestado_clearing != 8) {
      this._datosService.actualizarFormulario(this.id, this.clearing)
        .subscribe((value) => {
          this._router.navigate(['/solicitudes']);
          this.mensaje = 'Su caso se ha asignado correctamente';
          this.snackBar.open(this.mensaje, "", {
            duration: 5000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          });
        },
          (error) => {
            console.log(error);
          });
    } else {
      this.clearing.estado_clearing = 7;
      this._datosService.actualizarFormulario(this.id, this.clearing)
        .subscribe((value) => {
          this._router.navigate(['/solicitudes']);
          this.mensaje = 'Su caso se ha puesto en estado de abandonado';
          this.snackBar.open(this.mensaje, "", {
            duration: 5000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          });
        },
          (error) => {
            console.log(error);
          });
    }
  }
  //Revision
  finalizarRevision() {
    this.clearing.estado_clearing = 2;
    this._datosService.actualizarFormulario(this.id, this.clearing)
      .subscribe((value) => {
        this._router.navigate(['/solicitudes']);
        this.mensaje = 'Revisión finalizada';
        this.snackBar.open(this.mensaje, "", {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        // this._router.navigate(['/solicitud/', this.id]);
      },
        (error) => {
          console.log(error);
        });
  }
  //Comprobacion
  finalizarComprobacion() {
    this.clearing.estado_clearing = 3;
    this._datosService.actualizarFormulario(this.id, this.clearing)
      .subscribe((value) => {
        this._router.navigate(['/solicitudes']);
        this.mensaje = 'Comprobación finalizada';
        this.snackBar.open(this.mensaje, "", {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        // this._router.navigate(['/solicitud/', this.id]);
      },
        (error) => {
          console.log(error);
        });
  }
  //En Clearing
  finalizarClearing() {
    this.clearing.estado_clearing = 4;
    this._datosService.actualizarFormulario(this.id, this.clearing)
      .subscribe((value) => {
        this._router.navigate(['/solicitudes']);
        this.mensaje = 'En Clearing finalizada';
        this.snackBar.open(this.mensaje, "", {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        // this._router.navigate(['/solicitud/', this.id]);
      },
        (error) => {
          console.log(error);
        });
  }
  //Asignada
  finalizarAsignacion() {
    this.clearing.estado_clearing = 5;
    this._datosService.actualizarFormulario(this.id, this.clearing)
      .subscribe((value) => {
        this._router.navigate(['/solicitudes']);
        this.mensaje = 'Asignación finalizada';
        this.snackBar.open(this.mensaje, "", {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        // this._router.navigate(['/solicitud/', this.id]);
      },
        (error) => {
          console.log(error);
        });
  }
  //Cerrada
  finalizarCerrada() {
    this.clearing.estado_clearing = 6;
    this._datosService.actualizarFormulario(this.id, this.clearing)
      .subscribe((value) => {
        this._router.navigate(['/solicitudes']);
        this.mensaje = 'Cerrada exitosamente';
        this.snackBar.open(this.mensaje, "", {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        // this._router.navigate(['/solicitud/', this.id]);
      },
        (error) => {
          console.log(error);
        });
  }
  //Abandonar caso
  abandonarCaso() {
    this.clearing.estado_clearing = 7;
    this._datosService.actualizarFormulario(this.id, this.clearing)
      .subscribe((value) => {
        this._router.navigate(['/solicitudes']);
        this.mensaje = 'Este caso se ha abandonado';
        this.snackBar.open(this.mensaje, "", {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        // this._router.navigate(['/solicitudes']);
      },
        (error) => {
          console.log(error);
        });
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
    var data = document.getElementById('uno');
    var data2 = document.getElementById('dos');
    var data3 = document.getElementById('tres');

    html2canvas(data2).then(canvas => {
      // Few necessary setting options 
      // var imgWidth = 208; 
      // var pageHeight = 295; 
      // console.log(canvas);
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var contentDataURL = canvas.toDataURL('image/png');
      // let pdf = new jspdf('p', 'mm', 'A4'); // A4 size page of PDF 
      // var position = 0; 
      // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      // pdf.save('solicitud.pdf'); // Generated PDF  
    });
    html2canvas(data3).then(canvas => {
      // Few necessary setting options 
      // var imgWidth = 208; 
      // var pageHeight = 295; 
      // console.log(canvas);
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var contentDataURL2 = canvas.toDataURL('image/png');
    });
    let pdf = new jspdf('p', 'mm', 'A4'); // A4 size page of PDF 
    var position = 0;
    //pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    //pdf.addPage();
    //pdf.addImage(contentDataURL2, 'PNG', 0, position, imgWidth, imgHeight);
    //pdf.save('solicitud.pdf'); // Generated PDF  
    // var uno = document.getElementById('uno'); 
    // html2canvas(uno).then(canvas => {
    //   var img1 = canvas.toDataURL('image/png'); 
    // });
    // var dos = document.getElementById('dos');
    //  html2canvas(dos).then(canvas => {
    //   var img2 = canvas.toDataURL('image/png'); 
    // }); 
    // var tres = document.getElementById('tres'); 
    //  html2canvas(tres).then(canvas => {
    //   var img3 = canvas.toDataURL('image/png'); 
    // });

    // var doc = new jspdf('p', 'mm');
    // doc.addImage( img1, 'PNG', 0, 0, 210, 297); // A4 sizes
    // doc.addImage( img2, 'PNG', 0, 90, 210, 297); // img1 and img2 on first page

    // doc.addPage();
    // doc.addImage( img3, 'PNG', 0, 0, 210, 297); // img3 on second page
    // doc.save("file.pdf");

  }





  //Catalogos
  getPaises() {
    this._datosService.getPaises().subscribe(
      result => {
        this.paises = result;
        // console.log(result);
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
      }
    );
  }

  getCiudades() {
    this._datosService.getCiudades().subscribe(
      result => {
        this.ciudades = result;
        // console.log(result);
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

  getMateriasEnfoque() {
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

  //getFiltroSubestados(id) {
  //  console.log(this.clearing);
  //  this._datosService.getFiltroSubestados(id).subscribe( 
  //    result => {
  //          this.subestados = result;
  //          console.log(result);
  //      },
  //      error => {
  //      var errorMessage = <any>error;
  //      console.log(errorMessage);
  //      }
  //  );
  //}

  getEntidadesProbono() {
    this._datosService.getEntidadesProbono().subscribe(
      result => {
        this.entidadesProbono = result;
        // console.log(result);
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
      }
    );
  }

  validaciones(event) {
    for (var i = 0; i < event.length; i++) {
      if (!event[i].valid) {
        $('#' + event[i].name).focus();
        break;
      }
    }
  }

}

@Component({
  selector: 'dialog-informe',
  templateUrl: '../views/dialog.informe.html',
})
export class DialogInforme {
  constructor(
    private _datosService: DatosService,
    public dialogRef: MatDialogRef<DialogInforme>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  public clearing: any;
  public nota_clearing: string;

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data);
    this.clearing = this.data;
    //console.log(this.data.solicitud.noRequest);

  };

  saveNote(): void {
    console.log(this.clearing.solicitud.idApplication);
    this._datosService.service_general_post("clearing/Clearing_Note", {
      idapplication: this.clearing.solicitud.idApplication,
      note: this.nota_clearing,
      createby: "5C620AA5-68BF-4E24-A913-3417DA62C07B"
    }).subscribe((note) => {
      console.log(note);
      this._datosService.service_general_params_get("clearing/GetByIdApplication/", { id_application: this.clearing.solicitud.idApplication }).subscribe((notas) => {
        console.log(notas.result);
        this.data.notas = notas.result;
        this.nota_clearing = "";
      });
    });
  }
}
