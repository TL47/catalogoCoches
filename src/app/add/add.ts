import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Crud } from '../servicios/crud';

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
  coche: Coche = { ...defaultCoche };

  // Inyecto el servicio Crud y Router en el constructor
  constructor(private crudService: Crud, private router: Router) {}

  irCatalogo(): void {
    this.router.navigate(['/cataloge']);
  }

  clearForm(): void {
    this.coche = { ...defaultCoche };
  }

  submitForm(): void {
    if (!this.coche.marca || !this.coche.modelo || !this.coche.matricula) {
      alert('Por favor, complete los campos Marca, Modelo y Matrícula.');
      return;
    }

    // Llamo al servicio y me suscribo para saber cuándo termina de guardar
    this.crudService.addCoche(this.coche).subscribe({
      next: (res) => {
        // Si entra aquí, es que el json-server ha guardado el coche OK
        console.log('Coche guardado en el servidor:', res);
        alert('Coche añadido correctamente.');
        this.clearForm();
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        alert('Error: Asegúrate de tener el json-server encendido.');
      }
    });
  }
}