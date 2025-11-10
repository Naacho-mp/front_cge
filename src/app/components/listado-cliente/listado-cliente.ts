import { Component, OnInit } from '@angular/core';
import { RegistroCliente } from '../../models/registro-cliente.interface';
import { ApiServiceCliente } from '../../services/api.service-cliente';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { RutFiltroService} from '../../services/rut-filtro-service';

declare var bootstrap: any;

@Component({
  selector: 'app-cliente-table',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './listado-cliente.html',
  styleUrls: ['./listado-cliente.css']
})
export class ListadoCliente implements OnInit {
  clientes: RegistroCliente[] = [];
  loading = true;
  error = '';

  //Para la paginacion
  page = 1;
  pageSize = 10;
  totalPaginas = 1;


  // Variables para el modal de edición
  clienteEditando: RegistroCliente | null = null;
  formEdicion!: FormGroup;

  constructor(
    private apiService: ApiServiceCliente,
    private fb: FormBuilder,
    private filtrosRut: RutFiltroService
  ) {
    // Inicializar el formulario con los validadores
    this.formEdicion = this.fb.group({
      email_contacto: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion_facturacion: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  //Cargar Clientes
  ngOnInit() {
    this.filtroRut = this.filtrosRut.rut();
    this.apiService.obtenerClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.loading = false;
        this.totalPaginas = Math.ceil(this.clientes.length / this.pageSize);

        // Si ya hay filtro guardado, aplicar
        if (this.filtroRut) {
          this.filtrarRut();
        }

      },
      error: (err) => {
        console.error('Error al cargar clientes', err);
        this.error = 'No se pudieron cargar los clientes';
        this.loading = false;
      },
    });
  }

  // Abrir modal con datos del cliente
  editarCliente(cliente: RegistroCliente) {
    this.clienteEditando = cliente;

    // Cargar datos que vienen en el formulario
    this.formEdicion.patchValue({
      email_contacto: cliente.email_contacto,
      telefono: cliente.telefono,
      direccion_facturacion: cliente.direccion_facturacion,
      estado: cliente.estado
    });

    // Abrir el modal
    const modalElement = document.getElementById('modalEditarCliente');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  // Guardar cambios del modal
  guardarCambios() {
    if (this.formEdicion.valid && this.clienteEditando) {
      const datosActualizados = this.formEdicion.value;

      this.apiService.actualizarCliente(this.clienteEditando.id_cliente, datosActualizados).subscribe({
        next: () => {
          // Actualizar el cliente en la lista local
          const index = this.clientes.findIndex(c => c.id_cliente === this.clienteEditando!.id_cliente);
          if (index !== -1) {
            this.clientes[index] = { ...this.clientes[index], ...datosActualizados };
          }

          alert('Cliente actualizado correctamente');
          this.cerrarModal();
        },
        error: (err) => {
          console.error('Error al actualizar cliente', err);
          alert('Ocurrió un error al actualizar el cliente');
        }
      });
    }
  }

  // Cerrar modal
  cerrarModal() {
    const modalElement = document.getElementById('modalEditarCliente');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    }
    this.clienteEditando = null;
    this.formEdicion.reset();
  }

  // Eliminar Cliente
  eliminarMedidor(cliente: RegistroCliente) {
    const confirmacion = confirm(`¿Está seguro de eliminar el cliente ${cliente.id_cliente}?`);

    //Luego se llama al metodo de eliminar que se encuentra en apiservice de cliente, para comunicarse con el back
    if (confirmacion) {
      this.apiService.eliminarCliente(cliente.id_cliente).subscribe({
        next: () => {
          // Eliminar de la lista local
          this.clientes = this.clientes.filter(m => m.id_cliente !== cliente.id_cliente);
          this.totalPaginas = Math.ceil(this.clientes.length / this.pageSize);

          // Ajustar página si se necesita
          if (this.page > this.totalPaginas && this.totalPaginas > 0) {
            this.page = this.totalPaginas;
          }

          alert('Cliente eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar el Cliente', err);
          alert('Ocurrió un error al eliminar el Cliente');
        }
      });
    }
  }

  // Filtrar por Rut
  filtroRut: string = '';
  clientesFiltradosRut: RegistroCliente[] = [];

  filtrarRut() {
    const texto = this.filtroRut.trim().toLowerCase();
    // Guardar en localStorage vía servicio creado en rut fitro service
    this.filtrosRut.setRut(this.filtroRut);

    if (!texto) {
      this.clientesFiltradosRut = [];
      return;
    }

    this.clientesFiltradosRut = this.clientes.filter(cliente =>
      cliente.rut.toLowerCase().includes(texto)

    );
    this.page = 1;
  }

  // Quita el filtro y limpia localStorage
  mostrarTodosClientes() {
    this.filtroRut = '';
    this.clientesFiltradosRut = [];
    this.filtrosRut.reset();
  }

  get clientesPagina(): RegistroCliente[] {
    const lista = this.clientesFiltradosRut.length > 0 ? this.clientesFiltradosRut : this.clientes;
    const start = (this.page - 1) * this.pageSize;
    return lista.slice(start, start + this.pageSize);
  }

  //Paginas
  anterior() {
    if (this.page > 1) this.page--;
  }

  siguiente() {
    if (this.page < Math.ceil(this.clientes.length / this.pageSize)) this.page++;
  }

  protected readonly Math = Math;
}
