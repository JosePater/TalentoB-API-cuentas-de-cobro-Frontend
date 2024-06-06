import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientService } from '../../service/client.service';
import { IClient } from '../../models/client.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup; // Formulario login

  // Inyecciones
  private _clientService = inject(ClientService);

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

  // Ingresar
  submit() {
    if (!this.loginForm.valid) {
      alert('Diligencie correctamente los campos!');
      return;
    }

    console.log(`Verificando correo: ${this.loginForm.get('email')?.value}`);
  }

  // Verificación de datos inválidos en los campos
  hasErrors(field: string, typeError: string) {
    const campo = this.loginForm.get(field);
    return campo?.hasError(typeError) && campo.touched;
  }
}
