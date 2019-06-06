import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Auth Guard Service
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
//Componentes
import { LoginComponent } from './components/login.component';
import {LogOutComponent} from './components/logOut.component';
import {OlvideContrasenia} from './components/olvide-password';
import { RegistroComponent } from './components/registro.component';
import { EstadisticasComponent } from './components/estadisticas.component';
import { SolicitudComponent } from './components/solicitud.component';
import { SolicitudesListaComponent } from './components/solicitudes-lista.component';
import { RevSolicitudComponent } from './components/solicitud-detalle.component';
import { MiCuentaComponent } from './components/micuenta.component';

//Componente de error general
import { ErrorComponent } from './components/error.component';

const appRoutes : Routes = [
    { path: '', component:LoginComponent},
    { path: 'login', component:LoginComponent},
    {path: 'logout', component:LogOutComponent},
    {path: 'olvide-contrasenia', component:OlvideContrasenia},
    { path: 'solicitud', component:SolicitudComponent},
    { path: 'solicitud/:id', component:RevSolicitudComponent},
    { 
        path: 'registro', 
        // canActivate: [AuthGuard],
        component:RegistroComponent, 
    },
    { 
        path: 'mi-cuenta', 
        // canActivate: [AuthGuard],
        component:MiCuentaComponent,
    },
    {
        path: 'solicitudes', 
        // canActivate: [AuthGuard],
        component:SolicitudesListaComponent, 
    },
    {
        path: 'estadisticas',
        // canActivate: [AuthGuard],
        component:EstadisticasComponent,
    },
    { path: '**', component:ErrorComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);