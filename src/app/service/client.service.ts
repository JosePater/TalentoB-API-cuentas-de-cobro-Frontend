import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from '../models/client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = `http://localhost:8080`;
  private loggedClient!: IClient;

  constructor(private http: HttpClient) {}

  // Cliente logueado
  getloggedClient(): IClient {
    return this.loggedClient;
  }
  // Set cliente logueado
  setloggedClient(data: IClient): void {
    this.loggedClient = data;
  }

  // Buscar un cliendo por su nit (id)
  getClientById(nit: number): Observable<IClient> {
    return this.http.post<IClient>(`${this.apiUrl}/cliente`, nit);
  }
}
