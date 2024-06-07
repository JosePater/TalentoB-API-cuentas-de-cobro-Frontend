import { Component, OnInit, inject } from '@angular/core';
import { IClient } from '../../models/client.interface';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css',
})
export class ClientDetailsComponent implements OnInit {
  client!: IClient;
  valorIntereses: number = 1.5;
  valorAPagarCanon!: number;

  private _auth = inject(AuthService);
  private _router = inject(Router);
  private _clienService = inject(ClientService);

  ngOnInit() {
    if (!this._auth.getAuth()) {
      this._router.navigate(['/login']);
    }
    this.client = this._clienService.getloggedClient();
    
    // Cálculo del valor a pagar (Mensual, trimestral o semestral)
    // valor = (valorActivo(interes * #meses + 1) /#meses) * periodoCanon
    this.valorAPagarCanon =
      ((this.client.valorActivo *
        ((this.valorIntereses / 100) * this.client.plazoMaximo + 1)) /
        this.client.plazoMaximo) *
      this.client.periodoCanon;
  }

  periodoCannon(): string {
    if (this.client.periodoCanon == 1) {
      return 'Mensual';
    }
    if (this.client.periodoCanon == 3) {
      return 'Trimestral';
    }
    if (this.client.periodoCanon == 6) {
      return 'Semestra';
    }
    return 'No especificado';
  }
}
