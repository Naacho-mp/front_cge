import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {RegistroCliente} from '../models/registro-cliente.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceCliente {

  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  //metodo para guardar clientes y la peticion al endpoint
  guardarClientes(data: RegistroCliente): Observable<any> {
    return this.http.post(`${this.apiUrl}/clientes`, data);
  }

  //metodo para obtener los clientes y la peticion al endpoint
  obtenerClientes(): Observable<any[]> {
    return this.http.get<RegistroCliente[]>(`${this.apiUrl}/clientes`);
  }

  //metodo para actualizar un cliente y hacer la peticion al endpoint
  actualizarCliente(id_cliente: string, data: { email_contacto: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/clientes/${id_cliente}`, data);
  }

  //metodo para el eliminar un cliente y hacer la peticion al endpoint
  eliminarCliente(id_cliente: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clientes/${id_cliente}`);
  }

}
