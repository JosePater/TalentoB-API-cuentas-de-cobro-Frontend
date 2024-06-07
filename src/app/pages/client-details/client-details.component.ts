import { Component, OnInit, inject } from '@angular/core';
import { IClient } from '../../models/client.interface';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ClientService } from '../../service/client.service';
import { CollectionAccountsService } from '../../service/collection-accounts.service';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css',
})
export class ClientDetailsComponent implements OnInit {
  client!: IClient; // Cliente según su Nit
  valorIntereses: number = 1.5; // Tasa de interés mensual
  valorAPagarCanon!: number; // Cuota a pagar

  // Inyecciones de servicios
  private _auth = inject(AuthService); // Autorización del login
  private _router = inject(Router); // Rutas de acceso
  private _clienService = inject(ClientService); // Servicio api http
  private _collectionAccounts = inject(CollectionAccountsService); // Generación de cuenta de cobro

  ngOnInit() {
    // Si no está logueado se regresa al login
    if (!this._auth.getAuth()) {
      this._router.navigate(['/login']);
    }

    // Guarda los datos del cliente logueado
    this.client = this._clienService.getloggedClient();

    // Cálculo del valor a pagar (Mensual, trimestral o semestral)
    // valor = (valorActivo(interes * #meses + 1) /#meses) * periodoCanon
    this.valorAPagarCanon = Math.ceil(
      ((this.client.valorActivo *
        ((this.valorIntereses / 100) * this.client.plazoMaximo + 1)) /
        this.client.plazoMaximo) *
        this.client.periodoCanon
    );
  }

  //Generar cuenta de cobro
  generateCollectionAccounts() {
    this._collectionAccounts.generatePDF(this.client, this.valorAPagarCanon);
  }

  // Periodo escogido
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
