import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiServiceMedidor} from '../../services/api.service-medidor';
import { RegistroCliente } from '../../models/registro-cliente.interface';
import {ApiServiceCliente} from '../../services/api.service-cliente';
import { CommonModule } from '@angular/common';
import {medidores} from '../../models/form-models';

@Component({
  selector: 'app-medidor-data',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './medidor-data.html',
  styleUrl: './medidor-data.css',
})
export class MedidorData implements OnInit {

  form: FormGroup;
  estados = ['activo', 'inactivo'];
  clientes: RegistroCliente[] = [];

  constructor(private formBuilder: FormBuilder, private apiService: ApiServiceMedidor, private apiClientes: ApiServiceCliente) {

    //validadores para el formulario de medidor
    this.form = this.formBuilder.group({
      codigo_medidor: ['', Validators.required],
      id_cliente: ['', Validators.required],
      direccion_suministro: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    // se cargan clientes por medio del metodo obtenerClientes que se comunica con apiservice de clientes
    this.apiClientes.obtenerClientes().subscribe({
      next: (data) => {
        console.log('Clientes recibidos:', data)
        this.clientes = data;
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
      },
    });
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload: medidores = this.form.getRawValue();
    //se guardan los medidores por el metodo guardarmedidores que se comunica con el apiservice de medidor
    this.apiService.guardarMedidores(payload).subscribe({
      next: (res) => {
        alert('Medidor guardado correctamente');
        this.form.reset();
      },
      error: (err) => {
        console.error('Error al guardar Medidor', err);
        alert('Ocurrió un error al guardar el Medidor' + JSON.stringify(err.error.detail));
      }
    });
  }
}
