import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', title: 'Bancolombia', component: HomeComponent },
    { path: 'login', title: 'Inicio de sesión', component: HomeComponent }, // Ruta temporal
    { path: 'solicitud-leasing', title: 'Solicitud de servicios', component: HomeComponent }, // Ruta temporal
    
];
