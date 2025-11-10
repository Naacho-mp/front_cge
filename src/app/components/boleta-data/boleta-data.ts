import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceBoleta, Boleta } from '../../services/api.service-boleta';
import { ApiServiceCliente } from '../../services/api.service-cliente';
import { RegistroCliente } from '../../models/registro-cliente.interface';

@Component({
  selector: 'app-boleta-data',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './boleta-data.html',
  styleUrl: './boleta-data.css',
  standalone: true
})
export class BoletaData implements OnInit {

  form: FormGroup;
  clientes: RegistroCliente[] = [];
  boleta: Boleta | null = null;
  loading = false;
  loadingClientes = false;

  estados = ['Emitida', 'Enviada', 'Pagada', 'Anulada'];

  //Para darle mas claridad a los meses, y no que queden como solo numeros del backend
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
    private apiServiceBoleta: ApiServiceBoleta,
    private apiServiceCliente: ApiServiceCliente
  ) {
    // validators para validar los campos
    this.form = this.formBuilder.group({
      id_cliente: [''],
      anio: ['', [Validators.required, Validators.min(2000), Validators.max(2100)]],
      mes: [new Date().getMonth() + 1],
      estado: ['Emitida']
    });
  }

  ngOnInit() {
    this.cargarClientes();
  }
  cargarClientes() {
    this.loadingClientes = true;
    this.apiServiceCliente.obtenerClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.loadingClientes = false;
      },
      error: (err) => {
        console.error('Error al cargar clientes', err);
        alert('No se pudieron cargar los clientes');
        this.loadingClientes = false;
      }
    });
  }

  //Metodo de clase que a traves de la api llama a la funcion generarBoleta
  generarBoleta() {
    if (this.form.invalid || !this.form.value.id_cliente) {
      alert('Por favor complete todos los campos correctamente');
      return;
    }

    const { id_cliente, anio, mes, estado } = this.form.value;

    this.loading = true;
    this.apiServiceBoleta.generarBoleta(id_cliente, anio, mes, estado).subscribe({
      next: (boleta) => {
        this.boleta = boleta;
        this.loading = false;
        alert('Boleta generada correctamente');
      },
      error: (err) => {
        console.error('Error al generar boleta', err);
        alert('Ocurrió un error al generar la boleta: ' + JSON.stringify(err.error?.detail || err.message));
        this.loading = false;
      }
    });
  }

}
