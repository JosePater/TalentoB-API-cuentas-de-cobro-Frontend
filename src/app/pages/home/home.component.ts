import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private _router = inject(Router); // Inyección del router

  // Ir al login
  goLogin() {
    this._router.navigate(['/login']);
  }

  // Ir al solicitud de servicios
  goRequestService() {
    this._router.navigate(['/solicitud-leasing']);
  }
}
