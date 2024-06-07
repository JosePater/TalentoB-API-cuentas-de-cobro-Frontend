import { Injectable, inject } from '@angular/core';
import { jsPDF } from 'jspdf';
import { IClient } from '../models/client.interface';

@Injectable({
  providedIn: 'root',
})
export class CollectionAccountsService {
  private row: number = 20; // Renglón
  private col: number = 15; // Borde izquierdo
  private nameDoc!: string; // Nombre de documento
  fontSizeNormal: number = 14; // Tamaño de la letra

  // Fecha:
  private today = new Date();
  private year = this.today.getFullYear();
  private months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  private month = this.months[this.today.getMonth()];
  private fechaFormateada = `${String(this.today.getDate()).padStart(
    2,
    '0'
  )} de ${this.month} del ${this.year}`;

  doc = new jsPDF(); // Objeto para documento PDF

  // Generador del documento PDF
  generatePDF(client: IClient, valorAPagarCanon: number) {
    this.nameDoc = `Cuenta de cobro # ${this.generateConsecutive()}`;

    this.centerBoldText(this.nameDoc);

    this.doc.setFontSize(10); // tamaño de la letra
    this.centerText(`Fecha: ${this.fechaFormateada}`);
    this.row += 10;

    this.doc.setFontSize(14);
    this.centerBoldText(client.razonSocial);
    this.doc.setFontSize(10);
    this.centerText(`NIT: ${client.nit}`);
    this.row += 10;

    this.doc.setFontSize(this.fontSizeNormal);
    this.centerText('Debe a:');
    this.row += 10;

    this.doc.setFontSize(16);
    this.centerBoldText(`BANCOLOMBIA S.A.`);
    this.doc.setFontSize(10);
    this.centerText(`NIT:  890903938 - 8`);
    this.row += 20;

    this.doc.setFontSize(this.fontSizeNormal);
    this.centerText('La suma de:');
    this.centerBoldText(`$${valorAPagarCanon}`);
    this.row += 20;

    this.doc.text('Por concepto de:', this.col, (this.row += 5));
    this.doc.text(`SERVICIO ${client.servicio}.`, this.col, (this.row += 5));
    this.doc.text(
      `Pago ${this.periodoCannon(client.periodoCanon)} pactado durante ${
        client.plazoMaximo
      } meses.`,
      this.col,
      (this.row += 5)
    );
    this.row += 20;

    const totalLine = this.justifyText(
      `Pago ${this.periodoCannon(client.periodoCanon)} de`,
      `$${valorAPagarCanon}`,
      180
    );
    this.boldText(totalLine);
    // this.doc.text(totalLine, this.col, this.row+=5 + 10);
    this.row += 20;

    this.doc.setFontSize(10);
    this.doc.text(`Atentamente,`, this.col, (this.row += 5));

    this.doc.setFontSize(this.fontSizeNormal);
    this.doc.text(`BANCOLOMBIA S.A.`, this.col, (this.row += 5));
    this.doc.text(`NIT:  890903938 - 8`, this.col, (this.row += 5));
    this.doc.text(`Medellín +57 (604) 510 9000`, this.col, (this.row += 5));
    this.row += 20;

    this.boldText(
      'Favor consignar a la Cuenta de Ahorros No. 9200000-002  Bancolombia.'
    );

    this.doc.save(`${this.nameDoc}.pdf`); // Nombre del doc a guardar
    this.row = 20; // Vuelve al primer renglón
  }

  // Colocar en negrita
  boldText(text: string) {
    this.doc.setFont('helvetica', 'bold'); // Texto en negrita
    this.doc.text(text, this.col, (this.row += 5));
    this.doc.setFont('helvetica', 'normal'); // Texto normal
  }

  // Centrar texto
  centerText(text: string) {
    const pageWidth = this.doc.internal.pageSize.getWidth(); // Ancho de la página
    const textWidth = this.doc.getTextWidth(text); // Identificar el ancho del texto
    const x = (pageWidth - textWidth) / 2; // calcular mitad
    this.doc.text(`${text}`, x, (this.row += 5)); // texto centrado
  }

  // Centrar texto en negrita
  centerBoldText(text: string) {
    this.doc.setFont('helvetica', 'bold'); // Texto en negrita
    this.centerText(text);
    this.doc.setFont('helvetica', 'normal'); // Texto normal
  }

  // Generar consecutivo # cuenta de cobro
  generateConsecutive(): number {
    const min = 10000; // Número más pequeño de 5 dígitos
    const max = 99999; // Número más grande de 5 dígitos
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Justificar el texto
  private justifyText(
    leftText: string,
    rightText: string,
    maxWidth: number
  ): string {
    const doc = new jsPDF();
    const leftWidth = this.doc.getTextWidth(leftText);
    const rightWidth = this.doc.getTextWidth(rightText);
    const spaceWidth = this.doc.getTextWidth(' ');
    const dotsWidth = maxWidth - (leftWidth + rightWidth);

    const dotsCount = Math.floor(dotsWidth / spaceWidth);
    const dots = '.'.repeat(dotsCount);

    return `${leftText}${dots}${rightText}`;
  }

  // Periodo del pago de las cuotas
  periodoCannon(periodo: number): string {
    if (periodo == 1) {
      return 'Mensual';
    }
    if (periodo == 3) {
      return 'Trimestral';
    }
    if (periodo == 6) {
      return 'Semestral';
    }
    return 'No especificado';
  }
}
