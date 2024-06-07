import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientService } from '../../service/client.service';
import { IClient } from '../../models/client.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // Formulario login
  cliente!: IClient; // Cliente (NIT)

  // Inyecciones
  private _clientService = inject(ClientService);
  private _router = inject(Router);
  private _auth = inject(AuthService);

  // Formulario para validación
  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      nit: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.goClientDetails(this._auth.getAuth());
  }

  // Ingresar
  submit() {
    const nit = parseInt(this.loginForm.get('nit')?.value);
    const email = this.loginForm.get('email')?.value;

    if (!this.loginForm.valid) {
      alert('Diligencie correctamente los campos!');
      return;
    }

    // Método Post (http): buscar cliente por su Nit
    this._clientService.getClientById(nit).subscribe({
      next: (data) => {
        this.cliente = data;

        if (this.cliente) {
          if (this.cliente.email == email && this.cliente.nit == nit) {
            this._auth.setAuth(true); // Autorizado
            this._clientService.setloggedClient(data); // Guarda los datos del cliente
            alert('Bienvenido!!!');
          } else {
            alert('Acceso denegado!!!');
          }
        } else {
          alert('Acceso denegado!!!');
        }

        this.goClientDetails(this._auth.getAuth()); // Redirecciona según autorización
      },
      error: (err) => {
        console.log(`Error: ${err}`);
        alert('Hubo un problema con el servidor');
        this._auth.setAuth(false);
        this.goClientDetails(this._auth.getAuth());
      },
    });
  }

  // Logueo a la página de detalles del cliente
  goClientDetails(value: boolean) {
    if (value) {
      this._router.navigate(['/cliente']);
    } else {
      this._router.navigate(['/login']);
    }
  }

  // Validación de datos inválidos en los campos del formulario
  hasErrors(field: string, typeError: string) {
    const campo = this.loginForm.get(field);
    return campo?.hasError(typeError) && campo.touched;
  }
}
