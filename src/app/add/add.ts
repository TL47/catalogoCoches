import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Definimos la forma de los datos de un coche para mantener el modelo consistente.
interface Coche {
  marca: string;
  modelo: string;
  matricula: string;
  anio: number;
  precio: number;
  kms: number;
  combustible: string;
  transmision: string;
  imagen: string;
  descripcion: string;
}

// Valores iniciales por defecto para limpiar el formulario o inicializar el modelo.
const defaultCoche: Coche = {
  marca: '',
  modelo: '',
  matricula: '',
  anio: new Date().getFullYear(),
  precio: 0,
  kms: 0,
  combustible: 'gasolina',
  transmision: 'manual',
  imagen: '',
  descripcion: ''
};

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add.html',
  styleUrls: ['./add.css'],
})
export class Add {
  // Modelo del formulario vinculado con ngModel en el template.
  coche: Coche = { ...defaultCoche };

  // Resetea el formulario devolviendo el modelo a sus valores por defecto.
  clearForm(): void {
    this.coche = { ...defaultCoche };
  }

  // Se ejecuta cuando el formulario se envía.
  // Valida los campos obligatorios y muestra el coche en la consola.
  submitForm(): void {
    if (!this.coche.marca || !this.coche.modelo || !this.coche.matricula) {
      alert('Por favor, complete los campos Marca, Modelo y Matrícula.');
      return;
    }

    console.log('Nuevo coche añadido:', this.coche);
    alert('Coche añadido correctamente. Revisa la consola para ver los datos.');
    this.clearForm();
  }
}

