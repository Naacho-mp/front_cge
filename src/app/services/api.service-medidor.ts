import { RegistroMedidor } from '../models/medidor.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { medidores } from '../models/form-models';
import {inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceMedidor {

  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  // Crear medidor y hace la peticion al endpoint
  guardarMedidores(data: medidores): Observable<any> {
    return this.http.post(`${this.apiUrl}/medidores`, data);
  }

  // Obtener todos los medidores y hace la peticion
  obtenerMedidores(): Observable<RegistroMedidor[]> {
    return this.http.get<RegistroMedidor[]>(`${this.apiUrl}/medidores`);
  }

  // Obtener un medidor por ID y hace la peticion al endpoint
  obtenerMedidorPorId(id_medidor: number): Observable<RegistroMedidor> {
    return this.http.get<RegistroMedidor>(`${this.apiUrl}/medidores/${id_medidor}`);
  }

  // Actualizar medidor por id y hace la peticion al edpoint
  actualizarMedidor(id_medidor: string, data: Partial<RegistroMedidor>): Observable<RegistroMedidor> {
    return this.http.put<RegistroMedidor>(`${this.apiUrl}/medidores/${id_medidor}`, data);
  }

  // Eliminar medidor y hace la peticion al endpoint
  eliminarMedidor(id_medidor: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/medidores/${id_medidor}`);
  }
}
