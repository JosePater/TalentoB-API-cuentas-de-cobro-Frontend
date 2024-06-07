import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'TalentoB-API-cuentas-de-cobro-Frontend';

  private _router = inject(Router); // Inyección del router

  // Ir al Home
  goHome() {
    this._router.navigate(['/']);
  }

  // Ir al login
  goLogin() {
    this._router.navigate(['/login']);
  }

  // Ir al solicitud de servicios
  goRequestService() {
    this._router.navigate(['/solicitud-leasing']);
  }

  // Ir a acerca de nosotros
  goAboutUs() {
    this._router.navigate(['/nosotros']);
  }
}
