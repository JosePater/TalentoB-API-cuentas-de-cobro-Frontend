import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ClientDetailsComponent } from './pages/client-details/client-details.component';
import { AddClientComponent } from './pages/add-client/add-client.component';

export const routes: Routes = [
    { path: '', title: 'Bancolombia', component: HomeComponent },
    { path: 'login', title: 'Inicio de sesión', component: LoginComponent },
    { path: 'cliente', title: 'Sesión iniciada', component: ClientDetailsComponent },
    { path: 'solicitud-leasing', title: 'Solicitud de servicios', component: AddClientComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
    
];
