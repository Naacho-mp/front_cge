import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ApiServiceLectura } from '../../services/api.service-lectura';
import { ApiServiceMedidor } from '../../services/api.service-medidor'; // <-- servicio de medidores
import { RegistroLectura } from '../../models/lectura.interface';
import { RegistroMedidor} from '../../models/medidor.interface';

@Component({
  selector: 'app-lectura-data',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './lectura-data.html',
  styleUrls: ['./lectura-data.css'],
  standalone: true
})
export class LecturaData implements OnInit {

  form: FormGroup;
  medidores: RegistroMedidor[] = [];

  meses = [
    { valor: 1, nombre: 'Enero' },
    { valor: 2, nombre: 'Febrero' },
    { valor: 3, nombre: 'Marzo' },
    { valor: 4, nombre: 'Abril' },
    { valor: 5, nombre: 'Mayo' },
    { valor: 6, nombre: 'Junio' },
    { valor: 7, nombre: 'Julio' },
    { valor: 8, nombre: 'Agosto' },
    { valor: 9, nombre: 'Septiembre' },
    { valor: 10, nombre: 'Octubre' },
    { valor: 11, nombre: 'Noviembre' },
    { valor: 12, nombre: 'Diciembre' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiServiceLectura,
    private apiMedidores: ApiServiceMedidor
  ) {

    //Validadores para el formulario de la lectura
    this.form = this.formBuilder.group({
      id_medidor: ['', Validators.required],
      anio: ['', Validators.required, Validators.min(2000), Validators.max(2100)],
      mes: [new Date().getMonth() + 1, Validators.required],
      lectura_kwh: ['', Validators.required],
      observacion: ['']
    });
  }

  ngOnInit() {
    this.cargarMedidores();
  }

  //Cargar medidores se encarga de cargarlos segun el metodo obtener medidores en apiservice Medidor
  // que luego llama a la api segun la url que se le entrega
  cargarMedidores() {
    this.apiMedidores.obtenerMedidores().subscribe({
      next: (data) => {
        console.log('Medidores cargados:', data);
        this.medidores = data;
      },
      error: (err) => {
        console.error('Error al cargar medidores:', err);
      }
    });
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Partial<RegistroLectura> = this.form.getRawValue();

    this.apiService.crearLectura(payload).subscribe({
      next: () => {
        alert('Lectura guardada correctamente');
        this.form.reset({
          anio: new Date().getFullYear(),
          mes: new Date().getMonth() + 1
        });
      },
      error: (err) => {
        console.error('Error al guardar lectura', err);
        alert('Ocurrió un error al guardar la lectura: ' + JSON.stringify(err.error.detail));
      }
    });
  }
}

