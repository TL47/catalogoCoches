import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-cataloge',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './cataloge.html',
  styleUrl: './cataloge.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cataloge implements OnInit {
  private readonly crud = inject(Crud);

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

  // Obtener productos del JSON
  ngOnInit(): void {
    this.cargarProductos();
  }

  // Array reactivo con los coches cargados desde el backend
  readonly coches = signal<Coche[]>([]);

  cargarProductos(): void {
    this.crud.getCoches().subscribe({
      next: (coches) => {
        this.coches.set(coches as Coche[]);
        this.minPrecio.set(this.getPrecioMinimo());
        this.maxPrecio.set(this.getPrecioMaximo());
        this.minAnio.set(this.getAnioMinimo());
        this.maxAnio.set(this.getAnioMaximo());
      },
      error: (error) => {
        console.error('No se pudieron cargar los coches', error);
      },
    });
  }

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

    return this.coches().filter(coche => {
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
    const marcas = new Set(this.coches().map(c => c.marca));
    return Array.from(marcas).sort();
  }

  getCombustibles(): string[] {
    const combustibles = new Set(this.coches().map(c => c.combustible));
    return Array.from(combustibles).sort();
  }

  getTransmisiones(): string[] {
    const transmisiones = new Set(this.coches().map(c => c.transmision));
    return Array.from(transmisiones).sort();
  }

  getPrecioMinimo(): number {
    const coches = this.coches();
    return coches.length > 0 ? Math.min(...coches.map(c => c.precio)) : 0;
  }

  getPrecioMaximo(): number {
    const coches = this.coches();
    return coches.length > 0 ? Math.max(...coches.map(c => c.precio)) : 0;
  }

  getAnioMinimo(): number {
    const coches = this.coches();
    return coches.length > 0 ? Math.min(...coches.map(c => c.anio)) : new Date().getFullYear();
  }

  getAnioMaximo(): number {
    const coches = this.coches();
    return coches.length > 0 ? Math.max(...coches.map(c => c.anio)) : new Date().getFullYear();
  }

  // Inicializar rangos con valores seguros antes de cargar datos
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
