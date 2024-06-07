import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IClient } from '../../models/client.interface';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css',
})
export class AddClientComponent implements OnInit {
  addClientForm: FormGroup; // Formulario para registrar a un cliente
  formClientData!: IClient; // Datos del cliente a registrar

  // Tipos de servicios Leasing Bancolombia
  typeServices: string[] = [
    'Leasing Financiero',
    'Leasing para el Agro',
    'Leasing Bancóldex',
    'Leasing Findeter',
    'Leasing Constructor',
    'Leasing Agro Sostenible',
  ];

  // Formulario con validación de datos
  constructor(private formBuilder: FormBuilder) {
    this.addClientForm = this.formBuilder.group({
      nit: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.min(10000000),
        ],
      ],
      businessName: ['', [Validators.required, Validators.minLength(4)]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.min(1000000000),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(8)]],

      service: ['', [Validators.required]], // Tipo se servicio Leasing
      assetValue: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.min(100000),
        ],
      ], // Valor del activo
      maxTerm: [
        '',
        [Validators.required, Validators.min(36), Validators.max(120)],
      ], // Plazo máximo en meses
      canonPeriod: ['', [Validators.required]], // Periodo del canon (mensual, trimestral o semestral)
    });
  }

  ngOnInit(): void {}

  // Convertir el valor del formulario a la interfaz IBuyForm
  // getBuyFormValue(): IBuyForm {
  //   return this.addClientForm.value as IBuyForm;
  // }

  // Submit: Registrar cliente
  registerClient() {
    const formValues = this.addClientForm.value;
    this.focusCampos();

    if (this.addClientForm.valid) {
      alert('Cliente registrado exitosamente!!!');

      this.formClientData = formValues;
      console.log(this.formClientData);
      this.addClientForm.reset(); // Resetear el formulario
    }
  }

  // Verificación de datos inválidos en los campos
  hasErrors(field: string, typeError: string) {
    return (
      this.addClientForm.get(field)?.hasError(typeError) &&
      this.wasItTouched(field) // Si fue tocado
    );
  }

  // Detecta si se ha tocado el campo (touched)
  wasItTouched(field: string) {
    return this.addClientForm.get(field)?.touched;
  }

  // Hace foco en los campos inválidos o vacíos
  focusCampos() {
    const form = Object.keys(this.addClientForm.value); // Objeto del formulario (inputs)
    const clientFormControls = this.addClientForm.controls;
    let statusForm: boolean = clientFormControls['nit'].status === 'VALID';

    // Comprobar que todos los campos sean true
    form.map((field) => {
      statusForm &&= clientFormControls[field].status === 'VALID';
    });

    // Bucle para el alert del primer campo inválido
    for (let index = 0; index < form.length; index++) {
      const field = form[index]; // id del input
      const label = document.querySelector(`label[for="${field}"]`); // Label del input

      // Si el input es inválido
      if (clientFormControls[field].status === 'INVALID') {
        if (!statusForm) {
          alert(
            `Por favor, ${label?.textContent?.replace(
              ':',
              ' '
            )}(correctamente).`
          );
          const fieldElement = window.document.getElementById(field);
          fieldElement?.focus(); // focus
          // Cuando detecta el primer campo inválido se detiene para hacerle el focus
          break;
        }
      }
    }
  }
}
