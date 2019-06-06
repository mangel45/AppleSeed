import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TextMaskModule } from 'angular2-text-mask';
//Elementos Angular Material
import {
  MatNativeDateModule, 
  MatSliderModule, 
  MatCheckboxModule, 
  MatInputModule, 
  MatButtonModule, 
  DateAdapter
} from '@angular/material';
//Paginador Angular Material
import {MatPaginatorModule} from '@angular/material/paginator';
//Tables
import {MatTableModule} from '@angular/material/table';
//Ordenamiento
import {MatSortModule} from '@angular/material/sort';
//Forms Angular Material
import {MatFormFieldModule} from '@angular/material/form-field';
//Fechas
import {MatDatepickerModule} from '@angular/material/datepicker';
//Iconografia
import {MatIconModule} from '@angular/material/icon';
//Imput Select
import {MatSelectModule} from '@angular/material/select';
//Radio Button
import { MatRadioModule } from '@angular/material/radio';
//Extras de Angular Material y Transacciones
import {MatExpansionModule} from '@angular/material/expansion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
//Mensajes
import { MatSnackBarModule } from '@angular/material/snack-bar';
//Servicio
import { DatosService } from './services/datos.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService  } from './services/auth-guard.service';
//Rutas
import { routing, appRoutingProviders } from './app.routing';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import {LogOutComponent} from './components/logOut.component';
import {OlvideContrasenia} from './components/olvide-password';
import { MiCuentaComponent } from './components/micuenta.component';
import { RegistroComponent } from './components/registro.component';
import { SolicitudComponent } from './components/solicitud.component';
import { SolicitudesListaComponent } from './components/solicitudes-lista.component';
import { RevSolicitudComponent } from './components/solicitud-detalle.component';
import { EstadisticasComponent } from './components/estadisticas.component';

//Componente de error general
import { ErrorComponent } from './components/error.component';
import { HeaderComponent } from './shared/header/header.component';
//Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogOutComponent,
    OlvideContrasenia,
    SolicitudComponent,
    RegistroComponent,
    MiCuentaComponent,
    SolicitudesListaComponent,
    RevSolicitudComponent,
    EstadisticasComponent,
    ErrorComponent,
    HeaderComponent,
    
  ],
  imports: [
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    TextMaskModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatPaginatorModule, 
    MatSortModule,
    ReactiveFormsModule,
    MatTableModule,
    MatNativeDateModule, 
    MatSliderModule,
    routing,
    NgbModule.forRoot()
  ],
  providers: [
    AuthGuardService,
    AuthService,
    appRoutingProviders,
    DatosService,
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
