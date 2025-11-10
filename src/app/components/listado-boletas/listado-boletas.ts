import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceBoleta, Boleta } from '../../services/api.service-boleta';
import { ApiServiceCliente } from '../../services/api.service-cliente';
import { RegistroCliente } from '../../models/registro-cliente.interface';

@Component({
  selector: 'app-listado-boletas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './listado-boletas.html',
  styleUrl: './listado-boletas.css'
})
export class ListadoBoletas implements OnInit {

  form: FormGroup;
  clientes: RegistroCliente[] = [];
  boletas: Boleta[] = [];

  loading = false;
  loadingClientes = false;

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
    private fb: FormBuilder,
    private apiServiceBoleta: ApiServiceBoleta,
    private apiServiceCliente: ApiServiceCliente
  ) {
    this.form = this.fb.group({
      id_cliente: [''],
      anio: ['', [Validators.required, Validators.min(2000), Validators.max(2100)]],
      mes: ['']
    });
  }

  ngOnInit() {
    this.cargarClientes();
  }

  //Similar a las otras funciones que cargan clientes o medidores, se llama al metodo obtener clientes
  //que se comunica con la api que se encarga de verificar el metodo post/get/put y responder del endpoint
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

  buscarBoletas() {
    if (this.form.invalid) {
      alert('Por favor, complete todos los campos correctamente');
      return;
    }

    const { id_cliente, anio, mes } = this.form.value;
    this.loading = true;
    this.boletas = [];

    this.apiServiceBoleta.listarBoletas(id_cliente, anio, mes).subscribe({
      next: (data) => {
        this.boletas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al buscar boletas', err);
        alert('Ocurrió un error al obtener las boletas');
        this.loading = false;
      }
    });
  }

  descargarPDF(boleta: Boleta) {
    const { id_cliente, anio, mes } = boleta;
    //se llama al metodo descargarBoletaPDF de la apiserviceboleta que se comunica con la api que tiene el descargarboleta
    this.apiServiceBoleta.descargarBoletaPDF(id_cliente, anio, mes).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `boleta_${id_cliente}_${anio}_${mes}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar PDF', err);
        alert('Ocurrió un error al descargar la boleta');
      }
    });
  }

  getNombreMes(numeroMes: number): string {
    const mes = this.meses.find(m => m.valor === numeroMes);
    return mes ? mes.nombre : numeroMes.toString();
  }

}
