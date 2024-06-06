import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', title: 'Bancolombia', component: HomeComponent },
    { path: 'login', title: 'Inicio de sesión', component: LoginComponent }, // Ruta temporal
    { path: 'solicitud-leasing', title: 'Solicitud de servicios', component: HomeComponent }, // Ruta temporal
    
];
