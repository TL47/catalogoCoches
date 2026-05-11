import { Component } from '@angular/core';

@Component({
  selector: 'app-delete',
  imports: [],
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class Delete {}
interface FiltroCoche {
    marca: string;
    modelo: string;
    matricula?: string; // El signo ? indica que es opcional
}

async function manejarBorrado() {
    const datos: FiltroCoche = {
        marca: (document.querySelector('#marca') as HTMLInputElement).value,
        modelo: (document.querySelector('#modelo') as HTMLInputElement).value,
        matricula: (document.querySelector('#matricula') as HTMLInputElement).value
    };

    if (!datos.marca || !datos.modelo) {
        alert("Marca y Modelo son obligatorios");
        return;
    }

    ejecutarLogicaBorrado(datos);
}

async function ejecutarLogicaBorrado(filtro: FiltroCoche): Promise<void> {
    try {
        // 1. Construimos la URL de búsqueda dinámicamente
        let url = `http://localhost:3000/coches?marca=${filtro.marca}&modelo=${filtro.modelo}`;
        
        // Si hay matrícula, la añadimos al filtro de búsqueda
        if (filtro.matricula && filtro.matricula.trim() !== "") {
            url += `&matricula=${filtro.matricula}`;
        }

        // 2. Buscamos los coches que coinciden
        const respuesta = await fetch(url);
        const cochesEncontrados: any[] = await respuesta.json();

        if (cochesEncontrados.length === 0) {
            alert("No se encontraron coches con esos datos.");
            return;
        }

        // 3. Borramos cada coche encontrado
        // Usamos Promise.all para que todos los borrados se hagan "a la vez"
        const promesasBorrado = cochesEncontrados.map(coche => 
            fetch(`http://localhost:3000/coches/${coche.id}`, { method: 'DELETE' })
        );

        await Promise.all(promesasBorrado);
        
        alert(cochesEncontrados.length > 1 
            ? `Se han borrado ${cochesEncontrados.length} coches.` 
            : "Coche borrado con éxito.");

    } catch (error) {
        console.error("Error en el sistema de borrado:", error);
    }
}