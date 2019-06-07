"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
//Componentes
var login_component_1 = require("./components/login.component");
var logOut_component_1 = require("./components/logOut.component");
var olvide_password_1 = require("./components/olvide-password");
var registro_component_1 = require("./components/registro.component");
var estadisticas_component_1 = require("./components/estadisticas.component");
var solicitud_component_1 = require("./components/solicitud.component");
var solicitudes_lista_component_1 = require("./components/solicitudes-lista.component");
var solicitud_detalle_component_1 = require("./components/solicitud-detalle.component");
var micuenta_component_1 = require("./components/micuenta.component");
//Componente de error general
var error_component_1 = require("./components/error.component");
var appRoutes = [
    { path: '', component: login_component_1.LoginComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'logout', component: logOut_component_1.LogOutComponent },
    { path: 'olvide-contrasenia', component: olvide_password_1.OlvideContrasenia },
    { path: 'solicitud', component: solicitud_component_1.SolicitudComponent },
    { path: 'solicitud/:id', component: solicitud_detalle_component_1.RevSolicitudComponent },
    {
        path: 'registro',
        // canActivate: [AuthGuard],
        component: registro_component_1.RegistroComponent,
    },
    {
        path: 'mi-cuenta',
        // canActivate: [AuthGuard],
        component: micuenta_component_1.MiCuentaComponent,
    },
    {
        path: 'solicitudes',
        // canActivate: [AuthGuard],
        component: solicitudes_lista_component_1.SolicitudesListaComponent,
    },
    {
        path: 'estadisticas',
        // canActivate: [AuthGuard],
        component: estadisticas_component_1.EstadisticasComponent,
    },
    { path: '**', component: error_component_1.ErrorComponent },
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map