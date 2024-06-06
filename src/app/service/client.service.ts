import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from '../models/client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = `http://localhost:8080`;

  constructor(private http: HttpClient) {}

  getClients(): Observable<IClient[]> {
    return this.http.get<IClient[]>(`${this.apiUrl}/clientes`);
  }
}
