import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {
  private _router = inject(Router);
  // Ir a registro de cliente
  goAddClient() {
    this._router.navigate(['/solicitud-leasing']);
  }
}
