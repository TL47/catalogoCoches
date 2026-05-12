import { Component } from '@angular/core';
import { Crud } from '../servicios/crud';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  marca: "",
  modelo: "",
  matricula: '',
  anio: new Date().getFullYear(),
  precio: 0,
  kms: 0,
  combustible: 'gasolina',
  transmision: 'manual',
  imagen: '',
  descripcion: ''
}

@Component({
  selector: 'app-modify',
  imports: [CommonModule, FormsModule],
  templateUrl: './modify.html',
  styleUrl: './modify.css',
})

export class Modify {
  coche: Coche = { ...defaultCoche };
  private apiUrl = 'http://localhost:3000/coches';

  constructor(private crudService: Crud) { }

  clearForm(): void {
    // Limpiar el objeto
    this.coche = { ...defaultCoche };
    // Limpiar los campos del formulario HTML
    (document.getElementById('Matricula') as HTMLInputElement).value = '';
    (document.getElementById('Marca') as HTMLInputElement).value = '';
    (document.getElementById('Modelo') as HTMLInputElement).value = '';
    (document.getElementById('Año') as HTMLInputElement).value = '';
    (document.getElementById('Precio') as HTMLInputElement).value = '';
    (document.getElementById('kilometraje') as HTMLInputElement).value = '';
    (document.getElementById('combustible') as HTMLSelectElement).value = 'gasolina';
    (document.getElementById('transmision') as HTMLSelectElement).value = 'manual';
    (document.getElementById('Imagen') as HTMLInputElement).value = '';
    (document.getElementById('Descripcion') as HTMLTextAreaElement).value = '';
  }

  submitForm(): void {
    let matricula = (document.getElementById('Matricula') as HTMLInputElement).value;
    
    if (!matricula) {
      alert('La Matrícula es un campo obligatorio');
    } else {
      this.comprobacion(matricula);
    }
  }

  comprobacion(matricula: string): void {
    fetch(`${this.apiUrl}?matricula=${matricula}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          this.actualizar(matricula);
        } else {
          alert('La matrícula no existe');
        }
      })
      .catch(error => {
        console.error('Error', error);
        alert('Error al cargar');
      });
  }

  actualizar(matricula: string): void {
    // Obtener los nuevos datos del formulario HTML
    const nuevosDatos = {
      marca: (document.getElementById('Marca') as HTMLInputElement).value,
      modelo: (document.getElementById('Modelo') as HTMLInputElement).value,
      matricula: matricula,
      anio: parseInt((document.getElementById('Año') as HTMLInputElement).value) || 0,
      precio: parseFloat((document.getElementById('Precio') as HTMLInputElement).value) || 0,
      kms: parseInt((document.getElementById('kilometraje') as HTMLInputElement).value) || 0,
      combustible: (document.getElementById('combustible') as HTMLSelectElement).value,
      transmision: (document.getElementById('transmision') as HTMLSelectElement).value,
      imagen: (document.getElementById('Imagen') as HTMLInputElement).value,
      descripcion: (document.getElementById('Descripcion') as HTMLTextAreaElement).value
    };

    // Buscar el registro por matrícula para obtener su id interno
    fetch(`${this.apiUrl}?matricula=${matricula}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0 && Array.isArray(data)) {
          const idInterno = data[0].id;
          
          // Hacer PUT usando el id interno
          return fetch(`${this.apiUrl}/${idInterno}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevosDatos)
          });
        } else {
          throw new Error('Matrícula no encontrada');
        }
      })
      .then(response => {
        if (response && response.ok) {
          return response.json();
        }
        throw new Error('Error en la respuesta del servidor');
      })
      .then(() => {
        alert('Matrícula actualizada con los nuevos datos');
        this.clearForm(); // Limpiar el formulario después de actualizar
      })
      .catch(error => {
        console.error('Error al actualizar:', error);
        alert('Error al actualizar los datos');
      });
  }
}
