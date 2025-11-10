import { Component, OnInit } from '@angular/core';
import { ApiServiceLectura } from '../../services/api.service-lectura';
import { RegistroLectura } from '../../models/lectura.interface';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-listado-lecturas',
  templateUrl: './listado-lecturas.html',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './listado-lecturas.css',
})
export class ListadoLecturas implements OnInit {

  lecturas: RegistroLectura[] = [];
  loading = false;
  error = '';

  constructor(private apiLectura: ApiServiceLectura) {}

  ngOnInit() {
    this.cargarLecturas();
  }

  cargarLecturas() {
    this.loading = true;
    //Como en otros casos, se llama al obtenerLecturas del apiservice letura que se comunica con el back
    this.apiLectura.obtenerLecturas().subscribe({
      next: (data) => {
        this.lecturas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar lecturas', err);
        this.error = 'No se pudieron cargar las lecturas';
        this.loading = false;
      }
    });
  }
}




