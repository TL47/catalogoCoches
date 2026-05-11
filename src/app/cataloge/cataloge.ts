import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
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

@Component({
  selector: 'app-cataloge',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './cataloge.html',
  styleUrl: './cataloge.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cataloge {
  selectedCoche: Coche | null = null;
  
  // Filtros
  searchText = signal('');
  selectedMarca = signal('');
  selectedCombustible = signal('');
  selectedTransmision = signal('');
  minPrecio = signal(0);
  maxPrecio = signal(1500000);
  minAnio = signal(2010);
  maxAnio = signal(new Date().getFullYear());

  // Array de coches temporal mientras no hay persistencia
  readonly coches: Coche[] = [
    {
      marca: 'McLaren',
      modelo: 'Senna',
      matricula: '1111-MCL',
      anio: 2020,
      precio: 1200000,
      kms: 8500,
      combustible: 'Gasolina',
      transmision: 'Automática',
      imagen:
        'https://media.revistagq.com/photos/5d89c9335d07090008d92dd6/16:9/w_2560%2Cc_limit/2020-mclaren-senna-mmp-1545234547.jpg',
      descripcion: 'Superdeportivo de altas prestaciones para uso en circuito y carretera.',
    },
    {
      marca: 'Lamborghini',
      modelo: 'Huracán',
      matricula: '2222-LAM',
      anio: 2021,
      precio: 260000,
      kms: 12000,
      combustible: 'Gasolina',
      transmision: 'Automática',
      imagen:
        'https://d1gl66oyi6i593.cloudfront.net/wp-content/uploads/2022/07/coches-mas-rapidos-del-mundo-2.jpg',
      descripcion: 'Deportivo V10 con una respuesta inmediata y diseño agresivo.',
    },
    {
      marca: 'Opel',
      modelo: 'Corsa',
      matricula: '3333-OPL',
      anio: 2019,
      precio: 15900,
      kms: 40250,
      combustible: 'Gasolina',
      transmision: 'Manual',
      imagen:
        'https://fotos.quecochemecompro.com/opel-corsa/opel-corsa-dinamismo-carretera.jpg?size=750x400',
      descripcion: 'Coche urbano práctico y eficiente para el día a día.',
    },
    {
      marca: 'Cupra',
      modelo: 'León Sportstourer',
      matricula: '4444-CPR',
      anio: 2022,
      precio: 37900,
      kms: 17500,
      combustible: 'Híbrido',
      transmision: 'Automática',
      imagen:
        'https://carnovo.com/wp-content/uploads/2018/08/cupra-leon-sportstourer.jpg',
      descripcion: 'Familiar deportivo con buen maletero y enfoque dinámico.',
    },
    {
      marca: 'Cupra',
      modelo: 'León Sportstourer',
      matricula: '5555-CPR',
      anio: 2022,
      precio: 38900,
      kms: 14200,
      combustible: 'Híbrido',
      transmision: 'Automática',
      imagen:
        'https://carnovo.com/wp-content/uploads/2018/08/cupra-leon-sportstourer.jpg',
      descripcion: 'Versión equivalente con acabado y kilometraje distintos.',
    },
    {
      marca: 'Cupra',
      modelo: 'León Sportstourer',
      matricula: '6666-CPR',
      anio: 2021,
      precio: 36500,
      kms: 22100,
      combustible: 'Gasolina',
      transmision: 'Automática',
      imagen:
        'https://carnovo.com/wp-content/uploads/2018/08/cupra-leon-sportstourer.jpg',
      descripcion: 'Opción deportiva de ocasión con estética familiar.',
    },
    {
      marca: 'Cupra',
      modelo: 'León Sportstourer',
      matricula: '7777-CPR',
      anio: 2020,
      precio: 34900,
      kms: 28100,
      combustible: 'Gasolina',
      transmision: 'Automática',
      imagen:
        'https://carnovo.com/wp-content/uploads/2018/08/cupra-leon-sportstourer.jpg',
      descripcion: 'Unidad similar con más rodaje y precio más ajustado.',
    },
    {
      marca: 'Cupra',
      modelo: 'León Sportstourer',
      matricula: '8888-CPR',
      anio: 2021,
      precio: 37200,
      kms: 19000,
      combustible: 'Híbrido',
      transmision: 'Automática',
      imagen:
        'https://carnovo.com/wp-content/uploads/2018/08/cupra-leon-sportstourer.jpg',
      descripcion: 'Familiar deportivo con equilibrio entre consumo y potencia.',
    },
    {
      marca: 'Cupra',
      modelo: 'León Sportstourer',
      matricula: '9999-CPR',
      anio: 2023,
      precio: 41200,
      kms: 9500,
      combustible: 'Híbrido',
      transmision: 'Automática',
      imagen:
        'https://carnovo.com/wp-content/uploads/2018/08/cupra-leon-sportstourer.jpg',
      descripcion: 'Versión más reciente con menos kilómetros.',
    },
    {
      marca: 'Cupra',
      modelo: 'León Sportstourer',
      matricula: '1010-CPR',
      anio: 2020,
      precio: 33800,
      kms: 30200,
      combustible: 'Gasolina',
      transmision: 'Automática',
      imagen:
        'https://carnovo.com/wp-content/uploads/2018/08/cupra-leon-sportstourer.jpg',
      descripcion: 'Opción equilibrada para quien busca espacio y prestaciones.',
    },
    {
      marca: 'Cupra',
      modelo: 'León Sportstourer',
      matricula: '1112-CPR',
      anio: 2022,
      precio: 39800,
      kms: 11100,
      combustible: 'Híbrido',
      transmision: 'Automática',
      imagen:
        'https://carnovo.com/wp-content/uploads/2018/08/cupra-leon-sportstourer.jpg',
      descripcion: 'Unidad con buen equipamiento y pocos kilómetros.',
    },
    {
      marca: 'Cupra',
      modelo: 'León Sportstourer',
      matricula: '1212-CPR',
      anio: 2021,
      precio: 37100,
      kms: 19500,
      combustible: 'Gasolina',
      transmision: 'Automática',
      imagen:
        'https://carnovo.com/wp-content/uploads/2018/08/cupra-leon-sportstourer.jpg',
      descripcion: 'Acabado deportivo con un uso moderado.',
    },
    {
      marca: 'Cupra',
      modelo: 'León Sportstourer',
      matricula: '1313-CPR',
      anio: 2023,
      precio: 41900,
      kms: 7800,
      combustible: 'Híbrido',
      transmision: 'Automática',
      imagen:
        'https://carnovo.com/wp-content/uploads/2018/08/cupra-leon-sportstourer.jpg',
      descripcion: 'La opción más nueva del lote, con bajo kilometraje.',
    },
    {
      marca: 'Cupra',
      modelo: 'León Sportstourer',
      matricula: '1414-CPR',
      anio: 2020,
      precio: 34400,
      kms: 26900,
      combustible: 'Gasolina',
      transmision: 'Automática',
      imagen:
        'https://carnovo.com/wp-content/uploads/2018/08/cupra-leon-sportstourer.jpg',
      descripcion: 'Buen equilibrio entre precio, potencia y espacio.',
    },
    {
      marca: 'Cupra',
      modelo: 'León Sportstourer',
      matricula: '1515-CPR',
      anio: 2021,
      precio: 36750,
      kms: 21300,
      combustible: 'Híbrido',
      transmision: 'Automática',
      imagen:
        'https://carnovo.com/wp-content/uploads/2018/08/cupra-leon-sportstourer.jpg',
      descripcion: 'Versión muy parecida con diferente matrícula y precio.',
    },
    {
      marca: 'Cupra',
      modelo: 'León Sportstourer',
      matricula: '1616-CPR',
      anio: 2022,
      precio: 40400,
      kms: 13300,
      combustible: 'Híbrido',
      transmision: 'Automática',
      imagen:
        'https://carnovo.com/wp-content/uploads/2018/08/cupra-leon-sportstourer.jpg',
      descripcion: 'Unidad final con más equipamiento y menos kilómetros.',
    },
  ];

  // Computed property para coches filtrados
  cochesFilterados = computed(() => {
    const search = this.searchText().toLowerCase();
    const marca = this.selectedMarca();
    const combustible = this.selectedCombustible();
    const transmision = this.selectedTransmision();
    const minP = this.minPrecio();
    const maxP = this.maxPrecio();
    const minA = this.minAnio();
    const maxA = this.maxAnio();

    return this.coches.filter(coche => {
      // Filtro de búsqueda (marca o modelo)
      if (search && !coche.marca.toLowerCase().includes(search) && !coche.modelo.toLowerCase().includes(search)) {
        return false;
      }

      // Filtro de marca
      if (marca && coche.marca !== marca) {
        return false;
      }

      // Filtro de combustible
      if (combustible && coche.combustible !== combustible) {
        return false;
      }

      // Filtro de transmisión
      if (transmision && coche.transmision !== transmision) {
        return false;
      }

      // Filtro de precio
      if (coche.precio < minP || coche.precio > maxP) {
        return false;
      }

      // Filtro de año
      if (coche.anio < minA || coche.anio > maxA) {
        return false;
      }

      return true;
    });
  });

  // Métodos para obtener valores únicos para los filtros
  getMarcas(): string[] {
    const marcas = new Set(this.coches.map(c => c.marca));
    return Array.from(marcas).sort();
  }

  getCombustibles(): string[] {
    const combustibles = new Set(this.coches.map(c => c.combustible));
    return Array.from(combustibles).sort();
  }

  getTransmisiones(): string[] {
    const transmisiones = new Set(this.coches.map(c => c.transmision));
    return Array.from(transmisiones).sort();
  }

  getPrecioMinimo(): number {
    return Math.min(...this.coches.map(c => c.precio));
  }

  getPrecioMaximo(): number {
    return Math.max(...this.coches.map(c => c.precio));
  }

  getAnioMinimo(): number {
    return Math.min(...this.coches.map(c => c.anio));
  }

  getAnioMaximo(): number {
    return Math.max(...this.coches.map(c => c.anio));
  }

  // Inicializar rangos
  constructor() {
    this.minPrecio.set(this.getPrecioMinimo());
    this.maxPrecio.set(this.getPrecioMaximo());
    this.minAnio.set(this.getAnioMinimo());
    this.maxAnio.set(this.getAnioMaximo());
  }

  mostrarPopup(coche: Coche) {
    this.selectedCoche = coche;
    const popup = document.getElementById('popup');
    popup?.classList.add('visible');
  }

  cerrarPopup() {
    const popup = document.getElementById('popup');
    popup?.classList.remove('visible');
  }

  resetFiltros() {
    this.searchText.set('');
    this.selectedMarca.set('');
    this.selectedCombustible.set('');
    this.selectedTransmision.set('');
    this.minPrecio.set(this.getPrecioMinimo());
    this.maxPrecio.set(this.getPrecioMaximo());
    this.minAnio.set(this.getAnioMinimo());
    this.maxAnio.set(this.getAnioMaximo());
  }
}
