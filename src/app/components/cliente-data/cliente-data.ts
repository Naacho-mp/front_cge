import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiServiceCliente} from '../../services/api.service-cliente';

import {RegistroCliente} from '../../models/registro-cliente.interface';


@Component({
  selector: 'app-cliente-data',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-data.html',
  styleUrl: './cliente-data.css',
  standalone: true
})
export class ClienteData  {

  form: FormGroup;

  estados = ['Activo', 'Inactivo'];

  constructor(private formBuilder: FormBuilder, private apiService: ApiServiceCliente) {

    //validadores para el formulario de cliente
    this.form = this.formBuilder.group({
      rut: ['', Validators.required],
      nombre_razon: ['', Validators.required],
      email_contacto: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion_facturacion: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }


  //Verifica que el formulario no tenga datos erroneos
  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    //Obtiene los datos segun el models de RegistroCliente
    const payload: RegistroCliente = this.form.getRawValue();

    this.apiService.guardarClientes(payload).subscribe({
      next: (res) => {
        alert('Cliente guardado correctamente');
        this.form.reset();
      },
      error: (err) => {
        console.error('Error al guardar cliente', err);
        alert('Ocurrió un error al guardar el cliente' + JSON.stringify(err.error.detail));
      }
    });
  }
}




