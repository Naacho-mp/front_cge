import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RegistroMedidor } from '../../models/medidor.interface';
import { ApiServiceMedidor } from '../../services/api.service-medidor';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { CodigoFiltroService } from '../../services/codigo-filtro-service';

declare var bootstrap: any;

@Component({
  selector: 'app-medidor-table',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './listado-medidores.html',
  styleUrls: ['./listado-medidores.css']
})
export class ListadoMedidores implements OnInit {
  medidores: RegistroMedidor[] = [];
  loading = true;
  error = '';

  //Para paginacion
  page = 1;
  pageSize = 10;
  totalPaginas = 1;

  // Variables para el modal de edición
  medidorEditando: RegistroMedidor | null = null;
  formEdicion!: FormGroup;

  constructor(
    private apiService: ApiServiceMedidor,
    private fb: FormBuilder,
    private filtrosCodigo: CodigoFiltroService
  ) {
    // Inicializar el formulario de edición con los validators
    this.formEdicion = this.fb.group({
      codigo_medidor: ['', Validators.required],
      direccion_suministro: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  // Cargar Medidores por medio del metodo obtenerMedidores del apiservice de medidor
  ngOnInit() {
    this.filtroCodigo = this.filtrosCodigo.codigo();
    this.apiService.obtenerMedidores().subscribe({
      next: (data) => {
        this.medidores = data;
        this.loading = false;
        this.totalPaginas = Math.ceil(this.medidores.length / this.pageSize);

        if (this.filtroCodigo) {
          this.filtrarCodigo();
        }
      },
      error: (err) => {
        console.error('Error al cargar medidores', err);
        this.error = 'No se pudieron cargar los medidores';
        this.loading = false;
      },
    });
  }

  // Abrir modal con datos del medidor
  editarMedidor(medidor: RegistroMedidor) {
    this.medidorEditando = medidor;

    // Cargar datos
    this.formEdicion.patchValue({
      codigo_medidor: medidor.codigo_medidor,
      direccion_suministro: medidor.direccion_suministro,
      estado: medidor.estado
    });

    const modalElement = document.getElementById('modalEditarMedidor');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  // Guardar cambios del modal
  guardarCambios() {
    if (this.formEdicion.valid && this.medidorEditando) {
      const datosActualizados = this.formEdicion.value;

      this.apiService.actualizarMedidor(this.medidorEditando.id_medidor, datosActualizados).subscribe({
        next: () => {
          const index = this.medidores.findIndex(m => m.id_medidor === this.medidorEditando!.id_medidor);
          if (index !== -1) {
            this.medidores[index] = { ...this.medidores[index], ...datosActualizados };
          }

          alert('Medidor actualizado correctamente');
          this.cerrarModal();
        },
        error: (err) => {
          console.error('Error al actualizar medidor', err);
          alert('Ocurrió un error al actualizar el medidor');
        }
      });
    }
  }

  // Cerrar modal
  cerrarModal() {
    const modalElement = document.getElementById('modalEditarMedidor');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    }
    this.medidorEditando = null;
    this.formEdicion.reset();
  }

  // Eliminar medidor
  eliminarMedidor(medidor: RegistroMedidor) {
    const confirmacion = confirm(`¿Está seguro de eliminar el medidor ${medidor.codigo_medidor}?`);

    if (confirmacion) {
      //Se llama al metodo eliminarMedidor del apiservice medidor que se comunica despues con el backend
      this.apiService.eliminarMedidor(medidor.id_medidor).subscribe({
        next: () => {
          // Eliminar de la lista local
          this.medidores = this.medidores.filter(m => m.id_medidor !== medidor.id_medidor);
          this.totalPaginas = Math.ceil(this.medidores.length / this.pageSize);

          if (this.page > this.totalPaginas && this.totalPaginas > 0) {
            this.page = this.totalPaginas;
          }

          alert('Medidor eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar medidor', err);
          alert('Ocurrió un error al eliminar el medidor');
        }
      });
    }
  }

  // Filtrar por Código
  filtroCodigo: string = '';
  medidoresFiltradosCodigo: RegistroMedidor[] = [];

  filtrarCodigo() {
    const texto = this.filtroCodigo.trim().toLowerCase();

    // Guardar en localStorage
    this.filtrosCodigo.setCodigo(this.filtroCodigo);

    if (!texto) {
      this.medidoresFiltradosCodigo = [];
      return;
    }

    this.medidoresFiltradosCodigo = this.medidores.filter(medidor =>
      medidor.codigo_medidor.toLowerCase().includes(texto)
    );
    this.page = 1; // Resetear a primera página
  }

  mostrarTodosMedidores() {
    this.filtroCodigo = '';
    this.medidoresFiltradosCodigo = [];
    // aca se limpia el localstorage al usar reset
    this.filtrosCodigo.reset();
  }

  get medidoresPagina(): RegistroMedidor[] {
    const lista = this.medidoresFiltradosCodigo.length > 0 ? this.medidoresFiltradosCodigo : this.medidores;
    const start = (this.page - 1) * this.pageSize;
    return lista.slice(start, start + this.pageSize);
  }

  // paginas
  anterior() {
    if (this.page > 1) this.page--;
  }

  siguiente() {
    if (this.page < Math.ceil(this.medidores.length / this.pageSize)) this.page++;
  }

  protected readonly Math = Math;
}
